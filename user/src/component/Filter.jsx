import Searchbox from "./Searchbox"
import { useSelector } from "react-redux";
const Filter = ({ products }) => {
    const product = useSelector((state) => state.products.filteredProduct);
    const applyFIlter = (e) => {
        const currentFilter = e.target.value;
        console.log(currentFilter);
        let sortedData;
        if (currentFilter === "LOWtoHIGH") {
            sortedData = product.map((v, i) => ({ i, value: v.newPrice }))
                .sort((a, b) => a.value - b.value)
                .map((v) => product[v.i]);
            console.log(sortedData);
        }
        else if (currentFilter === "HIGHtoLOW") {
            sortedData = product.map((v, i) => ({ i, value: v.newPrice }))
                .sort((a, b) => b.value - a.value) // Sort in descending order
                .map((v) => product[v.i]);

            console.log(sortedData);            // console.log(product.sort((item1, item2) => item2.newPrice - item1.newPrice));
        }
        else if (currentFilter === "AtoZ") {
            const sortedData = product.map((v, i) => ({ i, value: v.name }))
                .sort((a, b) => a.value.localeCompare(b.value))
                .map((v) => product[v.i]);

            console.log(sortedData);
        }
        else if (currentFilter === "ZtoA") {
            sortedData = product.map((v, i) => ({ i, value: v.name }))
                .sort((a, b) => b.value.localeCompare(a.value))
                .map((v) => product[v.i]);
            console.log(sortedData);

            // console.log(product.sort((item1, item2) => item2.name.localeCompare(item1.name)));
        }
    }
    return (
        <>
            <div className="col-12 filterContainer"  >
                <div className="col-1 subHeadding">Filters   </div>
                <div className="col-3">
                    <select className="form-select" aria-label="Default select example" onChange={applyFIlter} defaultValue="none">
                        <option value="none">Featured</option>
                        <option value="AtoZ">Alphabetically, A-Z</option>
                        <option value="ZtoA">Alphabetically, Z-A</option>
                        <option value="LOWtoHIGH">Price, low to high</option>
                        <option value="HIGHtoLOW">Price, high to low</option>
                    </select>
                </div>

                <div className="col-5"></div>
                <div className="col-3">
                    <Searchbox products={products} />

                </div>
            </div>
        </>

    )
}
export default Filter;