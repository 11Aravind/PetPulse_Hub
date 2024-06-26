import { useRef, useState } from "react";
import { httpRequest } from "../API/api.js";
import "./CSS/form.css"
const Addblog = () => {
    const category = useRef("");
    const videoLink = useRef("");
    const description = useRef("");
    const [msg, setMessage] = useState("");
    const addBlog = () => {
        const blogData = {
            "category": category.current.value,
            "link": videoLink.current.value,
            "description": description.current.value
        }
        console.log(blogData);
        httpRequest(
            'post',
            "api/blog/add",
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
                <div className="card-headding">Add Blog </div>
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
                    <button className="btn btn-primary" onClick={addBlog}>Save</button>
                </div>
            </div>
        </div>
    );
}
export default Addblog;