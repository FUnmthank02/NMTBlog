import { useState } from "react"
import { storage } from "./firebase/firebase_config"
import { ref, uploadBytes, getDownloadURL } from "firebase/storage"

function Demo() {

    const [img, setImg] = useState(null)
    const [itemImage, setItemImage] = useState([])
    const test = 'vietnam'

    //date DD/MM/yyyy
    const date = new Date()
    const yourDate = `${date.getDate()}/${(date.getMonth() + 1)<10 ? `0${date.getMonth() + 1}` : (date.getMonth() + 1) }/${date.getFullYear()}`

    console.log(yourDate)
        

    const handleUpload = () => {
        if (img === null) return;

        const imageRef = ref(storage, `images/${img.name}`)
        uploadBytes(imageRef, img)
            .then(() => {
                alert('image uploaded')
            })
            .catch(() => {

            })

    }

    const handleGetImage = () => {
        // const listRef = ref(storage, 'images/bg_stadiumm.jpg');

        // getDownloadURL(listRef)
        //     .then((url) => {
        //         // `url` is the download URL for 'images/stars.jpg'
        //         console.log(url)
        //         console.log(typeof url)

        //         // Or inserted into an <img> element
        //         const img = document.getElementById('myimg');
        //         img.setAttribute('src', url);
        //     })
        //     .catch((error) => {
        //         // Handle any errors
        //         console.log(error.message)
        //     });
        

    }

    return (

        <div className="container">
            <input type="file" onChange={event => setImg(event.target.files[0])} />
            <button onClick={handleUpload}>Upload</button>
            <button onClick={handleGetImage}>Get image</button><br />
            <br />

            <img id="myimg" src="image" />
            <img src={`https://firebasestorage.googleapis.com/v0/b/blog-prj-52a10.appspot.com/o/images%2F${test}.jpg?alt=media&token=899116ea-143b-4d9e-95bd-ddba99770d07`} alt="" />
        </div>
    )
}

export default Demo