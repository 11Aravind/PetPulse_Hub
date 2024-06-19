import { useEffect, useState } from "react";
import { httpRequest } from "../API/api";
import "./CSS/orders.css"
import {useSelector} from "react-redux"
const Orders = () => {

  // const [orders, setOrders] = useState([]);
  const userId = JSON.parse(localStorage.getItem("userId"));
  // console.log(userId);
  const products = useSelector((state) => state.products.productList);
  const imgPath=useSelector(state=>state.common.imagePath);

  const [orders, setOrders] = useState([]);
  // console.log(products);

  useEffect(() => {
    httpRequest('get', `api/order?userId=${userId}`)
      .then((res) => {
        let orders = res.data;
        const ordersWithProductNames = orders.map((order) => {
          const itemsWithProductNames = order.items.map((item) => {
            const product = products.find((product) => product._id === item._id);
            return {...item, "name": product.name, image: product.image, description: product.description, oldPrice: product.oldPrice };
          });
          return {...order, items: itemsWithProductNames };
        });
        setOrders(ordersWithProductNames);
      })
      .catch((err) => console.log(err));
  }, [userId, products]);
  
  console.log(orders);
  return (
    <div className="container">
      <h1 className="headding">Our orders</h1>
      {
        orders.map((order, index) => {
          return (    
           <>
{ 
               order.items.map((item,key)=>{return( 
            <div className="order-row" key={index}>
              <div className="img">
                <img src={imgPath+item.image} alt="img" />
              </div>
              <div className="order-desctiption">
                  <p>{item.name}</p>
                  Quantity:{item.quantity}
                {/* {order.totelamount}, */}
                 PaymentMod: {order.paymentMode} ,Date:  {order.dateOfOrder}
               
                {/* return( */}
                {/* )
               }) */}
               
              </div>
              <div className="cancel-order">
                <button className="cancelBtn" id={order._id}>cancel</button>
              </div>
            </div>
            )})
        }
           </>
          )
        })

      }

    </div>
  )
}

export default Orders
