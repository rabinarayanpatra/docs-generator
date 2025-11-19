import NextImage from 'next/image'
import { cn } from '@/lib/utils'

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  alt: string
  width?: number
  height?: number
  caption?: string
  priority?: boolean
}

export function Image({
  src,
  alt,
  width,
  height,
  caption,
  priority = false,
  className,
  ...props
}: ImageProps) {
  // For markdown images (without explicit width/height), use unoptimized mode
  // to avoid layout shift and allow responsive sizing
  const isMarkdownImage = !width && !height

  if (isMarkdownImage) {
    return (
      <figure className="my-8">
        <div className="relative overflow-hidden rounded-lg border border-border">
          <NextImage
            src={src}
            alt={alt || ''}
            width={1200}
            height={630}
            className={cn('h-auto w-full', className)}
            unoptimized
            {...props}
          />
        </div>
        {caption && (
          <figcaption className="mt-2 text-center text-sm text-muted-foreground">
            {caption}
          </figcaption>
        )}
      </figure>
    )
  }

  // For explicit Image component usage with width/height
  return (
    <figure className="my-8">
      <div className="relative overflow-hidden rounded-lg border border-border">
        <NextImage
          src={src}
          alt={alt || ''}
          width={width}
          height={height}
          className={cn('h-auto w-full', className)}
          priority={priority}
          {...props}
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
