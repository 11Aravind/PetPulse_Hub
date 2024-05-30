import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { httpRequest } from "../API/api"
export const Categorydetails = () => {
    const inlineStyle = { left: "0%", width: "100%", top: "103%", }
    const tableHeadding = [{ th: "#id" }, { th: "Main category" }, { th: "Category" }, { th: "subCategory" }, { th: "image" }, { th: "Action" },];
    const [categoryDetails, setCategoryDetails] = useState([]);
    const deleteCategory = (e) => {
        const category_id = e.target.id;
        const url = `api/category/${category_id}`;
        httpRequest('delete',url,)
        .then((data) =>{ 
            setCategoryDetails(prevDetails => prevDetails.filter(category => category._id !== category_id));
        });
    }
    useEffect(() => {
        httpRequest('get', "api/category").then((data) => {
            // Check if the fetched data is an object and has 'categoryDetails' array
            if (data && Array.isArray(data.categoryDetails)) {
                setCategoryDetails(data.categoryDetails);
            } else {
                console.error("Fetched data does not contain 'categoryDetails' array:", data);
            }
        }).catch(error => {
            console.error("Error fetching data:", error);
        });
    }, []);

    return (
        <div className="content-div">
            <div className="card-header">
                <div className="card-headding">Category
                </div>
                {/* <div className="errorMessage">{alertMessage}</div> */}
                <div className="top-button">
                    <Link to="/addcategory"> <button className="btn-primary"> +Add</button></Link>
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
                            categoryDetails.map((eachValue, id) =>
                                <tr key={id} scope="row">
                                    <td>{eachValue._id}</td>
                                    <td>{eachValue.mainCategory}</td>
                                    <td>{eachValue.category}</td>
                                    <td>{eachValue.subCategory}</td>
                                    <td><img src={`http://localhost:5001/${eachValue.image}`} alt="banner" className="bannerImg" /></td>
                                    <td>  <i className="bi bi-trash3-fill" id={eachValue._id} onClick={deleteCategory}></i>  </td>
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
// export default Categorydetails;
export const AddCategory = () => {
    const maincategory = useRef('');
    const category = useRef('');
    const subcategory = useRef('');
    const [image, setImage] = useState("");
    const [message, setMessage] = useState("");
    const showMessage = (msg) => {
        setMessage(msg);
        setTimeout(() => {
            setMessage("")
        }, 3000);
    }
    const resetValue = () => {
        maincategory.current.value = "";
        category.current.value = "";
        subcategory.current.value = "";
        setImage("");
    }
    const saveCategory = (e) => {
        // console.log(maincategory.current.value);
        const categoryData = new FormData();
        categoryData.append("mainCategory", maincategory.current.value);
        categoryData.append("category", category.current.value);
        categoryData.append("subCategory", subcategory.current.value);
        categoryData.append("image", image);
        // console.log(categoryData);
        httpRequest('post', 'api/category/add', categoryData)
            .then((data) => {
                resetValue();
                showMessage(data.message);
            })
            .catch((error) => console.log(error));
    }
    return (
        <div className="content-div">
            <div className="card-header">
                <div className="card-headding">Add Category</div>
                <div className="errorMessage">{message}</div>
            </div>
            <div className="table-container">
                <div className="row " style={{ padding: "37px" }}>
                    <div className="col">
                        <label htmlFor="maincat">Main Category</label>
                        <select className="form-select" id="maincat" ref={maincategory} aria-label="Default select example">
                            <option defaultValue="Select" selected>--Select--</option>
                            <option value="Pet">Pet</option>
                            <option value="Food">Food</option>
                            <option value="Accessorys">Accessorys</option>
                            <option value="Medicine">Medicine</option>
                        </select>
                    </div>
                    <div className="col">
                        <label htmlFor="category">Category</label>
                        <input type="text" id="category" ref={category} className="form-control" />
                    </div>
                </div>
                <div className="row" style={{ padding: "16px 37px" }}>
                    <div className="col">
                        <label htmlFor="sub_cat">Sub category</label>
                        <input type="text" ref={subcategory} className="form-control" id="sub_cat" />
                    </div>
                    <div className="col">
                        <label htmlFor="image">Image</label>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} className="form-control" id="image" />
                        <small style={{color:"red"}}>{image===""?"Please select an image":""}</small>
                    </div>
                </div>

                <div className="row" style={{ padding: "16px 37px" }}>
                    <button className="btn btn-primary" onClick={saveCategory}>Save</button>
                </div>
            </div>

        </div>
    )
}