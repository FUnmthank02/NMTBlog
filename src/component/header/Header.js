import * as React from 'react';
import { useState } from 'react';
import {
  signOut, onAuthStateChanged
} from 'firebase/auth'
import { auth } from '../../firebase/firebase_config'
import './header.scss'
import logo from '../../image/mylogo.png'
import avtuser from '../../image/avtuser.png'
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const [user, setUser] = useState(localStorage.getItem('user'));
  const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail'));

  let navigate = useNavigate()

  // log out
  const handleLogout = async () => {
    await signOut(auth)
    localStorage.removeItem('accessAdmin')
    localStorage.removeItem('accessUser')
    localStorage.removeItem('userEmail')
    navigate('/', { replace: true })
  }

  return (
    <div className="wrapper_homepage">
      <nav id='nav_home' className="navbar navbar-expand-lg navbar-light">
        <div>
          <a href="/"><img className="navbar-brand logo" src={logo} alt="logo" /></a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link nav_item_text" href="/">Home</a>
            </li>
            <li className="nav-item active">
              <a className="nav-link nav_item_text" href="/about" >About</a>
            </li>
            <li className="nav-item active">
              <a className="nav-link nav_item_text" href="/contact" >Contact</a>
            </li>
            
          </ul>
          {user ?
            <div className="acti">
              <div id='user_email'>{userEmail}</div>
              <div className="nav-item dropdown nav_drop">
                <img className="nav-link dropdown-toggle rounded-circle" src={avtuser} alt="avtuser" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" />
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="/changepassword">Change password</a>
                  <div className="dropdown-divider"></div>
                  <a style={{cursor: 'pointer'}} className="dropdown-item" onClick={handleLogout} >Log out</a>
                </div>
              </div>
            </div>
            :

            <div className="mr-auto">
              <Link className="login_text" to='/login'>Login</Link>
            </div>
          }
        </div>
      </nav>
    </div>
  )
}

export default Header