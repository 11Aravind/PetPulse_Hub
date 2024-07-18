import React, { useRef, useState } from "react";
import { httpRequest } from "../API/api";
const Caretaker = () => {
  const [isPetType, setPetType] = useState(false);
  const userId = JSON.parse(localStorage.getItem("userId"));

  // Refs for input fields
  const dropRef = useRef(null)
  const typeRef = useRef(null);
  const ownerNameRef = useRef(null);
  const [proof, setProof] = useState(null);
  const phoneNoRef = useRef(null);
  const altPhoneNoRef = useRef(null);
  const hostelRef = useRef(null);
  const pickupDateRef = useRef(null);
  const pickupTimeRef = useRef(null);
  const deliverDateRef = useRef(null);
  const deliverTimeRef = useRef(null);
  const addressRef = useRef(null);

  // Function to handle pet type selection
  const handlePetTypeChange = (e) => {
    const currentValue = e.target.value;
    if (currentValue === "other") {
      setPetType(true);
    } else {
      setPetType(false);
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    // Collect form data
    let type;
    if (dropRef.current.value === "other")
      type = typeRef.current.value
    else
      type = dropRef.current.value
    const formData = new FormData()
    formData.append("userId", userId);
    formData.append("type", type);
    formData.append("owner_name", ownerNameRef.current.value);
    formData.append("image", proof);// Access files for file inpu);
    formData.append("phone_no", phoneNoRef.current.value);
    formData.append("alt_phone_no", altPhoneNoRef.current.value);
    formData.append("hostel", hostelRef.current.value);
    formData.append("pickup", pickupDateRef.current.value);
    //  formData.append("pickupTime", pickupTimeRef.current.value);
    formData.append("deliver", deliverDateRef.current.value);
    //  formData.append("deliverTime", deliverTimeRef.current.value);
    formData.append("address", addressRef.current.value);

    // console.log(proof);
    httpRequest("post", "api/user/caretaking", formData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  };

  return (
    <div className="container">
      <div className="banner">
        <img src="http://localhost:5173/images/banner3.webp" alt="" />
      </div>
      <h3>Petcare Service</h3>
      <p className="aboutPetcare">
        The ID proof address and pickup address must be the same
      </p>
      <img src="../images/caretaking serviceVanner.webp" alt="img" />
      <div className="form-container">
        <form className="row g-2">
          <div className="row">
            <div className={isPetType ? "col-md-3" : "col-md-4"}>
              <label htmlFor="inputState" className="form-label">
                Pet type
              </label>
              <select
                id="inputState"
                className="form-select"
                ref={dropRef}
                onChange={handlePetTypeChange}
              >
                <option value="">--select--</option>
                <option value="dog">Dog</option>
                <option value="cat">Cat</option>
                <option value="parrot">Parrot</option>
                <option value="other">Other</option>
              </select>
            </div>
            {isPetType && (
              <div className="col-md-3">
                <label htmlFor="typeInput" className="form-label">
                  Type
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="typeInput"
                  placeholder="Enter the pet type"
                  ref={typeRef}
                />
              </div>
            )}
            <div className={isPetType ? "col-md-3" : "col-md-4"}>
              <label htmlFor="ownerNameInput" className="form-label">
                Owner name
              </label>
              <input
                type="text"
                className="form-control"
                id="ownerNameInput"
                ref={ownerNameRef}
              />
            </div>
            <div className={isPetType ? "col-md-3" : "col-md-4"}>
              <label htmlFor="proofInput" className="form-label">
                Owner ID proof
              </label>
              <input
                type="file"
                className="form-control"
                id="proofInput"
                onChange={(e) => setProof(e.target.files[0])}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-4">
              <label htmlFor="phoneNoInput" className="form-label">
                Phone No
              </label>
              <input
                type="text"
                className="form-control"
                id="phoneNoInput"
                ref={phoneNoRef}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="altPhoneNoInput" className="form-label">
                Phone No2 (Optional)
              </label>
              <input
                type="text"
                className="form-control"
                id="altPhoneNoInput"
                placeholder="Alternative No"
                ref={altPhoneNoRef}
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="hostelInput" className="form-label">
                Select Pet hostel
              </label>
              <select id="hostelInput" className="form-select" ref={hostelRef}>
                <option value="">Choose...</option>
                <option>Kollam</option>
                <option>Kottayam</option>
                <option>sasthamcotta</option>
              </select>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <label htmlFor="pickupDateInput" className="form-label">
                Pickup date
              </label>
              <input
                type="date"
                className="form-control"
                id="pickupDateInput"
                ref={pickupDateRef}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="pickupTimeInput" className="form-label">
                Pickup time
              </label>
              <input
                type="time"
                className="form-control"
                id="pickupTimeInput"
                ref={pickupTimeRef}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="deliverDateInput" className="form-label">
                Deliver date
              </label>
              <input
                type="date"
                className="form-control"
                id="deliverDateInput"
                ref={deliverDateRef}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="deliverTimeInput" className="form-label">
                Deliver time
              </label>
              <input
                type="time"
                className="form-control"
                id="deliverTimeInput"
                ref={deliverTimeRef}
              />
            </div>
          </div>
          <div className="col-12">
            <label htmlFor="addressTextarea" className="form-label">
              Address (Address, locality, city, pincode, state)
            </label>
            <textarea
              className="form-control"
              id="addressTextarea"
              rows="3"
              ref={addressRef}
            ></textarea>
          </div>
          <div className="col-12">
            <button type="button" onClick={handleSubmit} className=" boxBtn bigButton ">
              Request For Service
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Caretaker;
