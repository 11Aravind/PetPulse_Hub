import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { httpRequest } from "../API/api"
import { useSelector } from "react-redux"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';

import { DataTable } from 'primereact/datatable';
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/saga-blue/theme.css'; // Theme CSS
import 'primereact/resources/primereact.min.css'; // Core CSS
import 'primeicons/primeicons.css'; // Icons

export const Categorydetails = () => {
    const [categories, setCategoryDetails] = useState([]);
    const [filters, setFilters] = useState({
        global: { value: null, matchMode: 'contains' }
    });
    const [rowsPerPage, setRowsPerPage] = useState(5); // Default rows per page
    const visibility = useSelector((state) => state.visibility.visibility);
    const [expandedIDs, setExpandedIDs] = useState({}); // State for tracking expanded IDs
    const toggleExpand = (id) => {
        setExpandedIDs((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };
    const deleteCategory = (e) => {
        const category_id = e.target.id;

        // Ask for confirmation
        const isConfirmed = window.confirm("Are you sure you want to delete this category?");
        if (isConfirmed) {
            const url = `api/category/${category_id}`;
            httpRequest('delete', url)
                .then((data) => {
                    if (data.status === "success") {
                        toast.success(data.message, {
                            position: 'top-right',
                            autoClose: 2000,
                        });
                    } else {
                        toast.error(data.message, {
                            position: 'top-right',
                            autoClose: 2000,
                        });
                    }
                    setCategoryDetails(prevDetails => prevDetails.filter(category => category._id !== category_id));
                })
                .catch(error => {
                    console.error("Error deleting category:", error);
                });
        }
    };

    useEffect(() => {
        httpRequest('get', "api/category").then((data) => {
            if (data && Array.isArray(data.categoryDetails)) {
                setCategoryDetails(data.categoryDetails);
            } else {
                console.error("Fetched data does not contain 'categoryDetails' array:", data);
            }
        }).catch(error => {
            console.error("Error fetching data:", error);
        });
    }, []);

    const header = (
        <div className="flex justify-content-between align-items-center">
            <div className="flex align-items-center">
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
            </div>
            <div className="flex align-items-center">
                <InputText
                    placeholder="Search..."
                    onInput={(e) => setFilters({ ...filters, global: { value: e.target.value, matchMode: 'contains' } })}
                    style={{ width: '250px' }}
                />
            </div>
        </div>

    );

    return (
        <div className={visibility ? "flat-container" : "content-div"}>
            <ToastContainer />
            <div className="card-header">
                <div className="card-heading main-menu-heading">Category</div>
                <div className="top-button">
                    <Link to="/addcategory">
                    <button className="btn-primary px-4">Add +</button>
                    </Link>
                </div>
            </div>

            <DataTable
                value={categories}
                paginator
                rows={rowsPerPage}
                filters={filters}
                onFilter={(e) => setFilters(e.filters)}
                header={header}
                emptyMessage="No categories found."
                globalFilterFields={['Slno', '_id', 'mainCategory', 'category', 'subCategory']}
                // rowsPerPageOptions={[5, 10, 15]} // Options for rows per page
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

                <Column field="mainCategory" header="Main Category" />
                <Column field="category" header="Category" />
                <Column field="subCategory" header="SubCategory" />
                <Column
                    field="image"
                    header="Image"
                    body={(rowData) => (
                        <img src={`http://localhost:5001/${rowData.image}`} alt="banner" className="bannerImg" />
                    )}
                />
                {/* <Column
                    header="Action"
                    body={(rowData) => (
                        <>
                            <i className="bi bi-trash3-fill" id={rowData._id} onClick={deleteCategory}></i>
                            <Link to={`/categoryupdate/${rowData._id}`}>
                                <i className="bi bi-pencil-square"></i>
                            </Link>
                        </>
                    )}
                /> */}
                <Column
    header="Action"
    body={(rowData) => (
        <>
            <i
                className="bi bi-trash3-fill"
                id={rowData._id}
                onClick={deleteCategory}
                style={{ color: 'red', marginRight: '8px', cursor: 'pointer' }} // Red color for trash and right margin for spacing
            ></i>
            <Link to={`/categoryupdate/${rowData._id}`}>
                <i
                    className="bi bi-pencil-square"
                    style={{ color: 'blue', cursor: 'pointer' }} // Blue color for edit
                ></i>
            </Link>
        </>
    )}
/>

            </DataTable>
        </div>
    );
};
export const AddCategory = () => {
    const maincategory = useRef('');
    const category = useRef('');
    const subcategory = useRef('');
    const [image, setImage] = useState(null);
    const [errors, setErrors] = useState({});

    const resetValue = () => {
        maincategory.current.value = "";
        category.current.value = "";
        subcategory.current.value = "";
        setImage(null);
        setErrors({});
    };

    const validateForm = () => {
        const newErrors = {};

        if (!maincategory.current.value) {
            newErrors.mainCategory = "Main category is required";
        }
        if (!category.current.value.trim()) {
            newErrors.category = "Category is required";
        }
        if (!subcategory.current.value.trim()) {
            newErrors.subCategory = "Sub category is required";
        }
        if (!image) {
            newErrors.image = "Image is required";
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const saveCategory = (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const categoryData = new FormData();
        categoryData.append("mainCategory", maincategory.current.value);
        categoryData.append("category", category.current.value);
        categoryData.append("subCategory", subcategory.current.value);
        categoryData.append("image", image);

        httpRequest('post', 'api/category/add', categoryData)
            .then((data) => {
                toast.success(data.message, {
                    position: 'top-right',
                    autoClose: 2000,
                    onClose: () => resetValue()
                });
            })
            .catch((error) => console.log(error));
    };

    return (
        <div className="content-div">
            <ToastContainer />
            <div className="card-header">
                <div className="card-heading">Add Category</div>
            </div>
            <div className="table-container">
                <form onSubmit={saveCategory}>
                    <div className="row" style={{ padding: "37px" }}>
                        <div className="col">
                            <label htmlFor="maincat">Main Category</label>
                            <select className="form-select" id="maincat" ref={maincategory} aria-label="Default select example">
                                <option value="">--Select--</option>
                                <option value="Pet">Pet</option>
                                <option value="Food">Food</option>
                                <option value="Accessorys">Accessorys</option>
                                <option value="Medicine">Medicine</option>
                            </select>
                            {errors.mainCategory && <small style={{ color: "red" }}>{errors.mainCategory}</small>}
                        </div>
                        <div className="col">
                            <label htmlFor="category">Category</label>
                            <input type="text" id="category" ref={category} className="form-control" />
                            {errors.category && <small style={{ color: "red" }}>{errors.category}</small>}
                        </div>
                    </div>
                    <div className="row" style={{ padding: "16px 37px" }}>
                        <div className="col">
                            <label htmlFor="sub_cat">Sub category</label>
                            <input type="text" ref={subcategory} className="form-control" id="sub_cat" />
                            {errors.subCategory && <small style={{ color: "red" }}>{errors.subCategory}</small>}
                        </div>
                        <div className="col">
                            <label htmlFor="image">Image</label>
                            <input type="file" onChange={(e) => setImage(e.target.files[0])} className="form-control" id="image" />
                            {errors.image && <small style={{ color: "red" }}>{errors.image}</small>}
                        </div>
                    </div>
                    <div className="row" style={{ padding: "16px 37px" }}>
                        <button type="submit" className="btn btn-primary">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

