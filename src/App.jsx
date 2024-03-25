import { Fragment, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import ProtectedRoutes from './components/ProtectedRoutes'

import ConfigPage from './pages/ConfigPage'
import ErrorManagerPage from './pages/ErrorManagerPage'
import ErrorPage from './pages/ErrorPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import PayorRegistrationPage from './pages/PayorRegistrationPage'
import ProviderFinderPage from './pages/ProviderFinderPage'
import SubmitClaimPage from './pages/SubmitClaimPage'
import UsersPage from './pages/UsersPage'

import { UserProvider } from './context/UserContext'
import { PayerProvider } from './context/PayerContext'
import { ProviderProvider } from './context/ProviderContext'

const App = () => {

  return (
    <BrowserRouter>
      <UserProvider> 
        <Header/>
        <PayerProvider>
        <ProviderProvider>
          <Routes>
            <Route element = {<ProtectedRoutes allowedRoles={[0,1,2,3]}/>}>
              <Route exact path='/home' element={<HomePage/>} />
              <Route exact path='/config' element={<ConfigPage/>} />
            </Route>
            <Route element = {<ProtectedRoutes allowedRoles={[0,1]}/>}>
              <Route exact path='/providerfinder' element={<ProviderFinderPage/>} />
            </Route>
            <Route element = {<ProtectedRoutes allowedRoles={[0,2]}/>}>
              <Route exact path='/submitclaim' element={<SubmitClaimPage/>} />
            </Route>
            <Route element = {<ProtectedRoutes allowedRoles={[0,3]}/>}>
              <Route exact path='/errormanager' element={<ErrorManagerPage/>} />
              <Route exact path='/payorregistration' element={<PayorRegistrationPage/>} />
            </Route>
            <Route element = {<ProtectedRoutes allowedRoles={[0]}/>}>
              <Route exact path='/users' element={<UsersPage/>} />
            </Route>
            <Route exact path='/login' element={<LoginPage/>} />
            <Route path='*' element={<ErrorPage/>} />
          </Routes>
          </ProviderProvider>
          </PayerProvider>
        <Footer/>
      </UserProvider>
    </BrowserRouter>
  )
}

export default App
