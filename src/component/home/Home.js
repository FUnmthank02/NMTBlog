import { useEffect, useState } from 'react'
import axios from 'axios'
import imgHome from '../../image/bg_login.jpg'
import './home.scss'
import AOS from 'aos'
import Parser from 'html-react-parser';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { storage } from "../../firebase/firebase_config"
import { ref, deleteObject } from "firebase/storage"


// API post: https://63089daa722029d9ddd3b6dc.mockapi.io/api/post
// API comments: https://63089daa722029d9ddd3b6dc.mockapi.io/api/comments


function Home() {

    const [scrollToTop, setScrollToTop] = useState(false)
    const [APIData, setAPIData] = useState([])
    const [alertDialog, setAlertDialog] = useState(false)
    const [removeId, setRemoveId] = useState('')
    const [refresh, setRefresh] = useState(false)
    const [searchData, setSearchData] = useState('')
    const [deleteImage, setDeleteImage] = useState('')


    let navigate = useNavigate()

    useEffect(() => {
        AOS.init({ duration: 1000 })
    }, [])

    //read post from api
    useEffect(() => {
        const fetchAPI = async () => {
            axios.get(`https://63089daa722029d9ddd3b6dc.mockapi.io/api/post`)
                .then((response) => {
                    setAPIData(response.data)
                })
        }
        fetchAPI()
    }, [refresh])

    //delete by id
    const handleDelete = (id) => {
        axios.delete(`https://63089daa722029d9ddd3b6dc.mockapi.io/api/post/${id}`)
            .then(() => {
                setRefresh(!refresh)
            })
    }

    // open confirm box
    const handleClickOpen = (data) => {
        setDeleteImage(data.image)
        setRemoveId(data.id)
        setAlertDialog(true)
    }

    // close confirm box
    const handleClose = () => {
        setAlertDialog(false);
    };

    //remove field by id
    const handleRemove = () => {
        handleDelete(removeId)
        handleDeleteImageFromStorage()
        handleClose()
    }

    //delete image from storage firebase
    const handleDeleteImageFromStorage = () => {
        const desertRef = ref(storage, `images/${deleteImage}`)
        deleteObject(desertRef).then(() => {
        }).catch((err) => {
            console.log(err.message)
        });
    }

    //update
    const handleUpdate = (data) => {
        let { content, createAt, hastag, id, image, title } = data;
        localStorage.setItem('content', content);
        localStorage.setItem('hastag', hastag);
        localStorage.setItem('image', image);
        localStorage.setItem('title', title);
        navigate(`/update?postid=${data.id}`, { replace: true })
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
            <div className="container wrapper_home">
                {alertDialog &&
                    <div>
                        <Dialog
                            open={alertDialog}
                            onClose={handleClose}
                            aria-labelledby="alert-dialog-title"
                            aria-describedby="alert-dialog-description"
                        >
                            <DialogTitle id="alert-dialog-title">
                                {"Confirm removement"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-description">
                                    Are you sure you want to remove this ?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={handleRemove}>Remove</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                }
                {/* create post */}
                {localStorage.getItem('accessAdmin') &&
                    <div className="create_admin">
                        <button className='btn_create'><a className="nav-link nav_item_text" href="/create"><i className="bi bi-plus"></i>Create post</a></button>
                    </div>
                }
                {/* introduce */}
                <div className="home_intro">
                    <div className="part">
                        <h2>INTRODUCE</h2>
                        <div className="line_part"></div>
                    </div>
                    <div className="row wrap_intro">
                        <div className="col-md-6 col-xs-12">
                            <div className="left" data-aos="fade-right">
                                <div className="mb-3 line"></div>
                                <h3 className="mb-3 title">Welcome to NMT-Blog</h3>
                                <p className="text_home">Hello guys, first of all I'm so glad you're here. This is my blog where
                                    I write post and share my experiences, story or something interesting with you all.
                                    This is a place where I can express my feelings or entertain through articles,
                                    I also hope you will enjoy it, and this blog will reach more people. Thank you!</p>

                            </div>
                        </div>
                        <div className="col-md-6 col-xs-12">
                            <div className="right">
                                <div className="right" data-aos="fade-left">
                                    <img id='imghome' className="img-responsive" src={imgHome} alt="img" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* post */}
                <div className="home_post">

                    <div className="row">
                        <div className="col-md-9 col-sm-9 col-xs-12">
                            <div className="part">
                                <h2>NEW POST</h2>
                                <div className="line_part"></div>
                            </div>
                            {/* map all post and display them  */}
                            {APIData.map((data, index) => (
                                <div key={index} className="home_post_card">
                                    <div className="img_post_card">
                                        <img className="img_card img-responsive" src={(data.image !== undefined) ? `https://firebasestorage.googleapis.com/v0/b/blog-prj-52a10.appspot.com/o/images%2F${data.image}?alt=media&token=899116ea-143b-4d9e-95bd-ddba99770d07` : ''} alt="img post" />

                                    </div>
                                    <div className="content_post_card">
                                        <div className="action_line">
                                            <div className="line"></div>
                                            {localStorage.getItem('accessAdmin') &&
                                                <div className="action_admin">
                                                    <span className="action" onClick={() => handleUpdate(data)}>Update</span>
                                                    <span className="action" onClick={() => handleClickOpen(data)}>Delete</span>
                                                </div>
                                            }
                                        </div>
                                        <a className='link_post' href={`/post?postid=${data.id}`}>
                                            <h3 className="title_post">{data.title}</h3>
                                            <span className="description_post">{Parser(data.content)}</span>

                                        </a>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="col-md-3 col-sm-3 col-xs-12">
                            <div className="right_side">

                                {/* handle Search */}
                                <input type="search" onChange={(e) => setSearchData(e.target.value)} placeholder="Search..." />
                                <br /> <button><a href={`search?hastag=${searchData}`}>Search</a></button>

                            </div>
                        </div>


                    </div>
                </div>
                {/* scroll to top */}
                {scrollToTop && <button onClick={topFunction} id="myBtn" title="Go to top">Top</button>}

            </div>
            <div id="brand">nmthanh</div>

        </>
    )
}

export default Home