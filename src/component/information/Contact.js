import { useState } from 'react'
import './contact.scss'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import Notify from '../notify/Notify'

function Contact() {

    const [scrollToTop, setScrollToTop] = useState(false)
    const [noti, setNoti] = useState(false)
    const [fname, setFname] = useState('')
    const [lname, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    //handle scroll
    window.onscroll = () => {
        scrollFunction()
    }

    // scroll
    const scrollFunction = () => {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            setScrollToTop(true)
        } else {
            setScrollToTop(false)
        }
    }

    // scroll back to top
    const topFunction = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    // set notify display in 1 minute
    const notify = () => {
        setTimeout(() => {
            setNoti(false)
        }, 1000)
    }

    //submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        setNoti(true)
        notify()
        setFname('')
        setLname('')
        setEmail('')
        setMessage('')
    }

    return (
        <>
            <Header />
            {noti && <Notify />}
            <div className="wrapper_contact">
                <div className="container">
                    <form onSubmit={handleSubmit}>
                        <h2>Contact Us</h2>
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor="inputFName">First name</label>
                                <input type="text" value={fname} onChange={(e) => setFname(e.target.value)} className="form-control" id="inputFName" placeholder="First Name" required />
                            </div>
                            <div className="form-group col-md-6">
                                <label htmlFor="inputLName">Last name</label>
                                <input type="text" value={lname} onChange={(e) => setLname(e.target.value)} className="form-control" id="inputLName" placeholder="Last Name" required />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputEmail">Email</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" id="inputEmail" placeholder="Email" required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputMessage">Message</label>
                            <textarea className="form-control" value={message} onChange={(e) => setMessage(e.target.value)} id="inputMessage" rows="5" placeholder="Your message..."></textarea>
                        </div>

                        <button type='submit' className="btn btn-primary">Submit</button>
                    </form>
                </div>

                {scrollToTop && <button onClick={topFunction} id="myBtn" title="Go to top">Top</button>}

            </div>

            <Footer />
        </>
    )
}

export default Contact