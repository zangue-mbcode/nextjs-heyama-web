'use client'

import { useEffect, useState } from 'react'
import { Socket } from 'socket.io-client'
import { initSocket, getSocket } from '@/lib/socket'

export function useSocket(): Socket | null {
  const [socket, setSocket] = useState<Socket | null>(null)

  useEffect(() => {
    const existingSocket = getSocket()
    if (existingSocket) {
      setSocket(existingSocket)
    } else {
      const newSocket = initSocket()
      setSocket(newSocket)
    }
  }, [])

  return socket
}
