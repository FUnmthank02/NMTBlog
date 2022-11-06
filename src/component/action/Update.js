import React, { useState, useEffect } from "react";
import axios from 'axios'
import { useSearchParams, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill"
import Parser from 'html-react-parser';
import 'react-quill/dist/quill.snow.css'
import Notify from '../notify/Notify'
import '../information/contact.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { storage } from "../../firebase/firebase_config"
import { ref, uploadBytes, deleteObject  } from "firebase/storage"

function Create() {

    const [APIData, setAPIData] = useState({})
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('');
    const [imgObject, setImgObject] = useState(null);
    const [content, setContent] = useState('');
    const [hastag, setHastag] = useState([]);
    const [noti, setNoti] = useState(false);
    const [postid, setPostid] = useState('');
    const [scrollToTop, setScrollToTop] = useState(false)


    const [searchParams, setSearchParams] = useSearchParams();
    let navigate = useNavigate()



    useEffect(() => {
        setContent(localStorage.getItem('content'));
        setHastag(localStorage.getItem('hastag'));
        setTitle(localStorage.getItem('title'));
        setImage(localStorage.getItem('image'));
    }, [])

    //method [POST] to add post to api data
    const putData = async () => {
        await axios.put(`https://63089daa722029d9ddd3b6dc.mockapi.io/api/post/${searchParams.get("postid")}`, {
            title,
            content,
            hastag,
            image
        })
    }

    // add post to api data
    const handleSubmit = e => {
        e.preventDefault()
        handleUploadImageToStorage()
        putData()
        setTitle('')
        setContent('')
        setHastag([])
        setImage('')
        setNoti(true)
        notify()
        handleRedirect()
    }

    const handleRedirect = () => {
        setTimeout(() => {
            navigate('/', { replace: true })
        }, 1000)
    }


    // upload image to storage firebase
    const handleUploadImageToStorage = () => {
        if (imgObject === null) return;

        //delete old image from storage
        handleDeleteImageFromStorage()

        //upload new image to storage firebase
        const imageRef = ref(storage, `images/${image}`)
        uploadBytes(imageRef, imgObject)
            .then(() => {
                console.log(`image uploaded to storage: ${image}`)
            })
            .catch((err) => {
                console.log(err.message)
            })
    }

    //delete image from storage firebase
    const handleDeleteImageFromStorage = () => {
        const desertRef = ref(storage, `images/${localStorage.getItem('image')}`)
        deleteObject(desertRef).then(() => {
            console.log(`image deleted from storage: ${localStorage.getItem('image')}`)
          }).catch((err) => {
            console.log(err.message)
          });
    }

    // set notify display in 1 minute
    const notify = () => {
        setTimeout(() => {
            setNoti(false)
        }, 1000)
    }

    const handleSplitHastag = (value) => {
        var arrhastag = value.split(',')
        setHastag(arrhastag)
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
            {/* <Header /> */}
            {noti && <Notify />}
            <div className="wrapper_contact">
                <a href="/" title="Back to home"><FontAwesomeIcon className="icon-back" icon={faArrowLeft} /></a>
                <div className="container">
                    
                        <form onSubmit={handleSubmit}>
                            <h2>Update post</h2>
                            <div className="form-group">
                                <label htmlFor="inputTitle">Title</label>
                                <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="form-control" id="inputTitle" placeholder="Enter title" required />
                            </div><hr />
                            <div className="form-group">
                                <label htmlFor="inputHastag">Hastag</label>
                                <input type="text" value={hastag} onChange={e => handleSplitHastag(e.target.value)} className="form-control" id="inputHastag" placeholder="Enter hastag with format: #hastag1,#hastag2..." required pattern="#[\w-]+(?:,+#[\w-]+)*" />
                            </div><hr />
                            <div className="form-group">
                                <label htmlFor="image">Upload image</label> <br />
                                <input type="file" id="image" className="hiddenInput" onChange={e => { setImgObject(e.target.files[0]); setImage(e.target.files[0].name) }} />
                                <label htmlFor="image" className="lable_imagebtn">Select file</label>
                                <span>{image || 'No file selected'}</span>
                            </div><hr />
                            <div className="form-group">
                                <label htmlFor="inputMessage">Content</label>
                                <ReactQuill
                                    theme='snow'
                                    placeholder="Enter content..."
                                    value={content}
                                    onChange={setContent}
                                    required={true}
                                />
                            </div><hr />

                            <button type="submit" className="btn btn-primary">Update</button>
                        </form>
                  

                </div>

                {scrollToTop && <button onClick={topFunction} id="myBtn" title="Go to top">Top</button>}

            </div>
        </>
    )
}

export default Create