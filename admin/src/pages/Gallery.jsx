import { useState } from "react";
import { httpRequest } from "../API/api";
import Table from "../components/Table";
import { useEffect } from "react";
const Gallery = () => {
      const [file, setFile] = useState("");
    const [alertMessage, setMessage] = useState("");
    const showMessage = (msg) => {
        setMessage(msg);
        setTimeout(() => {
            setMessage("");
        }, 3000);
    }
    const uploadImage = () => {
        if (file === "")
            showMessage("Select any file before clicking upload Button");
        else {
            const galleryData = new FormData();
            galleryData.append('image', file);
            httpRequest('post',"api/gallery/savegallery",galleryData).then((res) => showMessage(res.message));
        }
    }
    return (
        <div className="content-div">
            <div className="card-header">
                <div className="card-headding">Gallery
                    <p className="errorMessage">{alertMessage}</p>
                </div>
            </div>
            <div className="table-container">
                <div className="row " style={{ padding: "37px" }}>
                    <div className="col">
                        <input type="file" onChange={(e) => setFile(e.target.files[0])} className="form-control" id="Tittle" />
                    </div>
                    <div className="col">
                        <button className="btn btn-primary form-control" onClick={uploadImage}>Upload</button>
                    </div>
                </div>
            </div>
            <Gallerylist />
            {/* <Table tableCardHeadding={tableCardHeadding} tableHeadding={tableHeadding} tableValues={tableValues} inlineStyle ={inlineStyle} /> */}
        </div>
    );
}
export default Gallery;
export const Gallerylist=()=>{
    const inlineStyle={
        left: "0%",
        width: "100%",
        top: "111%",
    }
    const tableHeadding = [
        {
            th: "#id"
        },
        {
            th: "Image"
        },
        {
            th: "Action"
        },
    ];
    const[galleryDetails,setGalleryDetails]=useState([]);
    useEffect(() => {
        httpRequest('get',"api/gallery").then((data) => {
            // Check if the fetched data is an object and has 'categoryDetails' array
            if (data && Array.isArray(data.galleryList)) {
                setGalleryDetails(data.galleryList);
            } else {
                console.error("Fetched data does not contain 'galleryList' array:", data);
            }
        }).catch(error => {
            console.error("Error fetching data:", error);
        });
    }, []);
    return(
        <>
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
                        galleryDetails.map((eachValue, id) =>
                            <tr key={id} scope="row">
                                <td>{eachValue._id}</td>
                                <td><img src={`http://localhost:5000/${eachValue.url}`} alt="banner" className="bannerImg"  /></td>
                                <td>  <i className="bi bi-trash3-fill"></i>  </td>
                                {/* <td><i className="bi bi-pencil-square"></i> </td> */}
                            </tr>
                        )
                    }
                </tbody>
            </table> 
            </div>
        </>
    );
}