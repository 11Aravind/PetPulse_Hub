
import Navbar from "./components/Navbar";
import {AllRoutes} from "./AllRoutes";

const App=()=> {
  return (
  <div className="nav-container">
  <Navbar/>
  {/* <Table/> */}
  <AllRoutes/>
  </div>

  );
}

export default App;
