'use client'

import { useState } from 'react'
import { BiCheck } from 'react-icons/bi'
import { MdShare } from 'react-icons/md'
import { Button } from './Button'

export const ShareButton = () => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async (text: string) => {
    // Método 1: Clipboard API (requiere HTTPS)
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }

    // Método 2: Fallback con input temporal (funciona en HTTP)
    const textArea = document.createElement('textarea')
    textArea.value = text
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()

    try {
      const successful = document.execCommand('copy')
      textArea.remove()
      return successful
    } catch (err) {
      textArea.remove()
      return false
    }
  }

  const handleShare = async () => {
    const shareData: ShareData = {
      title: 'PokéNex Pro',
      text: 'Check out this Pokémon on PokéNex Pro!',
      url: window.location.href,
    }

    try {
      // Intenta usar el share nativo primero
      if (navigator.share && navigator.canShare?.(shareData)) {
        await navigator.share(shareData)
        return
      }
    } catch (err) {
      // Si el usuario cancela (AbortError), no hacer nada
      if (err instanceof Error && err.name === 'AbortError') {
        return
      }
      // Si falla por otra razón, continuar al clipboard
    }

    // Fallback: copiar al clipboard
    try {
      const success = await copyToClipboard(window.location.href)
      if (success) {
        setCopied(true)
        setTimeout(() => setCopied(false), 3000)
      }
    } catch (err) {
      console.error('Error al copiar:', err)
    }
  }

  return (
    <Button
      onClick={handleShare}
      className="flex items-center justify-center gap-3 w-full md:w-fit"
    >
      {copied ? (
        <>
          <BiCheck size={24} />
          Copied!
        </>
      ) : (
        <>
          <MdShare size={20} />
          Share Pokémon
        </>
      )}
    </Button>
  )
}
