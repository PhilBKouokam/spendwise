import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from "./context/AuthContext.jsx"
import { TransProvider } from './context/TransContext.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import * as ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <TransProvider>
            <App />
          </TransProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
