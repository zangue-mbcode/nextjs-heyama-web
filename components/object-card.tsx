'use client'

import Image from 'next/image'
import Link from 'next/link'
import { HeyamaObject } from '@/lib/api'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { formatRelativeTime } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

interface ObjectCardProps {
  object: HeyamaObject
}

export function ObjectCard({ object }: ObjectCardProps) {
  return (
    <Link href={`/objects/${object.id}`}>
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-primary/20 cursor-pointer group animate-slide-up">
        <div className="aspect-video w-full overflow-hidden bg-muted relative">
          <Image
            src={object.imageUrl}
            alt={object.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={false}
          />
        </div>
        <CardContent className="p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
              {object.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {object.description}
            </p>
          </div>
          <div className="flex items-center justify-between pt-2">
            <Badge variant="secondary" className="text-xs">
              {formatRelativeTime(object.createdAt)}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              className="gap-2 group/btn"
              asChild
            >
              <span>
                Détails
                <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
              </span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
