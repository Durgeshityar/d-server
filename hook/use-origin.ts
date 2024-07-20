'use client'
import { useEffect, useState } from 'react'

export const useOrigin = () => {
  const [isMonted, setIsMonted] = useState(false)

  useEffect(() => {
    setIsMonted(true)
  }, [])

  const origin =
    typeof window !== 'undefined' && window.location.origin
      ? window.location.origin
      : ''

  if (!isMonted) {
    return ''
  }

  return origin
}
