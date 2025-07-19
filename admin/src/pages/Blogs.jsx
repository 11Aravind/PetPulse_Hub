import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { httpRequest } from "../API/api";
import { Link } from "react-router-dom";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/saga-blue/theme.css'; // Import your preferred theme
import 'primereact/resources/primereact.min.css';
import '../components/assct/Table.css';

const Blogs = () => {
    const [blogs, setBlogDetails] = useState([]);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: 'contains' }
    });
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const visibility = useSelector((state) => state.visibility.visibility);

    useEffect(() => {
        httpRequest('get', "api/blog").then((data) => {
            if (data && Array.isArray(data.blogDetails)) {
                setBlogDetails(data.blogDetails);
            } else {
                console.error("Fetched data does not contain 'blogDetails' array:", data);
            }
        }).catch(error => {
            console.error("Error fetching data:", error);
        });
    }, []);

    const deleteBlog = (e) => {
        const blogId = e.target.id;
        httpRequest('delete', `api/blog/${blogId}`)
            .then((res) => {
                if (res.status === "success") {
                    toast.success(res.message, {
                        position: 'top-right',
                        autoClose: 3000,
                    });
                    setBlogDetails(prevDetails => prevDetails.filter(blog => blog._id !== blogId));
                } else {
                    toast.error(res.message, {
                        position: 'top-right',
                        autoClose: 3000,
                    });
                }
            });
    };

    const header = (
        <div className="flex justify-content-between align-items-center">
            <span className="p-input-icon-right">
                <i className="pi pi-search" />
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
                <div className="card-heading main-menu-heading">Blogs</div>
                <div className="top-button">
                    <Link to="/addblog">
                        <button className="btn-primary px-4">Add +</button>
                    </Link>
                </div>
            </div>
            <DataTable
                value={blogs}
                paginator
                rows={rowsPerPage}
                filters={filters}
                onFilter={(e) => setFilters(e.filters)}
                header={header}
                emptyMessage="No blogs found."
                globalFilterFields={['category', 'link', 'description']}
            >
                <Column field="_id" header="#id" body={(rowData, { rowIndex }) => rowIndex + 1} />
                <Column field="category" header="Category" sortable />
                <Column field="link" header="Link" sortable />
                <Column field="description" header="Description" sortable />
                <Column
                    header="Action"
                    body={(rowData) => (
                        <div>
                            <i className="bi bi-trash3-fill" id={rowData._id} onClick={deleteBlog}></i>
                            <Link to={`/updateblog/${rowData._id}`}>
                                <i className="bi bi-pencil-square"></i>
                            </Link>
                        </div>
                    )}
                />
            </DataTable>
        </div>
    );
};

export default Blogs;
