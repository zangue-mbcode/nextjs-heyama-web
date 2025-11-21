'use client'

import { useCallback, useEffect, useState } from 'react'
import { objectsApi, HeyamaObject } from '@/lib/api'
import { useSocket } from './use-socket'
import { useToast } from './use-toast'

export function useObjects() {
  const [objects, setObjects] = useState<HeyamaObject[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const socket = useSocket()
  const { toast } = useToast()

  const fetchObjects = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await objectsApi.getAll()
      setObjects(data)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors du chargement'
      setError(message)
      // Toast removed from useCallback to avoid infinite loop
    } finally {
      setLoading(false)
    }
  }, [])

  const addObject = useCallback((object: HeyamaObject) => {
    setObjects((prev) => [object, ...prev])
  }, [])

  const removeObject = useCallback((id: string) => {
    setObjects((prev) => prev.filter((obj) => obj.id !== id))
  }, [])

  useEffect(() => {
    fetchObjects()
  }, [fetchObjects])

  useEffect(() => {
    if (!socket) return

    socket.on('objectCreated', (object: HeyamaObject) => {
      addObject(object)
      toast({
        title: 'Nouvel objet',
        description: `"${object.title}" a été ajouté`,
      })
    })

    socket.on('objectDeleted', (id: string) => {
      removeObject(id)
    })

    return () => {
      socket.off('objectCreated')
      socket.off('objectDeleted')
    }
  }, [socket, addObject, removeObject, toast])

  return {
    objects,
    loading,
    error,
    fetchObjects,
    addObject,
    removeObject,
  }
}
