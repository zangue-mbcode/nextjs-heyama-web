'use client'

import { HeyamaObject } from '@/lib/api'
import { ObjectCard } from './object-card'
import { Skeleton } from './ui/skeleton'

interface ObjectListProps {
  objects: HeyamaObject[]
  loading: boolean
}

export function ObjectList({ objects, loading }: ObjectListProps) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="aspect-video w-full rounded-lg" />
            <Skeleton className="h-6 w-3/4 rounded" />
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-2/3 rounded" />
            <div className="flex justify-between pt-2">
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-9 w-24 rounded" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (objects.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center space-y-4 animate-fade-in">
        <div className="space-y-2">
          <h3 className="text-xl font-semibold">Aucun objet pour le moment</h3>
          <p className="text-muted-foreground max-w-sm">
            Créez votre premier objet pour commencer. Il apparaîtra magiquement ici.
          </p>
        </div>
        <div className="text-4xl opacity-20">✨</div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {objects.map((object) => (
        <ObjectCard key={object.id} object={object} />
      ))}
    </div>
  )
}
