import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home.tsx'
//import App from './App.tsx' // 1. Mude de Home para App

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    
     <Home /> 
    {/*   <App /> 2. Chame o App aqui */}
  </StrictMode>,
)
