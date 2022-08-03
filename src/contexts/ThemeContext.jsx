import { createContext, ReactNode, useEffect, useState } from 'react'

export const ThemeContext = createContext({})

export function ThemeContextProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState(
    localStorage.getItem('theme') !== 'dark' ? 'light' : 'dark',
  )

  useEffect(() => {
    const root = window.document.documentElement

    const removeOldTheme = currentTheme === 'dark' ? 'light' : 'dark'

    root.classList.remove(removeOldTheme)
    root.classList.add(currentTheme)
    localStorage.setItem('theme', currentTheme)
  }, [currentTheme])

  return (
    <ThemeContext.Provider value={{ currentTheme, setCurrentTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}
