import { Client } from '@stomp/stompjs'

class ChatService {
  private stompClient: Client | null = null

  connectWebSocket(
    token: string,
    shopCode: string,
    onMessageReceived: (message: any) => void,
    onError?: (error: string) => void
  ) {
    if (!token) {
      console.error('JWT token is missing or invalid')
      return
    }

    this.stompClient = new Client({
      brokerURL: `ws://localhost:9000/ws?token=${token}`,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      debug: (str) => console.log(str),
      onConnect: () => {
        console.log('Connected to WebSocket')

        this.stompClient?.subscribe(
          `/topic/shop/${shopCode}`,
          (messageOutput) => {
            if (messageOutput.body) {
              const messageResponse = JSON.parse(messageOutput.body)
              onMessageReceived(messageResponse)
            }
          }
        )
      },
      onStompError: (frame) => {
        const errorMsg = frame.headers['message']
        console.error('WebSocket error:', errorMsg)
        onError && onError(errorMsg)
      }
    })

    this.stompClient.activate()
  }

  disconnectWebSocket() {
    if (this.stompClient) {
      this.stompClient.deactivate()
      console.log('Disconnected from WebSocket')
    }
  }

  sendMessage(destination: string, message: any) {
    if (this.stompClient && this.stompClient.connected) {
      this.stompClient.publish({
        destination,
        body: JSON.stringify(message)
      })
    } else {
      console.error('WebSocket is not connected')
    }
  }

  
}

export default new ChatService()
