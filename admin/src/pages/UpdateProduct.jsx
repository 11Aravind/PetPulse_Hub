import { useEffect, useRef, useState } from "react";
import { httpRequest } from "../API/api"
import { useParams } from "react-router-dom";
const UpdateProduct = () => {
    const {productId} = useParams()
    const prodcutName = useRef('');
    const oldPrice = useRef('');
    const newPrice = useRef('');
    const Description = useRef('');
    const [image, setImage] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [categoryList, setCategoryList] = useState([]);
    const [message, setMessage] = useState("");
    const showMessage = (msg) => {
        setMessage(msg);
        setTimeout(() => setMessage(""), 3000)
    }
  const[currentProduct,setCurrentProduct]=useState([])
    useEffect(() => {
        httpRequest('get', `api/product`)
            .then(data => {
                if (data && data.productDetails) {
                    // Use .find to get a single item
                    const selectedCategory = data.productDetails.find(item => item._id === productId);
                    setCurrentProduct(selectedCategory || {}); // Set to empty object if not found
                } else {
                    console.error("Fetched data does not contain 'categoryDetails':", data);
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, [productId]); 
    useEffect(() => {
        if (currentProduct) {
            // Update refs with currentCategory values
           console.log(currentProduct);
        //    name
            if (prodcutName.current) prodcutName.current.value = currentProduct.name || "";
            if (oldPrice.current) oldPrice.current.value = currentProduct.oldPrice || "";
            if (newPrice.current) newPrice.current.value = currentProduct.newPrice || "";
            if (Description.current) Description.current.value = currentProduct.description || "";
            setCategoryId(currentProduct.category_id)
        }
    }, [currentProduct]); 
    useEffect(() => {
        httpRequest('get', "api/category").then((data) => {
            if (data && Array.isArray(data.categoryDetails)) {
                setCategoryList(data.categoryDetails);
            } else {
                console.error("Fetched data does not contain 'categoryDetails' array:", data);
            }
        }).catch(error => {
            console.error("Error fetching data:", error);
        });
    }, []);
    const resetValues = () => {
        prodcutName.current.value = "";
        Description.current.value = "";
        oldPrice.current.value = "";
        newPrice.current.value = "";
        setImage('');
    }
    const updateProduct = () => {
        const productDetails = new FormData();
        productDetails.append('name', prodcutName.current.value);
        productDetails.append('image', image);
        productDetails.append('description', Description.current.value);
        productDetails.append('oldPrice', oldPrice.current.value);
        productDetails.append('newPrice', newPrice.current.value);
        productDetails.append('status', 0);
        productDetails.append('category_id', categoryId);
        productDetails.append('productId', productId);
        console.log(productDetails);
        httpRequest('post', 'api/product/update', productDetails)
            .then((response) => {
                showMessage(response.message);
                resetValues();
            })
            .catch((err) => console.log(err));
    }
    return (
        <div className="content-div">
            <div className="card-header">
                <div className="card-headding">Update Product </div>
                <div className="errorMessage">{message}</div>
            </div>
            <div className="table-container">
                <div className="row " style={{ padding: "37px" }}>
                    <div className="col">
                        <label htmlFor="category">Product Name</label>
                        <input type="text" id="category" className="form-control" ref={prodcutName} />
                    </div>
                    <div className="col">
                        <label htmlFor="maincat">Category</label>
                        <select className="form-select" id="maincat" aria-label="Default select example" value={categoryId} onClick={(e) => setCategoryId(e.target.value)}>
                            <option value="choose_anything" selected>--Select--</option>
                            {
                                categoryList.map((category, index) => {
                                    return <option value={category._id} key={index}>{category.mainCategory},{category.category},{category.subCategory}</option>
                                })
                            }
                        </select>
                    </div>
                </div>
                <div className="row" style={{ padding: "16px 37px" }}>
                    <div className="col-4">
                        <label htmlFor="sub_cat">Old Price</label>
                        <input type="text" className="form-control" id="sub_cat" ref={oldPrice} />
                    </div>
                    <div className="col-4">
                        <label htmlFor="sub_cat">Price</label>
                        <input type="text" className="form-control" id="sub_cat" ref={newPrice} />
                    </div>
                    <div className="col-4">
                        <label htmlFor="sub_cat">Image</label>
                        <input type="file" className="form-control" id="sub_cat" onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                </div>
                <div className="row" style={{ padding: "16px 37px" }}>
                    <div className=" mb-3">
                        <label htmlFor="exampleFormControlTextarea1" className="form-label">Description</label>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" ref={Description}></textarea>
                    </div>
                </div>


                <div className="row" style={{ padding: "16px 37px" }}>
                    <button className="btn btn-primary" onClick={updateProduct}>Update</button>
                </div>
            </div>

        </div>
    );
}
export default UpdateProduct;