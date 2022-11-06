import { useState } from 'react';
import { updatePassword } from 'firebase/auth'
import { auth } from '../../firebase/firebase_config'
import '../login_register/login_register.scss'
import { Link } from "react-router-dom";


function Changepassword() {

    const [newpassword, setNewPassword] = useState('')
    const [cfpassword, setCFPassword] = useState('')
    const [notify, setNotify] = useState('')
    const [error, setError] = useState('')

    const user = auth.currentUser

    const handleChangePass = async (e) => {
        e.preventDefault();
        if(newpassword === cfpassword) {
            await updatePassword(user, newpassword)
            .then(() => {
                setNotify('Password changed successfully.')
            })
            
            .catch ((e) => {
                console.log(e.message)
            }) 
        } else {
            setError('Confirm password does not match new password.')
        }
    }


    return (
        <div className="wrapper_login_register">
            <div className="login_form">
                <div className="container-login-register">
                    <h2 className="active forgot_title">CHANGE PASSWORD</h2>
                </div>

                <form onSubmit={handleChangePass} className="form">
                    {notify!=='' && <p className="reset_notify">{notify}</p>}
                    {error!=='' && <p className="login_valid">{error}</p>}
                    <input type="password" onChange={(e) => setNewPassword(e.target.value)} id="password" placeholder="Enter new password" required /> <br />
                    <input type="password" onChange={(e) => setCFPassword(e.target.value)} id="cf_password" placeholder="Enter confirm password" required /> <br />
                    <button>Submit</button>
                    <Link className='link_button' to="/">Home</Link>
                </form>

            </div>
        </div>
    )
}

export default Changepassword