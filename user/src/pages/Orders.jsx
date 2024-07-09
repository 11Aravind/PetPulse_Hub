import { useEffect, useState } from "react";
import { httpRequest } from "../API/api";
import "./CSS/orders.css"
import { useSelector } from "react-redux"
const Orders = () => {
  const userId = JSON.parse(localStorage.getItem("userId"));
  const products = useSelector((state) => state.products.productList);
  const imgPath = useSelector(state => state.common.imagePath);
  const addressArray = useSelector(state => state.address.addressList);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state

  useEffect(() => {
    httpRequest('get', `api/order?userId=${userId}`)
      .then((res) => {
        let orders = res.data;
        const ordersWithProductNames = orders.map((order) => {
          const itemsWithProductNames = order.items.map((item) => {
            const product = products.find((product) => product._id === item._id);
            return { ...item, "name": product.name, image: product.image, description: product.description, oldPrice: product.oldPrice };
          });
          return { ...order, items: itemsWithProductNames };
        });
        setOrders(ordersWithProductNames);
        setLoading(false); // Mark loading as false after data is fetched
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Ensure loading is set to false on error
      });
  }, [userId, products]);

  if (loading) {
    return <div>Loading...</div>; // Display loading indicator
  }

  return (
    <div className="container">
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
       <div className="main">
        <div className="left-filter">
          <div className="mediumfont">Filters</div>
          <ul className="filter-ul">
            <li><div><input type="checkbox" className="checkbox" />On the way</div></li>
            <li><div><input type="checkbox" className="checkbox" />Delivered</div></li>
            <li><div><input type="checkbox" className="checkbox" />Cancelled</div></li>
            
          </ul>

        </div>
        <div className="right-order">
          {
             orders.map((order, index) => {
              const address = addressArray.find((item) => item._id === order.addressId);
              return (
                <div key={index}>
                  {order.items.map((item, key) => (
                   <div className="order-container">
                     <div className="order-row" key={key}>
                      <div className="img">
                        <img src={imgPath + item.image} alt="img" />
                      </div>
                      <div className="order-description">
                        <p>{item.name}</p>
                        {/* Quantity: {item.quantity}<br />
                        Payment Mode: {order.paymentMode}, Date: {order.dateOfOrder}<br />
                        Address: {address ? address.address : 'Address not found'} */}
                      </div>
                      <div className="mediumfont">
                      ₹{item.quantity}
                      </div>
                      <div className="cancel-order">
                        {/* <button className="cancelBtn" id={order._id}>cancel</button> */}
                       <div className="flag-conatiner"> 
                       <span className="order-flag"></span>
                            <span style={{    "fontWeight": "600"}}> Delivered on Apr 09</span>
                       </div>
                        <span>Your item has been delivered</span>
                      </div>
                    </div>
                      <div className="deliver-address">
                        <div className="address-left">
                          <div className="address-headding mediumfont">Delivery Address</div>
                          <div className="desc">Sreenandanam, Muthupilakkad kizhakku Kunnathur Subdistrict, Kollam District - 690520, Kerala</div>
                          <div className="head mediumfont">Phone number</div>
                          <span>8848310248, 8129365304</span>
                        </div>
                        <div className="address-right">
                     <div className="address-headding mediumfont">More actions</div>   
                     <div className="desc">Download Invoice</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })
          }
        </div>
       </div>
      )}
    </div>
  );
};

export default Orders;

