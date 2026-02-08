'use client'

import Image, { ImageProps } from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { TypeTheme } from '@/constants'

interface Props extends Omit<ImageProps, 'onLoad'> {
  theme?: TypeTheme
  skeletonClassName?: string
}

export const SpriteImage = ({
  alt,
  src,
  theme,
  className = '',
  skeletonClassName = '',
  ...rest
}: Props) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const imgRef = useRef<HTMLImageElement>(null)

  useEffect(() => {
    if (imgRef.current?.complete) {
      const timeoutId = setTimeout(() => setIsLoaded(true), 0)
      return () => clearTimeout(timeoutId)
    }

    const id = requestAnimationFrame(() => setIsLoaded(false))
    return () => cancelAnimationFrame(id)
  }, [src])

  return (
    <>
      {!isLoaded && (
        <div
          className={`absolute inset-0 m-auto rounded-full blur-2xl brightness-200 saturate-50 animate-[skeleton-appear_1s_ease-in_500ms_forwards] opacity-0 ${theme?.bg || 'bg-zinc-100/50'} ${skeletonClassName}`}
        />
      )}

      <Image
        {...rest}
        ref={imgRef}
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        className={`object-contain transition-all duration-500 ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        } ${className}`}
      />
    </>
  )
}
