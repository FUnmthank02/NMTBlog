import { useState, useEffect } from "react"
import { useSearchParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Parser from 'html-react-parser';
import Header from "../header/Header"
import Footer from "../footer/Footer"
import './search.scss'


function Search() {

    // const [APIData, setAPIData] = useState([])
    // const [refresh, setRefresh] = useState(false)
    const [filterSearch, setFilterSearch] = useState([])
    const [searchData, setSearchData] = useState('')

    const [searchParams, setSearchParams] = useSearchParams();

    //read post from api
    useEffect(() => {
        const fetchAPI = async () => {
            axios.get(`https://63089daa722029d9ddd3b6dc.mockapi.io/api/post?hastag=${searchParams.get("hastag")}`)
                .then((response) => {
                    setFilterSearch(response.data)
                    console.log(response.data)
                })
        }
        fetchAPI()
    }, [])

    return (
        <>
            <Header />

            <div className="container contain_search_body">
                {filterSearch.length <= 0 ? <h4>Not found</h4> : <h4>Post found: {filterSearch.length}</h4>}

                {filterSearch.length > 0 &&
                    <div>
                        {
                            filterSearch.map((data, index) => (
                                <div key={index} className="home_post_card">
                                    <div className="img_post_card">
                                        <img className="img_card img-responsive" src={(data.image !== undefined) ? `https://firebasestorage.googleapis.com/v0/b/blog-prj-52a10.appspot.com/o/images%2F${data.image}?alt=media&token=899116ea-143b-4d9e-95bd-ddba99770d07` : ''} alt="img post" />

                                    </div>
                                    <div className="content_post_card">
                                        <div className="action_line">
                                            <div className="line"></div>
                                        </div>
                                        <a className='link_post' href={`/post?postid=${data.id}`}>
                                            <h3 className="title_post">{data.title}</h3>
                                            <span className="description_post">{Parser(data.content)}</span>

                                        </a>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                }

            </div>

            <Footer />
        </>
    )
}


export default Search