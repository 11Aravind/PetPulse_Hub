import { useRef, useState } from "react";
import { httpRequest } from "../API/api.js";
import "./CSS/form.css"
const Addblog = () => {
    const tittle = useRef("");
    const description = useRef("");
    const [file, setImage] = useState();

    const addBlog = () => {
        const blogData = new FormData();
        blogData.append("tittle", tittle.current.value);
        blogData.append("description", description.current.value);
        blogData.append("image", file);
        httpRequest(
            'post',
            "api/blog/add",
            blogData,
        ).then((data) => console.log(data));
    }
    return (
        <div className="content-div">
            <div className="card-header">
                <div className="card-headding">Add Blog
                </div>
            </div>
            <div className="table-container">
                <div className="row " style={{ padding: "37px" }}>
                    <div className="col">
                        <label htmlFor="Tittle" className="form-label">Tittle</label>
                        <input type="text" ref={tittle} className="form-control" id="Tittle" />
                    </div>
                    <div className="col">
                        <label htmlFor="formFile" className="form-label">Image</label>
                        <input className="form-control" onChange={(e) => setImage(e.target.files[0])} type="file" id="formFile" />
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