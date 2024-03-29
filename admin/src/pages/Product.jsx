import { useEffect, useState } from "react";
import {httpRequest} from "../API/api"
import Table from "../components/Table"
const Product=()=>{
    const tableHeadding = [
        {
            th: "#id"
        },
        {
            th: "Name"
        },
        {
            th: "Image"
        },
        {
            th: "oldPrice"
        },
        {
            th: "newPrice"
        },
        {
            th: "Description"
        },
        {
            th: "Action"
        },
    ];
    const [productList,setProductList]=useState([]);
       useEffect(() => {
        httpRequest('get',"api/product").then((data) => {
            // Check if the fetched data is an object and has 'productDetails' array
            // if (data && Array.isArray(data.productDetails)) {
                setProductList(data);
            // } else {
            //     console.error("Fetched data does not contain 'productDetails' array:", data);
            // }
        }).catch(error => {
            console.log("Error fetching data:", error);
        });
    }, []);
    const tableCardHeadding=
        {
            tableHeadding:"Product Details",
            buttonText:"Add",
            link:"/addproduct"
        };
    return(
      <div>
         <Table tableCardHeadding={tableCardHeadding} tableHeadding={tableHeadding} tableValues={productList} />
      </div>
    );
}
export default Product;