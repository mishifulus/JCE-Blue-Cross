import { Fragment, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import LoginPage from './pages/LoginPage'
import Footer from './components/Footer'



const App = () => {
  return (
    <BrowserRouter>
      <Header/>
        <Routes>
          <Route index element={<h1>Home Page</h1>} />
          <Route exact path='/home' element={<h1>Home Page</h1>} />
          <Route exact path='/providerfinder' element={<h1>Provider Finder</h1>} />
          <Route exact path='/submitclaim' element={<h1>Submit Claim</h1>} />
          <Route exact path='/errormanager' element={<h1>Error Manager</h1>} />
          <Route exact path='/payorregistration' element={<h1>Payor Registration</h1>} />
          <Route exact path='/users' element={<h1>Users</h1>} />
          <Route exact path='/config' element={<h1>Config</h1>} />
          <Route exact path='/login' element={<LoginPage/>} />
          <Route path='*' element={<h1>ERROR</h1>} />
        </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
