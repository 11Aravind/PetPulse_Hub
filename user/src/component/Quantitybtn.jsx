import { useCart } from "react-use-cart";
import "./CSS/Quantitybtn.css"
export default function Quantitybtn({ item }) {
  const { updateItemQuantity, removeItem } = useCart();
  return (
    <>
      <div className="quantity_container">
        <div
          className="quantity_btn decreass_quantity"
          onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
        >
          -
        </div>
        <div className="quantity_btn quantity_count">{item.quantity}</div>
        <div
          className="quantity_btn"
          onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
        >
          +
        </div>
      </div>
    </>
  );
}