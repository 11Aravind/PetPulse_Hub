const Caretaker = () => {
  return (
    <div className="container">
        <div className="banner"><img src="	http://localhost:5173/images/banner3.webp" alt="" /></div>
        <h3>Petcare Service</h3>
<p className="aboutPetcare">Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia culpa impedit asperiores doloremque, ipsa atque incidunt expedita dicta laudantium pariatur nobis quos adipisci at provident, beatae aliquid optio fugiat perspiciatis?</p>
    <div className="form-container">
    <form className="row g-2">
    <div className="col-md-3">
    <label for="inputState" className="form-label">Pet type</label>
    <select id="inputState" className="form-select">
      <option selected>Choose...</option>
      <option>...</option>
    </select>
  </div>
  <div className="col-md-3">
    <label for="inputState" className="form-label">Type</label>
    <input type="text" className="form-control" id="inputPassword4"/>
  </div>
  <div className="col-md-3">
    <label for="inputPassword4" className="form-label">Owner name</label>
    <input type="text" className="form-control" id="inputPassword4"/>
  </div>
  <div className="col-md-3">
    <label for="inputPassword4" className="form-label">Owner ID proof</label>
    <input type="file" className="form-control" id="inputPassword4"/>
  </div>
  <div className="col-md-4">
    <label for="inputPassword4" className="form-label">Phone No</label>
    <input type="text" className="form-control" id="inputPassword4"/>
  </div>
  <div className="col-md-4">
    <label for="inputPassword4" className="form-label">Phone No2(Optional)</label>
    <input type="text" className="form-control" id="inputPassword4" placeholder="Alternative  No"/>
  </div>
  <div className="col-md-4">
    <label for="inputPassword4" className="form-label">Select Pet hostel</label>
    <select id="inputState" className="form-select">
      <option selected>Choose...</option>
      <option>...</option>
    </select>
  </div>
  <div className="col-md-3">
    <label for="inputCity" className="form-label">Picup date</label>
    <input type="date" className="form-control" id="inputCity"/>
  </div>
  <div className="col-md-3">
    <label for="inputCity" className="form-label">Pickup time</label>
    <input type="time" className="form-control" id="inputCity"/>
  </div>
  <div className="col-md-3">
    <label for="inputCity" className="form-label">Deliver date</label>
    <input type="date" className="form-control" id="inputCity"/>
  </div>
  <div className="col-md-3">
    <label for="inputCity" className="form-label">Deliver time</label>
    <input type="time" className="form-control" id="inputCity"/>
  </div>
  <div className="col-12">
    <label for="inputAddress" className="form-label">Address(Address,locality,city,picode,state)</label>
    <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>  </div>


  <div className="col-12">
    <button type="button" className="bigButton">Set</button>
  </div>
</form>
    </div>
    </div>

  )
}

export default Caretaker
