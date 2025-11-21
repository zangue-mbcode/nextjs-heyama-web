'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Upload, X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ImageUploadProps {
  onImageSelect: (file: File) => void
  preview?: string
}

export function ImageUpload({ onImageSelect, preview }: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(preview || null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (file: File) => {
    if (['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      if (file.size <= 10 * 1024 * 1024) {
        onImageSelect(file)
        const url = URL.createObjectURL(file)
        setPreviewUrl(url)
      }
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files
    if (files && files.length > 0) {
      handleFileSelect(files[0])
    }
  }

  const handleRemoveImage = () => {
    setPreviewUrl(null)
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <div className="space-y-4">
      {previewUrl ? (
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border-2 border-border bg-muted">
          <Image
            src={previewUrl}
            alt="Preview"
            fill
            className="object-cover"
          />
          <button
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 p-1.5 bg-background/80 backdrop-blur rounded-lg hover:bg-background transition-colors"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "border-2 border-dashed rounded-lg p-8 transition-all cursor-pointer",
            isDragging
              ? "border-primary/80 bg-primary/5"
              : "border-border hover:border-primary/50 hover:bg-primary/5"
          )}
        >
          <div className="flex flex-col items-center gap-3 text-center">
            <div className="p-3 rounded-lg bg-muted">
              <Upload className="w-6 h-6 text-muted-foreground" />
            </div>
            <div className="space-y-1">
              <p className="text-sm">
                <span className="font-semibold text-foreground">Cliquez pour télécharger</span>
                <span className="text-muted-foreground"> ou glissez-déposez</span>
              </p>
              <p className="text-xs text-muted-foreground">
                PNG, JPG, WebP jusqu&apos;à 10 MB
              </p>
            </div>
          </div>
        </div>
      )}
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleInputChange}
        className="hidden"
        aria-label="Upload image"
      />
    </div>
  )
}
