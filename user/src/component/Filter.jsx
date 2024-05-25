// import Searchbox from "./Searchbox"
import ReactSearchBox from "react-search-box";
import { useSelector, useDispatch } from "react-redux";
import { filterAndStore } from "../Slice/productSlice"
const Filter = ({ products }) => {
    const data = [
        {
            key: "john",
            value: "John Doe",
        },
        {
            key: "jane",
            value: "Jane Doe",
        },
        {
            key: "mary",
            value: "Mary Phillips",
        },
        {
            key: "robert",
            value: "Robert",
        },
        {
            key: "karius",
            value: "Karius",
        },
    ];
    const product = useSelector((state) => state.products.filteredProduct);
    const dispatch = useDispatch()
    const applyFIlter = (e) => {
        const currentFilter = e.target.value;
        // console.log(currentFilter);
        let sortedData;
        if (currentFilter === "LOWtoHIGH") {
            sortedData = product.map((v, i) => ({ i, value: v.newPrice }))
                .sort((a, b) => a.value - b.value)
                .map((v) => product[v.i]);
            // console.log(sortedData);
        }
        else if (currentFilter === "HIGHtoLOW") {
            sortedData = product.map((v, i) => ({ i, value: v.newPrice }))
                .sort((a, b) => b.value - a.value) // Sort in descending order
                .map((v) => product[v.i]);
            // console.log(sortedData);           
        }
        else if (currentFilter === "AtoZ") {
            const sortedData = product.map((v, i) => ({ i, value: v.name }))
                .sort((a, b) => a.value.localeCompare(b.value))
                .map((v) => product[v.i]);

            // console.log(sortedData);
        }
        else if (currentFilter === "ZtoA") {
            sortedData = product.map((v, i) => ({ i, value: v.name }))
                .sort((a, b) => b.value.localeCompare(a.value))
                .map((v) => product[v.i]);
            // console.log(sortedData);
        }
        dispatch(filterAndStore(sortedData))

    }
    return (
        <>
                <div className="col-12 subHeadding">Filters   </div>
            <div className="col-12 row"  >
                <div className="col-4">
                    <select className="form-select" aria-label="Default select example" onChange={applyFIlter} defaultValue="none">
                        <option value="none">Featured</option>
                        <option value="AtoZ">Alphabetically, A-Z</option>
                        <option value="ZtoA">Alphabetically, Z-A</option>
                        <option value="LOWtoHIGH">Price, low to high</option>
                        <option value="HIGHtoLOW">Price, high to low</option>
                    </select>
                </div>
                <div className="col-4"></div>
                <div className="col-4">
                    {/* <Searchbox products={products} /> */}
                    <ReactSearchBox
                        placeholder="Start typing to filter..."
                        value="Doe"
                        data={products}
                        leftIcon={<>🎨</>}
                        iconBoxSize="48px"
                        onFocus={() => {
                            console.log("This function is called when is focussed");
                        }}
                        onChange={(value) => console.log(value)}
                        autoFocus
                        callback={(record) => console.log(record)}
                    />
                </div>
            </div>
        </>

    )
}
export default Filter;