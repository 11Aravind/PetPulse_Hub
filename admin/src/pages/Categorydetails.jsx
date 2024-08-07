import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { httpRequest } from "../API/api"
import { useSelector } from "react-redux"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const Categorydetails = () => {
    const [categorys, setCategoryDetails] = useState([]);
    const visibility = useSelector((state) => state.visibility.visibility)
    // const deleteCategory = (e) => {
    //     const category_id = e.target.id;
    //     const url = `api/category/${category_id}`;
    //     httpRequest('delete', url)
    //         .then((data) => {
    //             setCategoryDetails(prevDetails => prevDetails.filter(category => category._id !== category_id));
    //         });
    // }
    const deleteCategory = (e) => {
        const category_id = e.target.id;

        // Ask for confirmation
        const isConfirmed = window.confirm("Are you sure you want to delete this category?");

        if (isConfirmed) {
            // User confirmed, proceed with deletion
            const url = `api/category/${category_id}`;
            httpRequest('delete', url)
                .then((data) => {
                    // Update state after successful deletion
                    // console.log(data);
                    if (data.status==="success") {
                        toast.success(data.message, {
                            position: 'top-right',
                            autoClose: 2000,
                        });
                    }
                    else {
                        toast.error(data.message, {
                            position: 'top-right',
                            autoClose: 2000,
                        });
                    }
                    setCategoryDetails(prevDetails => prevDetails.filter(category => category._id !== category_id));
                })
                .catch(error => {
                    // Optionally, handle the error
                    console.error("Error deleting category:", error);
                });
        }
    };

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
    const tableHeadding = [{ th: "#id" }, { th: "Main category" }, { th: "Category" }, { th: "subCategory" }, { th: "image" }, { th: "Action" },];
    return (
        <div className={visibility ? "flat-container" : "content-div"}>
            <ToastContainer />
            <div className="card-header">
                <div className="card-headding">Category</div>
                {/* <div className="errorMessage">{alertMessage}</div> */}
                <div className="top-button">
                    <Link to="/addcategory"> <button className="btn-primary"> +Add</button></Link>
                </div>
            </div>
            {/* <div className="content-div"> */}
            <div className="">
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
                            categorys.map((category, id) =>
                                <tr key={id} scope="row">
                                    <td>{category._id}</td>
                                    <td>{category.mainCategory}</td>
                                    <td>{category.category}</td>
                                    <td>{category.subCategory}</td>
                                    <td><img src={`http://localhost:5001/${category.image}`} alt="banner" className="bannerImg" /></td>
                                    <td>  <i className="bi bi-trash3-fill" id={category._id} onClick={deleteCategory}></i>  </td>
                                    <td>
                                        <Link to={`/categoryupdate/${category._id}`}>
                                            <i className="bi bi-pencil-square"  ></i>
                                        </Link>
                                    </td>
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
// export const AddCategory = () => {
//     const maincategory = useRef('');
//     const category = useRef('');
//     const subcategory = useRef('');
//     const [image, setImage] = useState("");
//     const resetValue = () => {
//         maincategory.current.value = "";
//         category.current.value = "";
//         subcategory.current.value = "";
//         setImage("");
//     }
//     const saveCategory = (e) => {
//         const categoryData = new FormData();
//         categoryData.append("mainCategory", maincategory.current.value);
//         categoryData.append("category", category.current.value);
//         categoryData.append("subCategory", subcategory.current.value);
//         categoryData.append("image", image);
//         // console.log(categoryData);
//         httpRequest('post', 'api/category/add', categoryData)
//             .then((data) => {
//                 // showMessage();
//                 toast.success(data.message, {
//                     position: 'top-right',
//                     autoClose: 2000,
//                     onClose: () => resetValue()// Redirect after toast is closed
//                 });
//             })
//             .catch((error) => console.log(error));
//     }
//     return (
//         <div className="content-div">
//             <ToastContainer />
//             <div className="card-header">
//                 <div className="card-headding">Add Category</div>
//                 {/* <div className="errorMessage">{message}</div> */}
//             </div>
//             <div className="table-container">
//                 <div className="row " style={{ padding: "37px" }}>
//                     <div className="col">
//                         <label htmlFor="maincat">Main Category</label>
//                         <select className="form-select" id="maincat" ref={maincategory} aria-label="Default select example">
//                             <option defaultValue="Select" selected>--Select--</option>
//                             <option value="Pet">Pet</option>
//                             <option value="Food">Food</option>
//                             <option value="Accessorys">Accessorys</option>
//                             <option value="Medicine">Medicine</option>
//                         </select>
//                     </div>
//                     <div className="col">
//                         <label htmlFor="category">Category</label>
//                         <input type="text" id="category" ref={category} className="form-control" />
//                     </div>
//                 </div>
//                 <div className="row" style={{ padding: "16px 37px" }}>
//                     <div className="col">
//                         <label htmlFor="sub_cat">Sub category</label>
//                         <input type="text" ref={subcategory} className="form-control" id="sub_cat" />
//                     </div>
//                     <div className="col">
//                         <label htmlFor="image">Image</label>
//                         <input type="file" onChange={(e) => setImage(e.target.files[0])} className="form-control" id="image" />
//                         <small style={{ color: "red" }}>{image === "" ? "Please select an image" : ""}</small>
//                     </div>
//                 </div>

//                 <div className="row" style={{ padding: "16px 37px" }}>
//                     <button className="btn btn-primary" onClick={saveCategory}>Save</button>
//                 </div>
//             </div>

//         </div>
//     )
// }
// import React, { useRef, useState } from 'react';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const AddCategory = () => {
    const maincategory = useRef('');
    const category = useRef('');
    const subcategory = useRef('');
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});

    const resetValue = () => {
        maincategory.current.value = "";
        category.current.value = "";
        subcategory.current.value = "";
        setImage(null);
        setErrors({});
    };

    const validateForm = () => {
        const newErrors = {};

        if (!maincategory.current.value) {
            newErrors.mainCategory = "Main category is required";
        }
        if (!category.current.value.trim()) {
            newErrors.category = "Category is required";
        }
        if (!subcategory.current.value.trim()) {
            newErrors.subCategory = "Sub category is required";
        }
        if (!image) {
            newErrors.image = "Image is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const saveCategory = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const categoryData = new FormData();
        categoryData.append("mainCategory", maincategory.current.value);
        categoryData.append("category", category.current.value);
        categoryData.append("subCategory", subcategory.current.value);
        categoryData.append("image", image);

        httpRequest('post', 'api/category/add', categoryData)
            .then((data) => {
                toast.success(data.message, {
                    position: 'top-right',
                    autoClose: 2000,
                    onClose: () => resetValue()
                });
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className="content-div">
            <ToastContainer />
            <div className="card-header">
                <div className="card-heading">Add Category</div>
            </div>
            <div className="table-container">
                <form onSubmit={saveCategory}>
                    <div className="row" style={{ padding: "37px" }}>
                        <div className="col">
                            <label htmlFor="maincat">Main Category</label>
                            <select className="form-select" id="maincat" ref={maincategory} aria-label="Default select example">
                                <option value="">--Select--</option>
                                <option value="Pet">Pet</option>
                                <option value="Food">Food</option>
                                <option value="Accessorys">Accessorys</option>
                                <option value="Medicine">Medicine</option>
                            </select>
                            {errors.mainCategory && <small style={{ color: "red" }}>{errors.mainCategory}</small>}
                        </div>
                        <div className="col">
                            <label htmlFor="category">Category</label>
                            <input type="text" id="category" ref={category} className="form-control" />
                            {errors.category && <small style={{ color: "red" }}>{errors.category}</small>}
                        </div>
                    </div>
                    <div className="row" style={{ padding: "16px 37px" }}>
                        <div className="col">
                            <label htmlFor="sub_cat">Sub category</label>
                            <input type="text" ref={subcategory} className="form-control" id="sub_cat" />
                            {errors.subCategory && <small style={{ color: "red" }}>{errors.subCategory}</small>}
                        </div>
                        <div className="col">
                            <label htmlFor="image">Image</label>
                            <input type="file" onChange={(e) => setImage(e.target.files[0])} className="form-control" id="image" />
                            {errors.image && <small style={{ color: "red" }}>{errors.image}</small>}
                        </div>
                    </div>
                    <div className="row" style={{ padding: "16px 37px" }}>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddCategory;
