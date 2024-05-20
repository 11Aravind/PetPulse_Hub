import { useState, useEffect } from "react";
import { httpRequest } from "../API/api"
import ReactPlayer from 'react-player'

const Blogs = () => {
    const [blogs, setBlogs] = useState([])
    useEffect(() => {
        httpRequest('get', "api/blog/")
            .then((res) => {
                console.log(res.blogDetails)
                setBlogs(res.blogDetails)
            })
            .catch((err) => console.log(err));
    }, []);
    return (
        <div className="topSpacing">
            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 g-4" style={{ "marginTop": "40px" }}>
                {
                    blogs.map((blog, index) => {
                        return (
                            <div className="col-6 col-sm-6 col-md-4 col-lg-3" key={index}>
                                <div className="card h-100">
                                    <div className="img-container">
                                        <ReactPlayer url={blog.link} width="272px" height="227px" controls="true" />
                                    </div>
                                    <div className="card-body">
                                        <div className="card-title">{blog.description}</div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default Blogs;