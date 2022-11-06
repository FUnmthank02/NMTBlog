import { useState } from 'react';
import { sendPasswordResetEmail } from 'firebase/auth'
import { auth } from '../../firebase/firebase_config'
import '../login_register/login_register.scss'
import { Link } from "react-router-dom";


function Forgotpassword() {

    const [email, setEmail] = useState('')
    const [notify, setNotify] = useState(false)

    const handleResetPass = async (e) => {
        e.preventDefault();
        await sendPasswordResetEmail(auth, email)
            .then(() => {
                setNotify(true)
            })
            
            .catch ((e) => {
                console.log(e.message)
            }) 
    }


    return (
        <div className="wrapper_login_register">
            <div className="login_form">
                <div className="container-login-register">
                    <h2 className="active forgot_title">RESET PASSWORD</h2>
                </div>

                <form onSubmit={handleResetPass} className="form">
                    {notify && <p className="reset_notify">Reset password sended to your email. Check it, please.</p>}
                    <input type="email" onChange={(e) => setEmail(e.target.value)} id="email" placeholder="Enter email" required /> <br />
                    <button>Send</button>
                    <Link className='link_button' to="/login">Login</Link>
                </form>

            </div>
        </div>
    )
}

export default Forgotpassword