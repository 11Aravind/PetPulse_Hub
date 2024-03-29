import Card from "../component/Card";
const Pets=()=>{
    const petsDetails=[
        {
            url:"path",
            petName:"name",
            description:"description",
            oldPrice:400,
            newPrice:300
        },
        {
            url:"path",
            petName:"name",
            description:"description",
            oldPrice:400,
            newPrice:300
        },
        {
            url:"path",
            petName:"name",
            description:"description",
            oldPrice:400,
            newPrice:300
        },
    ]
    return(
        <div className="topSpacing">
            Pets page
           <div className="product-cards">
           <Card />
           <Card />
           <Card />
           <Card />
           <Card />
           <Card />
           <Card />
            </div> 
            
        </div>
    );
}
export default Pets;