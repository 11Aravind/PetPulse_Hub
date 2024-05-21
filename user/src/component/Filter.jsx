import Searchbox from "./Searchbox"
const Filter = ({products}) => {
  
    return (
         <>
        <div className="col-12 filterContainer"  >
        <div className="col-9 subHeadding">Filter   </div>
        <Searchbox products={products}/>
    </div>
    </>
          
    )
}
export default Filter;