import { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { httpRequest } from "../API/api";
import { Link } from "react-router-dom";
const Blogs = () => {
    const [blogs, setBlogDetails] = useState([]);
    const visibility=useSelector((state)=>state.visibility.visibility)
    useEffect(() => {
        httpRequest('get',"api/blog").then((data) => {
            // Check if the fetched data is an object and has 'categoryDetails' array
            if (data && Array.isArray(data.blogDetails)) {
                setBlogDetails(data.blogDetails);
            } else {
                console.error("Fetched data does not contain 'blogDetails' array:", data);
            }
        }).catch(error => {
            console.error("Error fetching data:", error);
        });
    }, []);
    const tableHeadding = [
        {th: "#id"},
        {th: "category"},
        {th: "Link"},
        {th: "Description"},
        {th: "Action"},
        {th: ""},
    ];
    const deleteBlog = (e) => {
        const blogId = e.target.id;
        httpRequest('delete',`api/blog/${blogId}`)
            .then((res) => {
                console.log(res);
                if (res.status == "success") {
                    toast.success(res.message, {
                        position: 'top-right',
                        autoClose: 3000,
                    });
                    setBlogDetails(prevDetails => prevDetails.filter(blog => blog._id !== blogId));
                } else {
                    toast.error(res.message, {
                        position: 'top-right',
                        autoClose: 3000,
                    });
                }
            });
    }
    return ( 
        // {visibility?"flat-container":"content-div"}
        <div className={visibility?"flat-container":"content-div"}>
             <ToastContainer />
             <div className="card-header">
                <div className="card-headding">Blogs
                    {/* <p className="errorMessage">{alertMessage}</p> */}
                </div>
                <div className="top-button">
                    <Link to="/addblog"> <button className="btn-primary"> +Add</button></Link>
                </div>
            </div>
            <div className="content-div contentDiv" >
                <table className="table-container table">
                    <thead>
                        <tr className="table-headding">
                            {
                                tableHeadding.map((eachHeadding, id) =>
                                    <td key={id}>{eachHeadding.th}</td>
                                )
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            blogs.map((blog, id) =>
                                <tr key={id} scope="row">
                                    <td>{id+1}</td>
                                    <td>{blog.category}</td>
                                    <td>{blog.link}</td>
                                    <td>{blog.description}</td>
                                    <td>  <i className="bi bi-trash3-fill" id={blog._id} onClick={e => deleteBlog(e)}></i>  </td>
                                    <td><i className="bi bi-pencil-square"></i> </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
export default Blogs;