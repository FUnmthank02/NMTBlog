import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../firebase/firebase_config'
import './login_register.scss'
import { Link, useNavigate } from "react-router-dom";


function Login() {

    const [loginEmail, setLoginEmail] = useState('')
    const [loginPassword, setLoginPassword] = useState('')
    const [valid, setValid] = useState(true)

    let navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const user = await signInWithEmailAndPassword(
                auth,
                loginEmail,
                loginPassword
            )
            console.log('Success!!!')
            setValid(true)
            setLoginEmail('')
            setLoginPassword('')
            if (user.user.email === 'admin@gmail.com') {
                localStorage.setItem('accessAdmin', true)
            } 
            else localStorage.setItem('accessUser', true)
            navigate('/', { replace: true })
        } catch (error) {
            setValid(false)
            navigate('', { replace: true })
            console.log(error.message)
        }
    }


    return (
        <div className="wrapper_login_register">
            <div className="login_form">
                <div className="container-login-register">
                    <Link className="login-register active" to='/login'>LOGIN</Link>
                    <Link className="login-register" to='/register'>REGISTER</Link>
                </div>

                <form onSubmit={handleLogin} className="form">
                    <input type="email" onChange={(e) => setLoginEmail(e.target.value)} id="email" placeholder="Enter email" required /> <br />
                    <input type="password" onChange={(e) => setLoginPassword(e.target.value)} id="password" placeholder="Enter password" required /><br />
                    {!valid && <p className="login_valid">The email or password is incorrect </p>}
                    <button>Login</button>
                    <Link className='link_button' to="/forgotpassword">Forgot password ?</Link>
                </form>

            </div>
        </div>
    )
}

export default Login