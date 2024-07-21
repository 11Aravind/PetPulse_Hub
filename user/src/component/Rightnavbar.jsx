import { Link } from "react-router-dom"
const Rightnavbar = () => {
    return (
        <div>
            <ul className="list-group list-group-flush">

                <Link to="/orders" >
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">My Orders</h6>
                    <span className="text-secondary"> <i className="bi bi-chevron-right"></i></span>
                </li>
                </Link>
                <Link to="/manageaddress">
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0">Manage Address</h6>
                    <span className="text-secondary"><i className="bi bi-chevron-right"></i></span>
                </li>
                </Link>
                <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                    <h6 className="mb-0"><i className="bi bi-power"></i>Logout</h6>
                </li>
            </ul>
        </div>
    )
}

export default Rightnavbar
