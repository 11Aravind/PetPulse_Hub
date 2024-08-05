// import { useEffect, useState } from "react";
// import { httpRequest } from "../API/api";
// import "./CSS/orders.css"
// import { useSelector } from "react-redux"
// const Orders = () => {
//   const userId = JSON.parse(localStorage.getItem("userId"));
//   const products = useSelector((state) => state.products.productList);
//   const imgPath = useSelector(state => state.common.imagePath);
//   const addressArray = useSelector(state => state.address.addressList);
//   const [orders, setOrders] = useState([]);
//   const [loading, setLoading] = useState(true); // Add loading state
//   const [selectedRow,setSelectedRow]=useState(null);
//   const toggleAddress=(id)=>{
//     setSelectedRow(selectedRow===id ? null : id);
//   }
//   useEffect(() => {
//     httpRequest('get', `api/order?userId=${userId}`)
//       .then((res) => {
//         let orders = res.data;
//         const ordersWithProductNames = orders.map((order) => {
//           const itemsWithProductNames = order.items.map((item) => {
//             const product = products.find((product) => product._id === item._id);
//             return { ...item, "name": product.name, image: product.image, description: product.description, newPrice: product.newPrice };
//           });
//           return { ...order, items: itemsWithProductNames };
//         });
//         setOrders(ordersWithProductNames);
//         setLoading(false); // Mark loading as false after data is fetched
//       })
//       .catch((err) => {
//         console.log(err);
//         setLoading(false); // Ensure loading is set to false on error
//       });
//   }, [userId, products]);

//   if (loading) {
//     return <div>Loading...</div>; // Display loading indicator
//   }
// console.log(orders);
//   return (
//     <div className="container">
//       {orders.length === 0 ? (
//         <p>No orders found.</p>
//       ) : (
//        <div className="main">
//         <div className="left-filter">
//           <div className="mediumfont">Filters</div>
//           <ul className="filter-ul">
//             <li><div><input type="checkbox" className="checkbox" />On the way</div></li>
//             <li><div><input type="checkbox" className="checkbox" />Delivered</div></li>
//             <li><div><input type="checkbox" className="checkbox" />Cancelled</div></li>
            
//           </ul>

//         </div>
//         <div className="right-order">
//           {
//              orders.map((order, index) => {
//               const address = addressArray.find((item) => item._id === order.addressId);
//               return (
//                 <div key={index}>
//                   {order.items.map((item, key) => (
//                    <div className="order-container">
//                      <div className="order-row" key={key} onClick={()=>toggleAddress(order._id)}>
//                       <div className="img">
//                         <img src={imgPath + item.image} alt="img" />
//                       </div>
//                       <div className="order-description">
//                         <p>{item.name}</p>
//                         {/* Quantity: {item.quantity}<br />
//                         Payment Mode: {order.paymentMode}, Date: {order.dateOfOrder}<br />
//                         Address: {address ? address.address : 'Address not found'} */}
//                       </div>
//                       <div className="mediumfont">
//                       ₹{item.newPrice}-{item.quantity}
//                       </div>
//                       <div className="cancel-order">
//                         {/* <button className="cancelBtn" id={order._id}>cancel</button> */}
//                        <div className="flag-conatiner"> 
//                        <span className="order-flag"></span>
//                             <span style={{    "fontWeight": "600"}}> {item.order_message}</span>
//                        </div>
//                         {/* <span>Your item has been delivered</span> */}
//                       </div>
//                     </div>
//                     {selectedRow===order._id &&(  <div className="deliver-address">
//                         <div className="address-left">
//                           <div className="address-headding mediumfont">Delivery Address</div>
//                           {/* <div className="desc">Sreenandanam, Muthupilakkad kizhakku Kunnathur Subdistrict, Kollam District - 690520, Kerala</div> */}
//                           <div className="desc"> {address ? address.address : 'Address not found'} </div>
//                           <div className="head mediumfont">Phone number</div>
//                           <span>8848310248, 8129365304</span>
//                         </div>
//                         <div className="address-right">
//                      <div className="address-headding mediumfont">More actions</div>   
//                      <div className="desc">Download Invoice</div>
//                         </div>
//                       </div>)   }
                    
//                     </div>
//                   ))}
//                 </div>
//               );
//             })
//           }
//         </div>
//        </div>
//       )}
//     </div>
//   );
// };

// export default Orders;

import { useEffect, useState } from "react";
import { httpRequest } from "../API/api";
import "./CSS/orders.css";
import { useSelector } from "react-redux";

const Orders = () => {
  const userId = JSON.parse(localStorage.getItem("userId"));
  const products = useSelector((state) => state.products.productList);
  const imgPath = useSelector(state => state.common.imagePath);
  const addressArray = useSelector(state => state.address.addressList);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [selectedRow, setSelectedRow] = useState(null);

  const toggleAddress = (id) => {
    setSelectedRow(selectedRow === id ? null : id);
  }
  const cancelOrder = async (e) => {
    const userConfirmed = window.confirm('Do you want to cancel the order?');
    if (userConfirmed) {
      const orderId = e.target.id;
      try {
        // httpRequest('get', `api/user/getAddress?userId=${userId}`)
        const response = await httpRequest('post',`api/order/cancelOrder/${orderId}`);
        console.log(response);
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order._id === orderId
              ? { ...order, order_message: "Order Canceled" }
              : order
          )
        );
        console.log('Order has been cancelled.');
      } catch (error) {
        console.log('Error cancelling the order:', error);
      }
    } else {
      console.log('Order cancellation was aborted.');
    }
  };
  useEffect(() => {
    httpRequest('get', `api/order?userId=${userId}`)
      .then((res) => {
        let orders = res.data;
        const ordersWithProductNames = orders.map((order) => {
          const itemsWithProductNames = order.items.map((item) => {
            const product = products.find((product) => product._id === item._id);
            return { 
              ...item, 
              "name": product.name, 
              image: product.image, 
              description: product.description, 
              newPrice: product.newPrice, 
              order_message: order.order_message, // Add order_message here
              paymentMode: order.paymentMode 
            };
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

  console.log(orders);

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
            {/* {
              orders.map((order, index) => {
                const address = addressArray.find((item) => item._id === order.addressId);
                return (
                  <div key={index}>
                    {order.items.map((item, key) => (
                      <div className="order-container" key={key}>
                        <div className="order-row" onClick={() => toggleAddress(order._id)}>
                          <div className="img">
                            <img src={imgPath + item.image} alt="img" />
                          </div>
                          <div className="order-description">
                            <p>{item.name}</p>
                         
                          </div>
                          <div className="mediumfont">
                            ₹{item.newPrice} - {item.quantity}
                          </div>
                          <div className="cancel-order">
                            <div className="flag-container">
                              <span className="order-flag"></span>
                              <span style={{ fontWeight: "600" }}>{item.order_message}</span>
                            </div>
                          </div>
                        </div>
                        {selectedRow === order._id && (
                          <div className="deliver-address">
                            <div className="address-left">
                              <div className="address-heading mediumfont">Delivery Address</div>
                              <div className="desc">{address ? address.address : 'Address not found'}</div>
                              <div className="head mediumfont">Phone number</div>
                              <span>8848310248, 8129365304</span>
                            </div>
                            <div className="address-right">
                              <div className="address-heading mediumfont">More actions</div>
                              <div className="desc">Download Invoice</div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                );
              })
            } */}
            
                  {orders.map((order, index) => {
                    const address = addressArray.find(addr => addr._id === order.addressId);
                    return (
                      <div className="order-container" key={index}>
                       <div className="item-row">
                      <div className="cont">
                      {order.items.map((item, key) => (
                          <div className="item-details" key={key}>
                            <div className="img">
                              <img src={`${imgPath}${item.image}`} alt={item.name} />
                            </div>
                            <div className="order-description">
                              <p>{item.name}</p>
                              <p><b>₹</b>{item.newPrice} <b>Qnty-</b>{item.quantity}</p>
                            </div>                  
                          </div>
                        ))}
                      </div>
                         <div className="show-hide">
                         <div className="cancel-order">
                            <p className="err"> {order.order_message}</p>
                            {(order.order_message !== "Order Canceled" && order.order_message !== "Delivered") && (
                              <button className="cancel-btn" id={order._id} onClick={(e) => cancelOrder(e)}>Cancel Order</button>
                            )}
                            
                          </div>
                         {selectedRow !== order._id ? (
                            <i className="bi bi-chevron-right" onClick={() => toggleAddress(order._id)}></i>
                          ) : (
                            <i className="bi bi-chevron-down" onClick={() => toggleAddress(order._id)}></i>
                          )}
                         </div>
                       </div>
                        {/* {selectedRow === order._id && (
                          <div className="deliver-address">
                            <div className="address-left">
                              <div className="address-heading mediumfont">Delivery Address</div>
                              <div className="desc">{address ? address.address : 'Address not found'}</div>
                              <div className="head mediumfont">Phone number</div>
                              <span>{address ? address.mobileNo : 'Phone number not found'}</span>
                            </div>
                            {(order.order_message !== "Order Canceled") && (
                              <div className="address-right">
                                <div className="address-heading mediumfont">More actions</div>
                                <div className="desc"><button>Download Invoice</button></div>
                              </div>
                            )}
                          </div>
                        )} */}
                          {selectedRow === order._id && (
                    <div className="deliver-address">
                      <div className="address-left">
                        <div className="address-heading mediumfont">Delivery Address</div>
                        <div className="desc">{address ? address.address : 'Address not found'}</div>
                        <div className="head mediumfont">Phone number</div>
                        <span>{address ? address.mobileNo : 'Phone number not found'}</span>
                      </div>
                      {(order.order_message !== "Order Canceled") && (
                        <div className="address-right">
                          <div className="address-heading mediumfont">More actions</div>
                          <div className="desc"><button>Download Invoice</button></div>
                        </div>
                      )}
                    </div>
                  )}
                      </div>
                    );
                  })}
            
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
