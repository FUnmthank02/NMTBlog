import { Route, Routes, Navigate } from 'react-router-dom'
import App from '../../App';
import Login from '../login_register/Login';
import Register from '../login_register/Register';
import Create from '../action/Create';
import Update from '../action/Update';
import Forgotpassword from '../passwordManage/Forgotpassword';
import Changepassword from '../passwordManage/Changepassword';
import About from '../information/About';
import Contact from '../information/Contact';
import Post from '../post/Post';
import Search from '../search/Search';

export default function RouterApp() {

    return (
        <>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/login" element={<RequireLogin><Login /></RequireLogin>} />
                <Route path="/forgotpassword" element={<RequireForgotpass><Forgotpassword /></RequireForgotpass>} />
                <Route path="/changepassword" element={<RequireChangepass><Changepassword /></RequireChangepass>} />
                <Route path='/register' element={<Register />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/post' element={<Post />} />
                <Route path="/create" element={<RequireAdmin><Create /></RequireAdmin>} />
                <Route path="/update" element={<RequireAdmin><Update /></RequireAdmin>} />
                <Route path='/search' element={<Search />} />
            </Routes>
        </>
    )
}

function RequireAdmin({ children }) {
    if (!localStorage.getItem('accessAdmin')) {
        // Redirect them to the / page(home page) if they are not admin
        return <Navigate to="/" replace={true} />;
    }
    return children;
}

function RequireLogin({ children }) {
    if (localStorage.getItem('accessUser') || localStorage.getItem('accessAdmin')){
        // Redirect them to the / page(home page) if they are logged in 
        // and wanna go to login page
        return <Navigate to="/" replace={true} />;
    }
    return children;
}

function RequireForgotpass({ children }) {
    if (localStorage.getItem('accessUser') || localStorage.getItem('accessAdmin')){
        // Redirect them to the / page(home page) if they are logged in 
        // and wanna go to forgotpass page
        return <Navigate to="/" replace={true} />;
    }
    return children;
}

function RequireChangepass({ children }) {
    if (!localStorage.getItem('accessUser') && !localStorage.getItem('accessAdmin')){
        // Redirect them to the / page(home page) if they are logged in 
        // and wanna go to changepassword page
        return <Navigate to="/" replace={true} />;
    }
    return children;
}