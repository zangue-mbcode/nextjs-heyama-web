'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { HeyamaObject, objectsApi } from '@/lib/api'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Skeleton } from '@/components/ui/skeleton'
import { DeleteConfirmationDialog } from '@/components/delete-confirmation-dialog'
import { useToast } from '@/hooks/use-toast'
import { formatDate } from '@/lib/utils'
import { ArrowLeft, Trash2 } from 'lucide-react'

interface ObjectDetailPageProps {
  params: {
    id: string
  }
}

export default function ObjectDetailPage({ params }: ObjectDetailPageProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [object, setObject] = useState<HeyamaObject | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  useEffect(() => {
    const fetchObject = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await objectsApi.getById(params.id)
        setObject(data)
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Erreur lors du chargement'
        setError(message)
        // Error will be displayed in the error state, not in toast
      } finally {
        setLoading(false)
      }
    }

    fetchObject()
  }, [params.id])

  const handleDelete = async () => {
    try {
      await objectsApi.delete(params.id)
      toast({
        title: 'Succès',
        description: 'Objet supprimé avec succès',
      })
      router.push('/')
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Erreur lors de la suppression'
      toast({
        title: 'Erreur',
        description: message,
        variant: 'destructive',
      })
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <header className="border-b border-border/50 bg-background/95 backdrop-blur">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Skeleton className="h-10 w-20" />
          </div>
        </header>
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="space-y-8">
            <Skeleton className="aspect-video w-full rounded-lg" />
            <div className="space-y-4">
              <Skeleton className="h-8 w-2/3" />
              <Skeleton className="h-24 w-full" />
            </div>
          </div>
        </main>
      </div>
    )
  }

  if (error || !object) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        <header className="border-b border-border/50 bg-background/95 backdrop-blur">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Link href="/">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Retour
              </Button>
            </Link>
          </div>
        </header>
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <h1 className="text-2xl font-bold">Objet non trouvé</h1>
            <p className="text-muted-foreground">
              L'objet que vous recherchez n'existe pas ou a été supprimé.
            </p>
            <Link href="/">
              <Button className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Retour à l'accueil
              </Button>
            </Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/95 backdrop-blur">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Retour
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8 animate-fade-in">
          {/* Image */}
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border/50 bg-muted">
            <Image
              src={object.imageUrl}
              alt={object.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Content */}
          <div className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight">{object.title}</h1>
              <p className="text-lg text-muted-foreground">{object.description}</p>
            </div>

            {/* Metadata */}
            <div className="flex items-center gap-4 flex-wrap pt-4">
              <Badge variant="secondary" className="text-sm px-3 py-1.5">
                Créé le {formatDate(object.createdAt)}
              </Badge>
              {object.updatedAt !== object.createdAt && (
                <Badge variant="secondary" className="text-sm px-3 py-1.5">
                  Modifié le {formatDate(object.updatedAt)}
                </Badge>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-6 border-t border-border/50">
              <Button
                variant="destructive"
                size="lg"
                onClick={() => setDeleteDialogOpen(true)}
                className="gap-2"
              >
                <Trash2 className="w-5 h-5" />
                Supprimer
              </Button>
            </div>
          </div>
        </div>
      </main>

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmationDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDelete}
        title={`Supprimer "${object.title}"?`}
        description="Cette action est irréversible. L'objet sera supprimé de façon permanente."
      />

      {/* Footer */}
      <footer className="border-t border-border/50 bg-muted/30 mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center text-sm text-muted-foreground">
          <p>Heyama © 2024</p>
        </div>
      </footer>
    </div>
  )
}
