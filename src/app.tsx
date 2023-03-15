//Modules
import React from 'react'
import ReactDOM from 'react-dom/client'

//Components
import Home from '@/pages/Home';

//Style
import '@/styles/global.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>,
)
