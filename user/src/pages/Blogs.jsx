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
            <div className="row row-cols-1 row-cols-md-3 g-4" style={{ "marginTop": "40px" }}>
                {
                    blogs.map((blog, index) => {
                        return (
                            <div className="col">
                                <div className="card h-100">
                                    <ReactPlayer url={blog.link} width="366px" height="207px" controls="true" />
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