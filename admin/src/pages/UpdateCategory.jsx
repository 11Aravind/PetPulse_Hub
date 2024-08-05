// import { useParams } from "react-router-dom";
// import { useRef,useState ,useEffect} from "react";
// import {httpRequest} from "../API/api"
// export const UpdateCategory = () => {

//     const {categoryId} =useParams
//     const maincategory = useRef('');
//     const category = useRef('');
//     const subcategory = useRef('');
//     const [image, setImage] = useState("");
//     const [message, setMessage] = useState("");
//     const [categorys, setCategoryDetails] = useState([]);
//     const showMessage = (msg) => {
//         setMessage(msg);
//         setTimeout(() => {
//             setMessage("")
//         }, 3000);
//     }
//     const resetValue = () => {
//         maincategory.current.value = "";
//         category.current.value = "";
//         subcategory.current.value = "";
//         setImage("");
//     }
//     useEffect(() => {
//         httpRequest('get', "api/category").then((data) => {
//             if (data && Array.isArray(data.categoryDetails)) {
//                 setCategoryDetails(data.categoryDetails.filter(item=>item._id===categoryId));
//                 maincategory.current.value=categorys.mainCategory
//                 category.current.value=categorys.category
//                 subcategory.current.value=categorys.subCategory
//             } else {
//                 console.error("Fetched data does not contain 'categoryDetails' array:", data);
//             }
//         }).catch(error => {
//             console.error("Error fetching data:", error);
//         });
//     }, []);
//     const updateCategory = (e) => {
//         const categoryData = new FormData();
//         categoryData.append("mainCategory", maincategory.current.value);
//         categoryData.append("category", category.current.value);
//         categoryData.append("subCategory", subcategory.current.value);
//         categoryData.append("image", image);
//         categoryData.append("categoryId", categoryId);

//         // console.log(categoryData);
//         httpRequest('post', 'api/category/update', categoryData)
//             .then((data) => {
//                 resetValue();
//                 showMessage(data.message);
//             })
//             .catch((error) => console.log(error));
//     }
//     console.log(categorys);

//     return (
//         <div className="content-div">
//             <div className="card-header">
//                 <div className="card-headding">Update Category</div>
//                 <div className="errorMessage">{message}</div>
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
//                     <button className="btn btn-primary" onClick={updateCategory}>Update</button>
//                 </div>
//             </div>

//         </div>
//     )
// }
import { useParams } from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { httpRequest } from "../API/api";

export const UpdateCategory = () => {
    const { categoryId } = useParams(); // Correct way to extract params
    const maincategory = useRef(null); // Initialize refs with null
    const category = useRef(null);
    const subcategory = useRef(null);
    const [image, setImage] = useState("");
    const [message, setMessage] = useState("");
    const [currentCategory, setCurrentCategory] = useState(null); // Initialize with null

    const showMessage = (msg) => {
        setMessage(msg);
        setTimeout(() => {
            setMessage("");
        }, 3000);
    };

    const resetValue = () => {
        if (maincategory.current) maincategory.current.value = "";
        if (category.current) category.current.value = "";
        if (subcategory.current) subcategory.current.value = "";
        setImage("");
    };

    useEffect(() => {
        httpRequest('get', `api/category`)
            .then(data => {
                if (data && data.categoryDetails) {
                    // Use .find to get a single item
                    const selectedCategory = data.categoryDetails.find(item => item._id === categoryId);
                    setCurrentCategory(selectedCategory || {}); // Set to empty object if not found
                } else {
                    console.error("Fetched data does not contain 'categoryDetails':", data);
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, [categoryId]); // Add categoryId as a dependency

    useEffect(() => {
        if (currentCategory) {
            // Update refs with currentCategory values
            if (maincategory.current) maincategory.current.value = currentCategory.mainCategory || "";
            if (category.current) category.current.value = currentCategory.category || "";
            if (subcategory.current) subcategory.current.value = currentCategory.subCategory || "";
        }
    }, [currentCategory]); // Add currentCategory as a dependency

    const updateCategory = (e) => {
        e.preventDefault(); // Prevent default form submission behavior
        const categoryData = new FormData();
        categoryData.append("mainCategory", maincategory.current ? maincategory.current.value : "");
        categoryData.append("category", category.current ? category.current.value : "");
        categoryData.append("subCategory", subcategory.current ? subcategory.current.value : "");
        categoryData.append("image", image);
        categoryData.append("categoryId", categoryId);

        httpRequest('post', 'api/category/update', categoryData)
            .then((data) => {
                resetValue();
                showMessage(data.message);
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className="content-div">
            <div className="card-header">
                <div className="card-heading">Update Category</div>
                <div className="errorMessage">{message}</div>
            </div>
            <div className="table-container">
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
                        <small style={{ color: "red" }}>{!image ? "Please select an image" : ""}</small>
                    </div>
                </div>
                <div className="row" style={{ padding: "16px 37px" }}>
                    <button className="btn btn-primary" onClick={updateCategory}>Update</button>
                </div>
            </div>
        </div>
    );
};
