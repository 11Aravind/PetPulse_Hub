import { useState, useEffect } from "react";
import { httpRequest } from "../API/api"
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
        <>
            {/* {
                blogs.map((blog, index) => {
                    return (
                        <iframe key={index}
                            width="560"
                            height="315"
                            src={blog.link}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Embedded youtube"
                        />
                    )
                })
            } */}
            <iframe width="560" height="315" src="https://www.youtube.com/embed/6LD30ChPsSs?si=ZWpQ1rmUdCaYhEpI" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </>
        //     <div className="topSpacing">
        //     <div className="row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-4 g-4" style={{ "marginTop": "40px" }}>
        //         {
        //             blogs.map((blog, index) => {
        //                 return (
        //                     <div className="col-6 col-sm-6 col-md-4 col-lg-3" key={index}>
        //                             {/* <div className="card h-100"> */}
        //                                 {/* <div className="img-container"> */}
        //                                     <iframe width="560" height="315" src={blog.link} title="YouTube video player"
        //                                      frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        //                                     referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        //                                 {/* </div> */}
        //                                 {/* <div className="card-body"> */}
        //                                     {/* <div className="card-title">{blog.description}</div>         */}
        //                                 {/* </div> */}
        //                             {/* </div> */}
        //                     </div>
        //                 )
        //             })
        //         }
        //     </div>
        // </div>
    )
}
export default Blogs;