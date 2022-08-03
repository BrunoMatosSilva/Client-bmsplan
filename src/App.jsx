import { ThemeProvider } from 'styled-components'
import { useTheme } from './hooks/useTheme'
import { Router } from './Routes'
import { GlobalStyle } from './styles/global'
import { themes } from './styles/themes/default'

export function App() {
  const { currentTheme } = useTheme()

  return (
    <ThemeProvider theme={themes[currentTheme]}>
      <GlobalStyle />
        <Router />
    </ThemeProvider>
  )
}