'use client'

import { toast as sonnerToast } from 'sonner'

export type ToastProps = {
  title?: string
  description?: string
  variant?: 'default' | 'destructive'
}

export function useToast() {
  const toast = (props: ToastProps) => {
    if (props.variant === 'destructive') {
      sonnerToast.error(props.title || 'Erreur', {
        description: props.description,
      })
    } else {
      sonnerToast.success(props.title || 'Succès', {
        description: props.description,
      })
    }
  }

  return { toast }
}
