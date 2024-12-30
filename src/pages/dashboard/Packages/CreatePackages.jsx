import './Packages.scss';
import { createPackage } from "../../../Redux/Reducers/packageSlice.js";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import {getCategoryList, getListOfVendors} from "../../../Redux/Reducers/categorySlice.js";
import useCategorySelector from "../../../Redux/Selectors/useCategorySelector.js";
import { useFormik } from "formik";
import * as Yup from "yup";
import {Link, useNavigate} from "react-router-dom";
import DynamicToast from "../../../components/DynamicToast.jsx";
import {base_url} from "../../../Redux/Utils/helper.js";
import Loader from "../../../components/Loader.jsx";
import DataTable from "react-data-table-component";

function CreatePackages() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { vendorItem:{isLoading, vendors}, categoryItem:{categories} } = useCategorySelector();

    const [vendorList, setVendorList] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredVendors, setFilteredVendors] = useState([]);
    const [selectedVendors, setSelectedVendors] = useState([]);

    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);


    useEffect(() => {
        dispatch(getListOfVendors());
        setVendorList(vendors);
    }, [dispatch]);

    const handleShowToast = (message) => {
        setMessage(message);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 5000); // Hide toast after 5 seconds
    };

    const columns = [
        {
            name: 'Vendor',
            selector: row => row.name,  // The name of the package
            width: "35%",
            justifyContent: "flex-start",
            sortable: true,
        },
        {
            name: 'Price',
            selector: row => `$${row.price}`,  // Description of the package
            width: "20%",
            justifyContent: "flex-start",
            sortable: true,
        },
        {
            name: 'ZIP',
            selector: row => row.zipCode,
            sortable: true,
        },
        {
            name: 'Action',
            cell: (row) => (
                <>
                    <button className="btn" title='Add' onClick={() => handleVendorSelect(row)}>
                        <i className="bi bi-plus-lg"></i>
                    </button>
                </>
            ),
        },
    ];

    const customStyles = {
        table: {
            style :{
                height: '40vh',
                overflowY : 'scroll',
            },
        },
        rows: {
            style: {
                minHeight: '60px', // override the row height
                borderBottom: 'none !important',
            },
        },
        headRow: {
            style: {
                borderBottom: '1px solid #0238669E',
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                fontSize: '18px',
                color:'#023866',
                fontWeight: 700,
                // justifyContent:'center',
            },
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
                fontSize: '16px',
                color:'#023866',
                fontWeight: 500,
                // justifyContent:'center',
            },
        },
    };

    useEffect(() => {
        if (selectedCategory) {
            const requestData = { categoryId: selectedCategory };
            dispatch(getListOfVendors(requestData)) // Dispatch the action to fetch vendors
                .unwrap() // Ensure the result can be processed after dispatch
                .then(fetchedVendors => {
                    console.log("Fetched Vendors: ", fetchedVendors);
                    setVendorList(fetchedVendors); // Set the filtered vendors for the selected category
                    console.log(vendorList);
                })
                .catch(err => {
                    console.error("Error fetching vendors: ", err);
                    setVendorList([]); // Clear the list if there's an error
                });
        }
    }, [dispatch, selectedCategory]);


    useEffect(() => {
        dispatch(getCategoryList());
        if (vendors) {
            setVendorList(vendors);
        }
    }, [vendors]);

    useEffect(() => {
        if (searchTerm) {
            setFilteredVendors(
                vendorList.filter(vendor =>
                    vendor.name.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        } else {
            setFilteredVendors([]);
        }
    }, [searchTerm, vendorList]);

    const handleVendorSelect = (vendor) => {
        setSelectedVendors([...selectedVendors, vendor]);
        setSearchTerm('');
        console.log(selectedVendors);
    };

    const handleVendorRemove = (vendorId) => {
        setSelectedVendors(selectedVendors.filter(v => v.id !== vendorId));
    };

    const selection = (id) => {
        setSelectedCategory(id);
        console.log(id); // Log the id instead of selectedCategory which will not be updated immediately
    };

    const createPackageForm = useFormik({
        initialValues: {
            name: "",
            description: "",
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .max(255, "Must be less than 255 characters")
                .required("Required"),
            description: Yup.string()
                .max(2000, "Must be less than 2000 characters")
                .required("Required"),
        }),
        onSubmit: (values) => {
            const packageData = {
                name : values.name,
                description : values.description,
                preferences: selectedVendors.map(vendor => ({ vendorPreferenceId: vendor.id, price: vendor.price })),  // Include both ID and price
            };

            // Dispatch the createPackage action
            // dispatch(createPackage(packageData));
            dispatch(createPackage(packageData))
                .unwrap()
                .then(() => {
                    // Clear the form and image preview after successful submission
                    createPackageForm.resetForm(); // Reset form fields
                    setSelectedVendors([]);
                    setSearchTerm('');
                    handleShowToast("Package Has Been Created");
                })
                .catch((error) => {
                    console.error("Failed to create package:", error);
                    handleShowToast("Failed to create package");
                });
        },
    });

    return (
        <div className="innerPackage">
            <DynamicToast show={showToast} message={message} />
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-8">
                        <h2>Add New Package</h2>
                    </div>
                </div>
                <div className="packageContext">
                    <div className="row">
                        <div className={"col-lg-3"}>
                            <div className={"row flex-wrap"}>
                                {categories ? categories.map((category, index) => (
                                    <div key={index} className={`col-lg-4 col-sm-6 ${selectedCategory === category.id ? 'selected' : ''}`} onClick={() => selection(category.id)}>
                                        <div className="imageBox">
                                            <img src={`${base_url}/${category.imageUrl}`} alt="" />
                                        </div>
                                        <div className="textBox">
                                            <h5>{category.name}</h5>
                                            {/*<p>{category.count} {category.name} in your zip</p>*/}
                                        </div>
                                    </div>
                                )):<Loader/>}
                            </div>
                        </div>
                        <div className={"col-lg-5"}>
                            <DataTable
                                columns={columns}
                                data={vendorList}
                                style={customStyles}
                                fixedHeader
                                noDataComponent={"No vendors found"}
                            />
                        </div>
                        <div className={"col-lg-4"}>
                            <form onSubmit={createPackageForm.handleSubmit}>
                                <div className="col-lg-12">
                                    <div className="mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="exampleFormControlInput1"
                                            placeholder="Enter Title"
                                            {...createPackageForm.getFieldProps('name')}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <textarea
                                            className="form-control"
                                            placeholder="Package Description"
                                            {...createPackageForm.getFieldProps('description')}
                                        />
                                    </div>
                                    {/*<div className="mb-3">*/}
                                    {/*    <input*/}
                                    {/*        type="text"*/}
                                    {/*        className="form-control"*/}
                                    {/*        placeholder="Select Vendor"*/}
                                    {/*        value={searchTerm}*/}
                                    {/*        onChange={handleSearchChange}*/}
                                    {/*        onFocus={() => setFilteredVendors(vendorList)}*/}
                                    {/*    />*/}
                                    {/*    {filteredVendors.length > 0 && (*/}
                                    {/*        <div className="vendorList">*/}
                                    {/*            {filteredVendors.map(vendor => (*/}
                                    {/*                <button*/}
                                    {/*                    type={"button"}*/}
                                    {/*                    key={vendor.id}*/}
                                    {/*                    className="btn"*/}
                                    {/*                    onClick={() => handleVendorSelect(vendor)}*/}
                                    {/*                >*/}
                                    {/*                    {vendor.name}*/}
                                    {/*                </button>*/}
                                    {/*            ))}*/}
                                    {/*        </div>*/}
                                    {/*    )}*/}
                                    {/*</div>*/}
                                    <div className="mb-3" id="selectedVendors">
                                        <div className="d-flex flex-wrap row-gap-3">
                                            {selectedVendors.map(vendor => (
                                                <div key={vendor.id} className="pill">
                                                    <h5>{`${vendor.name}`}</h5>
                                                    <h5>{`Price : $${vendor.price}`}</h5>
                                                    <button
                                                        className="btn"
                                                        onClick={() => handleVendorRemove(vendor.id)}
                                                    >
                                                        <i className="bi bi-x"></i>
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <button className="btn" type="submit">
                                        Save Package
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreatePackages;
