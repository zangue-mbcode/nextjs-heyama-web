import { io, Socket } from "socket.io-client"

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3000"

let socket: Socket | null = null

export function initSocket(): Socket {
  if (socket) {
    return socket
  }

  socket = io(SOCKET_URL, {
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 5,
    transports: ["websocket", "polling"],
  })

  socket.on("connect", () => {
    console.log("Socket connected:", socket?.id)
  })

  socket.on("disconnect", () => {
    console.log("Socket disconnected")
  })

  socket.on("error", (error) => {
    console.error("Socket error:", error)
  })

  return socket
}

export function getSocket(): Socket | null {
  return socket
}

export function disconnectSocket(): void {
  if (socket) {
    socket.disconnect()
    socket = null
  }
}
