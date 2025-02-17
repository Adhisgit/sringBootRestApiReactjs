import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import { Button } from 'bootstrap'
import './index.css'
import App from './App.jsx'
//import "bootstrap/dist/css/bootstrap.min.css"
import { GoogleOAuthProvider } from '@react-oauth/google'



 const CLIENT_ID = "148063497584-8i6mg43qmjgjon34mu46s7ib6stpc849.apps.googleusercontent.com"


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId = {CLIENT_ID} > 
     
    <App />
    </GoogleOAuthProvider>
  </StrictMode>,
)
