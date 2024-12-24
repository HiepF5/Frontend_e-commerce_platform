import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

class ChatService {
  private static stompClient: Stomp.Client | null = null
  private static reconnectTimeout: NodeJS.Timeout | null = null
  private static maxReconnectAttempts = 5
  private static reconnectAttempts = 0
  private static notificationSound = new Audio('/src/assets/mp3/mess.mp3')

  static connectWebSocket(
    token: string,
    shopCode: string,
    onMessage: (message: any) => void,
    onConnect: () => void,
    onError: (error: any) => void
  ) {
    if (this.stompClient && this.stompClient.connected) {
      console.log('WebSocket already connected')
      onConnect()
      return
    }

    const socket = new SockJS(`${import.meta.env.VITE_WS_BASE_URL}?token=${token}`)
    this.stompClient = Stomp.over(socket)

    this.stompClient.connect(
      {},
      (frame) => {
        console.log('Connected: ' + frame)
        this.reconnectAttempts = 0
        this.stompClient?.subscribe(
          `/topic/shop/${shopCode}`,
          (messageOutput) => {
            const messageResponse = JSON.parse(messageOutput.body)
            onMessage(messageResponse)
            if (messageResponse.type === 'SENT') {
              this.notificationSound.play()
            }
          }
        )
        onConnect()
      },
      (error) => {
        console.error('WebSocket connection failed:', error)
        onError(error)
        this.attemptReconnect(token, shopCode, onMessage, onConnect, onError)
      }
    )
  }

  private static attemptReconnect(
    token: string,
    shopCode: string,
    onMessage: (message: any) => void,
    onConnect: () => void,
    onError: (error: any) => void
  ) {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      console.log(
        `Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`
      )
      this.reconnectTimeout = setTimeout(
        () =>
          this.connectWebSocket(token, shopCode, onMessage, onConnect, onError),
        5000 * Math.pow(2, this.reconnectAttempts - 1) // Exponential backoff
      )
    } else {
      console.error(
        'Max reconnection attempts reached. Please refresh the page.'
      )
    }
  }

  static disconnectWebSocket() {
    if (this.stompClient) {
      this.stompClient.disconnect(() => {
        console.log('WebSocket disconnected')
      })
      this.stompClient = null
    }
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout)
      this.reconnectTimeout = null
    }
    this.reconnectAttempts = 0
  }

  static sendMessage(destination: string, message: any): boolean {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send(destination, {}, JSON.stringify(message))
      return true
    }
    console.error('WebSocket is not connected')
    return false
  }

  static seenMessage(destination: string, message: any): boolean {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.send(destination, {}, JSON.stringify(message))
      return true
    }
    console.error('WebSocket is not connected')
    return false
  }

  static isConnected(): boolean {
    return !!(this.stompClient && this.stompClient.connected)
  }
}

export default ChatService
