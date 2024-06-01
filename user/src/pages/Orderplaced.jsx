import { useEffect } from "react";
import "./CSS/orderplaced.css";
import { useCart } from "react-use-cart";
const Orderplaced = () => {
    const { setItems } = useCart();
    useEffect(() => {
        setItems([])
    })
    return (
        <div className="containerDiv">
            <i class="bi bi-check2-circle" style={{ fontSize: "100px", color: "green" }}></i>
            <h3>PAYMENT SUCCESS</h3>
        </div>
    )
}

export default Orderplaced
