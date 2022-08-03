import React from 'react'
import ReactDOM from 'react-dom/client'
import { Toaster } from 'react-hot-toast';
import { App } from './App'
import { ThemeContextProvider } from './contexts/ThemeContext'
import { Provider} from 'react-redux'
import { store } from './redux/store'

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
    <ThemeContextProvider>
    <Toaster position="top-center" />
      <App />
    </ThemeContextProvider>
    </Provider>
)
