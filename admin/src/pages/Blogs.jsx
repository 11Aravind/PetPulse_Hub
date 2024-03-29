import { useEffect, useState } from "react";
import { httpRequest } from "../API/api";
import { Link } from "react-router-dom";
import Table from "../components/Table"
const Blogs = () => {
    const inlineStyle = {
        left: "0%",
        width: "100%",
        top: "111%",
    }
    const tableHeadding = [
        {
            th: "#id"
        },
        {
            th: "Tittle"
        },
        {
            th: "Image"
        },
        {
            th: "Description"
        },
        {
            th: "Action"
        },
        {
            th: ""
        },
    ];
    const [blogDetails, setBlogDetails] = useState([]);
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
    const tableCardHeadding =
    {
        tableHeadding: "Blog Details",
        buttonText: " Add",
        link: "/addblog"
    };
    return (
        <div className="content-div">
             <div className="card-header">
                <div className="card-headding">Blog
                    {/* <p className="errorMessage">{alertMessage}</p> */}
                </div>
                <div className="top-button">

                    <Link to="/addblog"> <button className="btn-primary"> +Add</button></Link>

                </div>
            </div>
            <div className="content-div" style={inlineStyle}>
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
                            blogDetails.map((eachValue, id) =>
                                <tr key={id} scope="row">
                                    <td>{eachValue._id}</td>
                                    <td>{eachValue.tittle}</td>
                                    <td><img src={`http://localhost:5001/${eachValue.image}`} alt="banner" className="bannerImg" /></td>
                                    <td>{eachValue.description}</td>
                                    <td>  <i className="bi bi-trash3-fill"></i>  </td>
                                    {/* <td><i className="bi bi-pencil-square"></i> </td> */}
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