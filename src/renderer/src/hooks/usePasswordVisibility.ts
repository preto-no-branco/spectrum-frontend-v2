import { useState } from 'react'

export function usePasswordVisibility(initialHidden: boolean = true) {
  const [isPasswordHidden, setIsPasswordHidden] = useState(initialHidden)

  const togglePasswordVisibility = () => {
    setIsPasswordHidden((prev) => !prev)
  }

  const showPassword = () => {
    setIsPasswordHidden(false)
  }

  const hidePassword = () => {
    setIsPasswordHidden(true)
  }

  return {
    isPasswordHidden,
    togglePasswordVisibility,
    showPassword,
    hidePassword
  }
}
