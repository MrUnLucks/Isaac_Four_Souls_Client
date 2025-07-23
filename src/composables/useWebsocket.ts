import { ref } from 'vue'

export const useWebsocket = () => {
  const socket = new WebSocket('ws://localhost:8080')
  const isConnected = ref(false)

  socket.onopen = () => {
    isConnected.value = true
  }
  socket.onclose = () => {
    isConnected.value = false
  }

  const sendMessage = (message: string) => {
    socket.send(message)
  }

  return {
    socket,
    isConnected,
    sendMessage,
  }
}
