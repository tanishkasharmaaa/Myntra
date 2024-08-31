import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import React from 'react'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import {ChakraProvider} from '@chakra-ui/react'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <ChakraProvider>
    <App />
    </ChakraProvider>
  </BrowserRouter>,
)
