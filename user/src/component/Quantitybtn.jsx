import { useState } from "react";
import "./CSS/Quantitybtn.css";
const Quantitybtn=()=>{
    const[quentity,setQuantity]=useState(1)
    return(
        <div className="quantitybtn-container">
            <div className="quentitybtn quentity_decreass" onClick={()=>setQuantity(quentity-1)} >-</div>
            <div className="quantity  quentity_count">{quentity}</div>
            <div className="quentitybtn quentity_increass" onClick={()=>setQuantity(quentity+1)}>+</div>
        </div>
    )
}
export default Quantitybtn;