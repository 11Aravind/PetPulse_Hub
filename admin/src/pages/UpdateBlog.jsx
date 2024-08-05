import { useRef, useState ,useEffect} from "react";
import { httpRequest } from "../API/api.js";
import "./CSS/form.css"
import { useParams } from "react-router-dom";
const UpdateBlog = () => {
    const category = useRef("");
    const videoLink = useRef("");
    const description = useRef("");
    const [msg, setMessage] = useState("");
    const {blogId}=useParams()
    // useEffect(() => {
    //     httpRequest('get', "api/blog").then((data) => {
    //         // Check if the fetched data is an object and has 'categoryDetails' array
    //         if (data && Array.isArray(data.blogDetails)) {
    //             setBlogDetails(data.blogDetails);
    //         } else {
    //             console.error("Fetched data does not contain 'blogDetails' array:", data);
    //         }
    //     }).catch(error => {
    //         console.error("Error fetching data:", error);
    //     });
    // }, []);
 const [currentBlog,setCurrentBlog]=useState([])
    useEffect(() => {
        httpRequest('get', `api/blog`)
            .then(data => {
                if (data && data.blogDetails) {
                    // Use .find to get a single item
                    const selectedCategory = data.blogDetails.find(item => item._id === blogId);
                    setCurrentBlog(selectedCategory || {}); // Set to empty object if not found
                } else {
                    console.error("Fetched data does not contain 'blogDetails':", data);
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, [blogId]); 

    useEffect(() => {
        if (currentBlog) {
            // const category = useRef("");
            // const videoLink = useRef("");
            // const description = useRef("");
            // const [msg, setMessage] = useState("");
            console.log(currentBlog);
            
            // Update refs with currentCategory values
            if (category.current) category.current.value = currentBlog.category || "";
            if (videoLink.current) videoLink.current.value = currentBlog.link || "";
            if (description.current) description.current.value = currentBlog.description || "";
        }
    }, [currentBlog]); 
    const addBlog = () => {
        const blogData = {
            "category": category.current.value,
            "link": videoLink.current.value,
            "description": description.current.value,
            "blogId":blogId
        }
        console.log(blogData);
        httpRequest(
            'post',
            "api/blog/update",
            blogData,
        ).then((response) => {
            console.log(response);
            category.current.value = "";
            videoLink.current.value = "";
            description.current.value = "";
            setMessage(response.message);
            hideMessage()
        });
    }
    const hideMessage = () => {
        setTimeout(() =>
            setMessage(""), 3000)
    }
    return (
        <div className="content-div">
            <div className="card-header">
                <div className="card-headding">Update Blog </div>
                <div className="errorMessage">{msg}</div>
            </div>
            <div className="table-container">
                <div className="row " style={{ padding: "37px" }}>
                    <div className="col">
                        <label htmlFor="Tittle" className="form-label">Video Category</label>
                        <input type="text" ref={category} className="form-control" id="Tittle" />
                    </div>
                    <div className="col">
                        <label htmlFor="formFile" className="form-label">Youtube Link</label>
                        <input className="form-control" ref={videoLink} type="text" id="formFile" />
                    </div>
                    <div className=" mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                        <textarea className="form-control" ref={description} id="exampleFormControlTextarea1" rows="3"></textarea>
                    </div>
                    <button className="btn btn-primary" onClick={addBlog}>Update Blog</button>
                </div>
            </div>
        </div>
    );
}
export default UpdateBlog;