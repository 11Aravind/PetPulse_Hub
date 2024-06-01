import { useEffect, useState } from "react";
import { httpRequest } from "../API/api"
import {useSelector} from "react-redux"
import { Link } from "react-router-dom"
import "../components/assct/Table.css"
const Product = () => {
    const tableHeadding = [
        { th: "#id" },
        { th: "Name" },
        { th: "Image" },
        { th: "oldPrice" },
        { th: "newPrice" },
        { th: "Description" },
        { th: "Action" },
    ];
    const [products, setProductList] = useState([]);
    const visibility=useSelector((state)=>state.visibility.visibility)

    useEffect(() => {
        httpRequest('get', "api/product").then((data) => {
            // Check if the fetched data is an object and has 'productDetails' array
            if (data && Array.isArray(data.productDetails)) {
                setProductList(data.productDetails);
            } else {
                console.error("Fetched data does not contain 'productDetails' array:", data);
            }
        }).catch(error => {
            console.log("Error fetching data:", error);
        });
    }, []);
    return (
   
        <div className={visibility?"flat-container":"content-div"} > 
        <div className="card-header">
            <div className="card-headding">Product Details</div>
            <div className="top-button">
                {
                    <Link to="/addproduct"> <button className="btn-primary"> +Add</button></Link>
                }     
                 </div>
        </div>
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
                    products.map((product, id) =>
                        <tr key={id} scope="row">
                            <td>{id+1}</td>
                            <td>{product.name}</td>
                            <td> <img src={`http://localhost:5001/${product.image}`} alt="img" style={{"width": "100px"}} /> </td>
                            <td>{product.oldPrice}</td>
                            <td>{product.newPrice}</td>
                            <td>{product.description}</td>
                            <td>  <i className="bi bi-trash3-fill"></i>  </td>
                            {/* <td><i className="bi bi-pencil-square"></i> </td> */}
                        </tr>
                    )
                }
            </tbody>
        </table>
    </div>
    );
}
export default Product;