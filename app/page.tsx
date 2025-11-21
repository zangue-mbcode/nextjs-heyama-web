'use client'

import { useObjects } from '@/hooks/use-objects'
import { ObjectList } from '@/components/object-list'
import { CreateObjectDialog } from '@/components/create-object-dialog'

export default function HomePage() {
  const { objects, loading, fetchObjects } = useObjects()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between gap-4">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold tracking-tight">Heyama</h1>
              <p className="text-sm text-muted-foreground">
                Organisez et gérez vos objets avec élégance
              </p>
            </div>
            <CreateObjectDialog onSuccess={fetchObjects} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ObjectList objects={objects} loading={loading} />
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-muted/30 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-muted-foreground">
          <p>Heyama © 2024 - Créé avec ✨ pour l&apos;excellence</p>
        </div>
      </footer>
    </div>
  )
}
