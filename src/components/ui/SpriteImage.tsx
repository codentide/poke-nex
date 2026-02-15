'use client'

import Image, { ImageProps } from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { TypeTheme } from '@/constants'

interface Props extends Omit<ImageProps, 'onLoad' | 'onError'> {
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
  const [hasError, setHasError] = useState(false)
  const [prevSrc, setPrevSrc] = useState(src)
  const imgRef = useRef<HTMLImageElement>(null)

  // Reset states when src changes during render phase
  if (src !== prevSrc) {
    setPrevSrc(src)
    setIsLoaded(false)
    setHasError(false)
  }

  useEffect(() => {
    // If the image is already in cache, it might be complete by the time the effect runs
    if (imgRef.current?.complete && !isLoaded) {
      setIsLoaded(true)
    }
  }, [src, isLoaded])

  return (
    <>
      {(!isLoaded || hasError) && (
        <div
          className={`absolute inset-0 m-auto rounded-full blur-2xl brightness-200 saturate-50 animate-[skeleton-appear_1s_ease-in_500ms_forwards] opacity-0 ${theme?.bg || 'bg-zinc-100/50'} ${skeletonClassName}`}
        />
      )}

      {hasError ? (
        // Pokeball silhouette
        <div
          className={`relative flex items-center justify-center w-full h-full opacity-20 grayscale ${className}`}
        >
          <svg
            viewBox="0 0 100 100"
            className="w-1/2 h-1/2 text-white"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="45" />
            <path d="M5 50h33M62 50h33" />
            <circle cx="50" cy="50" r="12" />
          </svg>
        </div>
      ) : (
        <Image
          {...rest}
          ref={imgRef}
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`object-contain transition-all duration-500 ${
            isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          } ${className}`}
        />
      )}
    </>
  )
}
