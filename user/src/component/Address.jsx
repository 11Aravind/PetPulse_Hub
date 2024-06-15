import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {httpRequest} from "../API/api"
import { useNavigate } from "react-router";
import {fetchAndStoreAddress} from "../Slice/addressSlice"

const Address = ({ changeAddressVisibility }) => {
  const dispatch=useDispatch();
    const navigate = useNavigate()
    const name = useRef("")
    const mobile = useRef("")
    const pincode = useRef("")
    const locality = useRef("")
    const address = useRef("")
    const city = useRef("")
    const state = useRef("")
    const addressList = useSelector((state) => state.address.addressList)
    const userId = JSON.parse(localStorage.getItem("userId"));
    console.log(userId);

    const onCheckOut = () => {
      userId === null && navigate("/login") ;
      return userId;
    };
    useEffect(() => {
      const userId = onCheckOut();
      userId === null && navigate("/login")
    }, [userId])
    const saveAddress = () => {
      const addressData = {
        "userId": userId,
        "name": name.current.value,
        "mobileNo": mobile.current.value,
        "address": address.current.value + ",  " + locality.current.value + ",  " + city.current.value + ",  " + pincode.current.value + ", " + state.current.value,
        "order_id": null,
      }
      // const dispatch=useDispatch();
      httpRequest('post', "api/user/address", addressData)
        .then((res) => {
          console.log(res)
          // addressList.push(res.data);
          const newAdddress=[...addressList,res.data]
          console.log(newAdddress);
          dispatch(fetchAndStoreAddress(newAdddress))
          // const addressList = useSelector((state) => state.address.addressList);
          // dispatch(fetchAndStoreAddress(addressList));
          changeAddressVisibility();
  
        })
        .catch((error) => console.log(error));
    }
    return (
      <>
        <form className=" container row g-3">
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">Name</label>
            <input type="text" className="form-control" ref={name} id="inputEmail4" />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputPassword4" className="form-label">Mobile No</label>
            <input type="Number" className="form-control" ref={mobile} id="inputPassword4" />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">Pincode</label>
            <input type="text" className="form-control" ref={pincode} id="inputEmail4" />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputPassword4" className="form-label">Locality</label>
            <input type="text" className="form-control" ref={locality} id="inputPassword4" />
          </div>
          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">Address</label>
            <input type="text" className="form-control" ref={address} id="inputAddress" placeholder="" />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputEmail4" className="form-label">City</label>
            <input type="text" className="form-control" ref={city} id="inputEmail4" />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputPassword4" className="form-label">State</label>
            <input type="text" className="form-control" ref={state} id="inputPassword4" />
          </div>
          <div className="row">
            <div className="col-md-6">
              <button type="button" className="checkOutBtn cancelBtn" onClick={changeAddressVisibility}>CANCEL</button>
            </div>
            <div className="col-md-6">
              <button type="button" className="checkOutBtn" onClick={saveAddress}>Confirm</button>
            </div>
          </div>
        </form>
      </>
    );
  }
  export default Address;