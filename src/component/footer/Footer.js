import './footer.scss'

function Footer() {

    return (
        <div className="wrapper_footer">
            <div className="link_footer">
                <ul>
                    <li>
                        <a className="text_footer" href="/">Home</a>
                    </li>
                    <li>
                        <a className="text_footer" href="/about">About</a>
                    </li>
                    <li>
                        <a className="text_footer" href="/contact">Contact</a>
                    </li>
                    {localStorage.getItem('accessAdmin') &&
                        <li>
                            <a className="text_footer" href="/admin">Admin</a>
                        </li>
                    }
                </ul>
            </div>
            <div className="icon">
                <a href="https://www.facebook.com/nmthanh.fu02" target="_blank"><i className="bi bi-facebook"></i></a>
                <a href="https://www.instagram.com/nmt_2902/" target="_blank"><i className="bi bi-instagram"></i></a>
                <a href="https://github.com/FUnmthank02" target="_blank"><i className="bi bi-github"></i></a>
            </div>
            <div className="copyright">
                <p>&#169; Powered by nmthanh2902</p>
            </div>
        </div>
    )
}

export default Footer