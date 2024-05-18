import { useCart } from "react-use-cart";
const ButtonComponent = ({
  classs,
  product,
  text,
  viewProduct,
  checkOut,
  onClick,
  orderConfirmation,
  disableValue
}) => {
  const { addItem } = useCart();
  return (
    <>
      <button
        onClick={() => {
          if (viewProduct || checkOut || orderConfirmation) {
            if (onClick) onClick();
          } else {
            let tmpProduct = JSON.parse(JSON.stringify(product));
            tmpProduct.id = product._id;
            tmpProduct.price = product.newPrice;
            // console.log(tmpProduct);
            addItem(tmpProduct, 1);
            if (onClick) onClick();
          }
        }}
        className={classs}
        disabled={disableValue}>
        {text}
      </button>
    </>
  );
};
export default ButtonComponent;