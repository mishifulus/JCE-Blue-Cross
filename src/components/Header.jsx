import React, { useContext, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { FiLogOut } from 'react-icons/fi'
import logo from "../assets/logo.png"
import "../styles/Header.css"
import { Link } from 'react-router-dom'
import UserContext from '../context/UserContext'

const Header = () => {

    const { currentUser, logout } = useContext(UserContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        swal(
          `See you later, ${currentUser.username}`,
          "Logout",
          "success"
        );
        navigate("/login");
        logout();
      };

    return (
        <>
        {currentUser?.name && (
        <nav className="navbar navbar-expand-lg bg-white">
            <div className="navbar-row language-selector">
                <div className='d-flex justify-content-center align-items-center'>
                    <p className='me-2 ms-5 text-language'>Language:</p> 
                    <select className="form-select" defaultValue="0">
                        <option value="0">English</option>
                        <option value="1">Spanish</option>
                        <option value="2">French</option>
                    </select>
                </div>
                <div className='d-flex'>
                    <p className='me-3 text-language'>Welcome Dr(a) { currentUser.name ? `${currentUser.name} ${currentUser.lastName}` : 'XXX'}</p>
                    <button className='btn btn-search me-3' onClick={handleLogout}><FiLogOut /></button>
                </div>
            </div>
            <div className="navbar-row logo-and-search">
                <Link className="navbar-brand" to="/">
                    <img src={logo} alt='Logo' height={'70px'} className='ms-4'/>
                </Link>
                <form className="d-flex" role="search">
                    <input className="form-control" type="search" placeholder="Hi!" aria-label="Search"/>
                    <button className="btn btn-search me-3" type="submit">Search</button>
                </form>
            </div>
            <div className=' navigation-menu'>
                <button className="navbar-toggler btn-search" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        {currentUser?.status === 2 && (
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/home">Home Page</Link>
                        </li>
                        )}
                        {(currentUser?.role === 1 && currentUser?.status === 2 || currentUser?.role === 0 && currentUser?.status === 2) && (
                        <li className="nav-item">
                            <Link className="nav-link" to='/providerfinder'>Provider Finder</Link>
                        </li>
                        )}
                        {(currentUser?.role === 2 && currentUser?.status === 2 || currentUser?.role === 0 && currentUser?.status === 2) && (
                        <li className="nav-item">
                            <Link className="nav-link" to='/submitclaim'>Submit Claim</Link>
                        </li>
                        )}
                        {(currentUser?.role === 3 && currentUser?.status === 2 || currentUser?.role === 0 && currentUser?.status === 2) && (
                        <li className="nav-item">
                            <Link className="nav-link" to='/errormanager'>Error Manager</Link>
                        </li>
                        )}
                        {(currentUser?.role === 3 && currentUser?.status === 2 || currentUser?.role === 0 && currentUser?.status === 2) && (
                        <li className="nav-item">
                            <Link className="nav-link" to='/payorregistration'>Payor Registration</Link>
                        </li>
                        )}
                        {currentUser?.role === 0 && currentUser?.status === 2 && (
                        <li className="nav-item">
                            <Link className="nav-link me-4" to='/users'>Users</Link>
                        </li>
                        )}
                        {(currentUser?.role === 1 || currentUser?.role  == 2 || currentUser?.role  == 3 || currentUser?.role == 0) && (
                        <li className="nav-item">
                            <Link className="nav-link ms-4" to='/config'>Config</Link>
                        </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
        )}
        </>
    );
}

export default Header