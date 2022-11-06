import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/firebase_config'
import { Link, useNavigate } from "react-router-dom";
import './login_register.scss'
import Notify from '../notify/Notify';


function Register() {

  const [registerEmail, setRegisterEmail] = useState('')
  const [registerPassword, setRegisterPassword] = useState('')
  const [registerCFPassword, setRegisterCFPassword] = useState('')
  const [valid, setValid] = useState(true)
  const [notify, setNotify] = useState(false)

  let navigate = useNavigate();


  const handleRegister = async (e) => {
    e.preventDefault()

    if (registerCFPassword === registerPassword) {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      )

      setValid(true)
      handleNotify()
      setRegisterPassword('')
      setRegisterCFPassword('')
      navigate('/login', { replace: true })
    } else {
      setValid(false)
      setRegisterPassword('')
      setRegisterCFPassword('')
      navigate('', { replace: true })
    }
  }

  const handleNotify = () => {
    setNotify(true)
    setTimeout(() => {
      setNotify(false)
    }, 2000)
  }

  return (
    <div>
      {notify && <Notify />}
      <div className="wrapper_login_register">
        <div className="login_form">
          <div className="container-login-register">
            <Link className="login-register" to='/login'>LOGIN</Link>
            <Link className="login-register active" to='/register'>REGISTER</Link>
          </div>

          <form onSubmit={handleRegister} className="form">
            <input type="email" onChange={(e) => setRegisterEmail(e.target.value)} id="email" placeholder="Enter email" required /> <br />
            <input type="password" onChange={(e) => setRegisterPassword(e.target.value)} id="password" placeholder="Enter password" required /><br />
            <input type="password" onChange={(e) => setRegisterCFPassword(e.target.value)} id="cf_password" placeholder="Enter confirm password" required /><br />
            {!valid && <p className="login_valid">The confirm password must be the same as password</p>}
            <button>Register</button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Register