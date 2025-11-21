'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createObjectSchema } from '@/lib/validations'
import { objectsApi } from '@/lib/api'
import { useToast } from '@/hooks/use-toast'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ImageUpload } from './image-upload'
import { Plus } from 'lucide-react'

interface CreateObjectDialogProps {
  onSuccess?: () => void
}

export function CreateObjectDialog({ onSuccess }: CreateObjectDialogProps) {
  const [open, setOpen] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const { toast } = useToast()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(createObjectSchema),
  })

  const onSubmit = async (data: any) => {
    if (!selectedFile) {
      toast({
        title: 'Erreur',
        description: 'Veuillez sélectionner une image',
        variant: 'destructive',
      })
      return
    }

    try {
      setUploading(true)

      // Create object with file (sends FormData)
      await objectsApi.create(data.title, data.description, selectedFile)

      toast({
        title: 'Succès',
        description: 'Objet créé avec succès!',
      })

      setOpen(false)
      reset()
      setSelectedFile(null)
      onSuccess?.()
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Erreur lors de la création'
      toast({
        title: 'Erreur',
        description: message,
        variant: 'destructive',
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2" size="lg">
          <Plus className="w-5 h-5" />
          Créer un objet
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Créer un nouvel objet</DialogTitle>
          <DialogDescription>
            Remplissez les détails de votre objet et ajoutez une image attrayante.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">
              Titre
            </label>
            <Input
              id="title"
              placeholder="Ex: Magnifique paysage"
              {...register('title')}
            />
            {errors.title && (
              <p className="text-xs text-destructive">
                {errors.title.message as string}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <Textarea
              id="description"
              placeholder="Décrivez votre objet en détail..."
              {...register('description')}
              className="min-h-[100px]"
            />
            {errors.description && (
              <p className="text-xs text-destructive">
                {errors.description.message as string}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Image</label>
            <ImageUpload onImageSelect={setSelectedFile} />
          </div>

          <div className="flex gap-3 justify-end pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting || uploading}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting || uploading || !selectedFile}
              className="gap-2"
            >
              {uploading || isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Création...
                </>
              ) : (
                'Créer'
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
