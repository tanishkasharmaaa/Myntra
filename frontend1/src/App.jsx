import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/home'
import {SearchPage} from './pages/searchPage'
import { Login } from './pages/login'
import { Women } from './pages/women'
import { Men } from './pages/men'
import { Kids } from './pages/kids'
import { SignUp } from './pages/signup'
import { SinglePage } from './pages/singlePage'
import { Wishlist } from './pages/wishlist'
import { Cart } from './pages/cart'
import { Address } from '../../frontend/src/pages/address'
import { Payment } from './pages/payment'
import { Confirmation } from './pages/confirmation'


function App() {
  

  return (
    <>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/searchPage/:id' element={<SearchPage/>}/>
        <Route path='/men'element={<Men/>}/>
        <Route path='/women'element={<Women/>}/>
        <Route path='/kids' element={<Kids/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/:id' element={<SinglePage/>}/>
        <Route path='/wishlist' element={<Wishlist/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/address' element={<Address/>}/>
        <Route path='/payment' element={<Payment/>}/>
        <Route path='/confirmation' element={<Confirmation/>}/>

      </Routes>
    </>
  )
}

export default App
