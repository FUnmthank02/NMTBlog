import { useEffect, useState } from 'react'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import imgAbout from '../../image/img_about.jpg'
import imgArrow from '../../image/arrow.png'
import imgBall from '../../image/ball1.png'
import imgGoal from '../../image/goall.png'
import imgLine from '../../image/greenline.png'
import './about.scss'
import AOS from 'aos'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCakeCandles, faSignature, faLocationDot, faMessage } from '@fortawesome/free-solid-svg-icons'


function About() {

    const [scrollToTop, setScrollToTop] = useState(false)


    useEffect(() => {
        AOS.init({ duration: 1000 })
    }, [])

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

    return (
        <>
            <Header />
            <div className="container wrapper_about">
                <div className="row">
                    <div className="col-md-6 col-sm-12 col-xs-12">
                        <div className="left" data-aos="fade-right">
                            <div className="mb-3 line"></div>
                            <h2 className="mb-3 title">Welcome to NMT-Blog</h2>
                            <div className="content">
                                <p className="mb-3 text_about"><FontAwesomeIcon className="icon-info" icon={faSignature} />NGUYEN MINH THANH</p>
                                <p className="mb-3 text_about"><FontAwesomeIcon className="icon-info" icon={faCakeCandles} />02/09/2002</p>
                                <p className="mb-3 text_about"><FontAwesomeIcon className="icon-info" icon={faLocationDot} />Quoc Oai, Ha Noi, Viet Nam</p>
                                <p className="text_about"><FontAwesomeIcon className="icon-info" icon={faMessage} />I am Thanh, a student of FPTU Ha Noi. Now, I am studying Software Engineering and I have
                                    passion with creating something awesome. In my free time, I usually play football, games, watch movies or listen to music.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12 col-xs-12">
                        <div className="right" data-aos="fade-left">
                            <img id='imgabout' className="img-responsive" src={imgAbout} alt="img" />
                        </div>
                    </div>
                </div>

                <section id="interest">
                    <div class="img-line" data-aos="fade-right" >
                        <img src={imgLine} className="img-responsive" alt="line" />
                    </div>
                    <div class="container wrap_stadium">
                        <div class="row">
                            <div class="col-md-12 col-xs-12">
                                <div class="interest-stadium" data-aos="fade-left" >
                                    <div class="contain-arrow">
                                        <img id="arrow" className="img-responsive" src={imgArrow} alt="arrow" />
                                    </div>
                                    <div class="interest-ball">
                                        <img id="ball" className="img-responsive" src={imgBall} alt="ball" />
                                    </div>
                                    <div class="contain-goal">
                                        <img id="goal" className="img-responsive" src={imgGoal} alt="goal" />
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-8 offset-md-2 col-xs-12">
                                        <div class="interest-content" data-aos="fade-up">
                                            <div class="line"></div>
                                            <div class="main-cont">
                                                <h1 id="football">Football</h1>
                                                <h1>is my passion</h1>
                                                <p>Not only for entertain, but it also improve my health.</p>
                                                <p>I have more friends.</p>
                                                <p>Football is like life - it requires perseverance, self-denial, hardship, sacrifice, dedication and respect.</p>
                                                <p>Scoring in any match is always the happiest moment of my life.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>

                {scrollToTop && <button onClick={topFunction} id="myBtn" title="Go to top">Top</button>}

            </div>
            <Footer />
        </>
    )
}

export default About