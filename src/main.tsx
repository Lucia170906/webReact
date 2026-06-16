import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Envolvemos la app con BrowserRouter */}
    <BrowserRouter>
        <App />

    </BrowserRouter>
  </StrictMode>,
)
