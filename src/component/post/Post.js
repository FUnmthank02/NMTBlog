import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Parser from 'html-react-parser';
import './post.scss'
import Header from '../header/Header'
import Footer from '../footer/Footer'
import avtuser from '../../image/avtuser.png'
import Notify from '../notify/Notify';

function Post() {
    const [APIData, setAPIData] = useState({})
    const [commentData, setCommentData] = useState([])
    const [comment, setComment] = useState('')
    const [noti, setNoti] = useState(false);
    const [scrollToTop, setScrollToTop] = useState(false)
    const [refresh, setRefresh] = useState(false)


    const [accemail, setAccemail] = useState(localStorage.getItem('userEmail'))


    // searchParams return a object
    const [searchParams, setSearchParams] = useSearchParams();
    const postid = Number(searchParams.get("postid"))

    let navigate = useNavigate()

    // //read post from api
    useEffect(() => {
        const fetchAPI = async () => {
            await axios.get(`https://63089daa722029d9ddd3b6dc.mockapi.io/api/post/${postid}`)
                .then((response) => {
                    setAPIData(response.data)
                })
        }
        fetchAPI()
    }, [refresh])

    // //read comment from api
    useEffect(() => {
        const fetchAPIComment = async () => {
            await axios.get(`https://63089daa722029d9ddd3b6dc.mockapi.io/api/comments?postid=${postid}`)
                .then((response) => {
                    setCommentData(response.data)
                })
        }
        fetchAPIComment()
    }, [refresh])

    const postComment = async () => {
        await axios.post(`https://63089daa722029d9ddd3b6dc.mockapi.io/api/comments`, {
            postid,
            accemail,
            comment
        })
        .then(() => {
            setRefresh(!refresh)
        })
    }

    // handle search
    const handleSearch = (value) => {
        let hastag = value.substring(1)
        navigate(`/search?hastag=${hastag}`, { replace: true })
    }

    //handle create new comment
    const handleCreateComment = (e) => {
        e.preventDefault()
        postComment()
        setComment('')
        setNoti(true)
        notify()
        // window.location.reload(false)
    }

    // set notify display in 1 minute
    const notify = () => {
        setTimeout(() => {
            setNoti(false)
        }, 1000)
    }

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
            {noti && <Notify />}
            <Header />
            <div className="container wrap_post">
                <div className="row wrap_post_main">
                    <div className="col-md-6 col-sm-12-col xs-12 left-head">
                        <div>
                            <h2 className='post_title'>{APIData.title}</h2>
                            <p className="post_date">{APIData.createdAt}</p>
                        </div>
                    </div>
                    <div className="col-md-6 col-sm-12 col-xs-12 right-head">
                        <img className='post_image' src={(APIData.image !== undefined) ? `https://firebasestorage.googleapis.com/v0/b/blog-prj-52a10.appspot.com/o/images%2F${APIData.image}?alt=media&token=899116ea-143b-4d9e-95bd-ddba99770d07` : ''} alt="img post" />

                    </div>

                    <div className="col-md-12 col-sm-12 col-xs-12 content">
                        <span className="post_content">{(APIData.content !== undefined ? Parser(APIData.content) : APIData.content)}</span>
                        {(APIData.hastag !== undefined) &&
                            APIData.hastag.map((item, index) => (
                                <span key={index} onClick={() => handleSearch(item)} className="post_hastag">{item}</span>
                            ))
                        }


                    </div>
                    <div className="col-md-12 col-sm-12 col-xs-12 contain-comment">
                        <div className="part mt-5 mb-5">
                            <h4 className="part-title">Comment</h4>
                            <div className="line_part"></div>
                        </div>

                        <div className="create-comment">
                            <div className="wrap-avt-comment">
                                <img className='img-responsive avt-comment' src={avtuser} alt="avt user" />
                            </div>
                            <div className="form-create-comment">
                                <form className='comment-form' onSubmit={handleCreateComment}>
                                    <textarea name="comment" id="comment" rows="4" onChange={e => setComment(e.target.value)} value={comment} />
                                    <button className='comment_btn' type='submit' >Submit</button>
                                </form>
                            </div>
                        </div>

                        <div className="contain-amount-comment">
                            <h4 className='amount-comment'>{commentData.length} {(commentData.length > 1) ? 'comments' : 'comment'}</h4>
                        </div>

                        {(commentData !== undefined) &&
                            commentData.map((data, index) => (
                                <div className="wrap-comment" key={index}>
                                    <div className="wrap-avt-comment">
                                        <img className='img-responsive avt-comment' src={avtuser} alt="avt user" />
                                    </div>

                                    <div className='contain-main-comment'>
                                        <div className="main-comment">
                                            <p className="user-fullname">{data.accemail}</p>
                                            <p className="cv-comment">{data.comment}</p>
                                        </div>
                                        <hr />
                                    </div>

                                </div>
                            ))
                        }
                    </div>
                </div>

                {scrollToTop && <button onClick={topFunction} id="myBtn" title="Go to top">Top</button>}

            </div>



            <Footer />
        </>
    )
}

export default Post