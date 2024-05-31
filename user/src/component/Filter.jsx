// Filter.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterAndStore } from "../Slice/productSlice";
import ReactSearchBox from "react-search-box";

const Filter = () => {
    const dispatch = useDispatch();
    // const[exp,setExp]=useState([])
    const product = useSelector((state) => state.products.filteredProduct);
    // setExp(product)
    const [searchValue, setSearchValue] = useState("");

    const applyFilter = (e) => {
        const currentFilter = e.target.value;
        let sortedData;

        if (currentFilter === "LOWtoHIGH") {
            sortedData = product.slice().sort((a, b) => a.newPrice - b.newPrice);
        } else if (currentFilter === "HIGHtoLOW") {
            sortedData = product.slice().sort((a, b) => b.newPrice - a.newPrice);
        } else if (currentFilter === "AtoZ") {
            sortedData = product.slice().sort((a, b) => a.name.localeCompare(b.name));
        } else if (currentFilter === "ZtoA") {
            sortedData = product.slice().sort((a, b) => b.name.localeCompare(a.name));
        }
        // console.log(sortedData);
        dispatch(filterAndStore(sortedData));
    };

    const handleSearchChange = (value) => {
        setSearchValue(value);
    };

    const filteredProducts = product.filter((prod) =>
        prod.name.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <>
            <div className="col-12 subHeadding">Filters</div>
            <div className="col-12 row">
                <div className="col-4">
                    <select className="form-select" aria-label="Default select example" onChange={applyFilter} defaultValue="none">
                        <option value="none">Featured</option>
                        <option value="AtoZ">Alphabetically, A-Z</option>
                        <option value="ZtoA">Alphabetically, Z-A</option>
                        <option value="LOWtoHIGH">Price, low to high</option>
                        <option value="HIGHtoLOW">Price, high to low</option>
                    </select>
                </div>
                <div className="col-4"></div>
                <div className="col-4">
                    <ReactSearchBox
                        placeholder="Start typing to filter..."
                        value={searchValue}
                        leftIcon={<>🎨</>}
                        iconBoxSize="48px"
                        data={filteredProducts.map(prod => ({ key: prod._id, value: prod.name }))}
                        onChange={handleSearchChange}
                        autoFocus
                    />
                </div>
            </div>
        </>
    );
};

export default Filter;
