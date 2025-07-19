import { useEffect, useState } from "react";
import { httpRequest } from "../API/api";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import 'react-toastify/dist/ReactToastify.css';
import "../components/assct/Table.css";

const Product = () => {
    const [products, setProductList] = useState([]);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: 'contains' }
    });
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [expandedName, setExpandedName] = useState({}); // State for tracking expanded names
    const [expandedDescription, setExpandedDescription] = useState({}); // State for tracking expanded descriptions
    const [expandedIDs, setExpandedIDs] = useState({}); // State for tracking expanded IDs

    const toggleExpand = (id) => {
        setExpandedIDs((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };
    const visibility = useSelector((state) => state.visibility.visibility);

    const deleteProduct = (e) => {
        const product_id = e.target.id;
        httpRequest('delete', `api/product/${product_id}`)
            .then((res) => {
                console.log(res.data);
                if (res.status === "success") {
                    toast.success(res.message, {
                        position: 'top-right',
                        autoClose: 3000,
                    });
                    setProductList(prevDetails => prevDetails.filter(product => product._id !== product_id));
                } else {
                    toast.error(res.message, {
                        position: 'top-right',
                        autoClose: 3000,
                    });
                }
            });
    };

    useEffect(() => {
        httpRequest('get', "api/product").then((data) => {
            if (data && Array.isArray(data.productDetails)) {
                setProductList(data.productDetails);
            } else {
                console.error("Fetched data does not contain 'productDetails' array:", data);
            }
        }).catch(error => {
            console.log("Error fetching data:", error);
        });
    }, []);

    const toggleExpandName = (id) => {
        setExpandedName((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const toggleExpandDescription = (id) => {
        setExpandedDescription((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const header = (
        <div className="flex justify-content-between align-items-center">
            <span className="p-input-icon-right">
                <InputText
                    placeholder="Search..."
                    onInput={(e) => setFilters({ ...filters, global: { value: e.target.value, matchMode: 'contains' } })}
                    style={{ width: '250px' }}
                />
            </span>
            <span className="flex align-items-center">
                <span className="mr-2">Show</span>
                <Dropdown
                    value={rowsPerPage}
                    options={[5, 10, 15]}
                    onChange={(e) => setRowsPerPage(e.value)}
                    placeholder="Select Rows"
                    className="p-dropdown"
                    style={{ width: '75px' }}
                />
                <span className="ml-2">records</span>
            </span>
        </div>
    );

    return (
        <div className={visibility ? "flat-container" : "content-div"}>
            <ToastContainer />
            <div className="card-header">
                <div className="card-heading main-menu-heading">Product Details</div>
                <div className="top-button">
                    <Link to="/addproduct">
                    <button className="btn-primary px-4">Add +</button>
                    </Link>
                </div>
            </div>
            <DataTable
                value={products}
                paginator
                rows={rowsPerPage}
                filters={filters}
                onFilter={(e) => setFilters(e.filters)}
                header={header}
                emptyMessage="No products found."
                globalFilterFields={['Slno','name', 'description']}
            >
                <Column header="Slno" body={(rowData, { rowIndex }) => rowIndex + 1} />
                <Column field="_id" header="#id" body={(rowData) => (
                    <span style={{ cursor: 'pointer' }} onClick={() => toggleExpand(rowData._id)}>
                        {expandedIDs[rowData._id] ? rowData._id : rowData._id.charAt(0)}
                        {rowData._id.length > 1 && (
                            <span style={{ color: 'blue', cursor: 'pointer' }}>
                                {expandedIDs[rowData._id] ? " Less" : " More"}
                            </span>
                        )}
                    </span>
                )} />
                                <Column field="name" header="Name" sortable body={(rowData) => {
                    const isExpanded = expandedName[rowData._id];
                    const displayName = isExpanded ? rowData.name : rowData.name.length > 40 ? `${rowData.name.substring(0, 40)}...` : rowData.name;
                    return (
                        <div>
                            {displayName}
                            {rowData.name.length > 40 && (
                                <span
                                    onClick={() => toggleExpandName(rowData._id)}
                                    style={{ color: 'blue', cursor: 'pointer', marginLeft: '5px' }}
                                >
                                    {isExpanded ? 'Less' : 'More'}
                                </span>
                            )}
                        </div>
                    );
                }} />
                <Column
                    field="image"
                    header="Image"
                    body={(rowData) => <img src={`http://localhost:5001/${rowData.image}`} alt="Product" style={{ width: "100px" }} />}
                />
                <Column field="oldPrice" header="Old Price" sortable />
                <Column field="newPrice" header="New Price" sortable />
                <Column field="description" header="Description" body={(product) => {
                    const isExpanded = expandedDescription[product._id];
                    const displayDescription = isExpanded ? product.description : product.description.length > 40 ? `${product.description.substring(0, 40)}...` : product.description;
                    return (
                        <div>
                            {displayDescription}
                            {product.description.length > 40 && (
                                <span
                                    onClick={() => toggleExpandDescription(product._id)}
                                    style={{ color: 'blue', cursor: 'pointer', marginLeft: '5px' }}
                                >
                                    {isExpanded ? 'Less' : 'More'}
                                </span>
                            )}
                        </div>
                    );
                }} />
                <Column
                    header="Action"
                    body={(rowData) => (
                        <div>
                            <i className="bi bi-trash3-fill" id={rowData._id} onClick={deleteProduct}></i>
                            <Link to={`/update/${rowData._id}`}>
                                <i className="bi bi-pencil-square"></i>
                            </Link>
                        </div>
                    )}
                />
            </DataTable>
        </div>
    );
};

export default Product;
