import { Client, IMessage } from '@stomp/stompjs'

class ChatService {
  private static client: Client

  // Tạo kết nối WebSocket nếu chưa có
  static connectWebSocket(
    token: string,
    shopCode: string,
    onMessage: (message: any) => void,
    onError: (error: any) => void
  ) {
    if (this.client && this.client.connected) {
      console.log('Already connected')
      return
    }

    // Tạo client STOMP kết nối WebSocket
    this.client = new Client({
      brokerURL: 'ws://localhost:9000/ws', // URL WebSocket của server
      connectHeaders: { Authorization: token }, // Headers để xác thực
      debug: (msg) => console.log(msg), // Log debug
      reconnectDelay: 5000, // Tự động kết nối lại sau 5 giây
      onStompError: (frame) => {
        console.error('STOMP error:', frame.headers['message'])
      }
    })

    // Xử lý sự kiện khi kết nối thành công
    this.client.onConnect = () => {
      console.log('WebSocket connected')
      this.client.subscribe(`/topic/shop/${shopCode}`, (message: IMessage) => {
        onMessage(JSON.parse(message.body))
      })
    }

    // Xử lý lỗi kết nối WebSocket
    this.client.onWebSocketError = (error) => {
      console.error('WebSocket error:', error)
      onError(error)
    }

    // Kích hoạt kết nối
    this.client.activate()
  }

  // Ngắt kết nối WebSocket khi không còn cần thiết
  static disconnectWebSocket() {
    if (this.client) {
      this.client.deactivate() // Đóng kết nối
      console.log('WebSocket disconnected')
    }
  }

  // Gửi tin nhắn qua WebSocket
  static sendMessage(destination: string, body: any): boolean {
    if (this.client && this.client.connected) {
      this.client.publish({
        destination,
        body: JSON.stringify(body)
      })
      return true
    }
    console.error('WebSocket is not connected')
    return false
  }
}

export default ChatService
