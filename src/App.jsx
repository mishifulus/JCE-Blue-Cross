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

const App = () => {

  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <Header/>
        <Routes>
          <Route element={<ProtectedRoutes/>}>
            <Route exact path='/home' element={<HomePage/>} />
            <Route exact path='/providerfinder' element={<ProviderFinderPage/>} />
            <Route exact path='/submitclaim' element={<SubmitClaimPage/>} />
            <Route exact path='/errormanager' element={<ErrorManagerPage/>} />
            <Route exact path='/payorregistration' element={<PayorRegistrationPage/>} />
            <Route exact path='/users' element={<UsersPage/>} />
            <Route exact path='/config' element={<ConfigPage/>} />
          </Route> 
          <Route exact path='/login' element={<LoginPage/>} />
          <Route path='*' element={<ErrorPage/>} />
        </Routes>
      <Footer/>
    </BrowserRouter>
  )
}

export default App
