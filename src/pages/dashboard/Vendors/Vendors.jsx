import DataTable from 'react-data-table-component';
import './Vendors.scss';
import {Link, useNavigate} from "react-router-dom";
import {useCallback, useEffect, useState} from "react";
import {deleteVendorUser} from "../../../Redux/Reducers/profileSlice.js";
import {useDispatch} from "react-redux";
import {getListOfVendors} from "../../../Redux/Reducers/categorySlice.js";
import useCategorySelector from "../../../Redux/Selectors/useCategorySelector.js";
import {convertUtcToLocalTime} from "../../../Redux/Utils/helper.js";
import ConfirmationModal from "../../../components/dashboard/Popup/ConfirmationModal.jsx";
import Loader from "../../../components/Loader.jsx";
import {useFormik} from "formik";
import * as Yup from "yup";


  const customStyles = {
    table: {
      style :{
        height: '55vh',
        overflowY : 'auto',
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
        justifyContent:'center',
      },
    },
    cells: {
      style: {
        paddingLeft: '8px', // override the cell padding for data cells
        paddingRight: '8px',
        fontSize: '16px',
        color:'#023866',
        fontWeight: 500,
        justifyContent:'center',
      },
    },
  };


export default function Vendors() {
  const {vendorItem} = useCategorySelector();
  const {vendors, isLoading} = vendorItem;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [load, setLoad] = useState(false);

  // State to manage modal visibility and the blog to delete
  const [showModal, setShowModal] = useState(false);
  const [blogToDelete, setBlogToDelete] = useState(false);

  const queryParams = new URLSearchParams(location.search);
  const initialZipCode = queryParams.get('zipCode') || "";
  const [zipCode, setZipCode] = useState(initialZipCode);

  const columns = [
    {
      name: 'Company Name',
      selector: row => row.name,
      sortable: true,
    },
    {
      name: 'Email Address',
      selector: row => row.vendorEmail,
      sortable: true, // Enable sorting
    },
    {
      name: 'Date Created',
      selector: row => convertUtcToLocalTime(row.createdOn),
      sortable: true, // Enable sorting
    },
    {
      name: 'ZIP Code',
      selector: row => row.zipCode,
    },
    {
      name: 'Type',
      selector: row => row.categoryName,
      sortable: true,
    },
    {
      name: 'Action',
      cell: (row) => (
          <>
            <Link className="btn" title='Edit' to={`edit/${row.id}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#023866" className="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
              </svg>
            </Link>
            <button className="btn" title='Delete' onClick={() => handleDelete(row.vendorId)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                <g clipPath="url(#clip0_358_427)">
                  <path d="M13.6897 17.7599H4.06973C3.05001 17.7599 2.21973 16.9297 2.21973 15.9099V5.54993C2.21973 5.34569 2.38549 5.17993 2.58973 5.17993C2.79397 5.17993 2.95973 5.34569 2.95973 5.54993V15.9099C2.95973 16.5219 3.45775 17.0199 4.06973 17.0199H13.6897C14.3017 17.0199 14.7997 16.5219 14.7997 15.9099V5.54993C14.7997 5.34569 14.9655 5.17993 15.1697 5.17993C15.374 5.17993 15.5397 5.34569 15.5397 5.54993V15.9099C15.5397 16.9297 14.7094 17.7599 13.6897 17.7599Z" fill="#274C66"/>
                  <path d="M16.6502 5.91997H1.11023C0.905994 5.91997 0.740234 5.75421 0.740234 5.54997V4.06997C0.740234 3.05025 1.57051 2.21997 2.59023 2.21997H15.1702C16.19 2.21997 17.0202 3.05025 17.0202 4.06997V5.54997C17.0202 5.75421 16.8545 5.91997 16.6502 5.91997ZM1.48023 5.17997H16.2802V4.06997C16.2802 3.45799 15.7822 2.95997 15.1702 2.95997H2.59023C1.97825 2.95997 1.48023 3.45799 1.48023 4.06997V5.17997Z" fill="#274C66"/>
                  <path d="M12.2097 2.96C12.0054 2.96 11.8397 2.79424 11.8397 2.59V1.11C11.8397 0.90576 11.6739 0.74 11.4697 0.74H6.28969C6.08545 0.74 5.91969 0.90576 5.91969 1.11V2.59C5.91969 2.79424 5.75393 2.96 5.54969 2.96C5.34545 2.96 5.17969 2.79424 5.17969 2.59V1.11C5.17969 0.49802 5.67771 0 6.28969 0H11.4697C12.0817 0 12.5797 0.49802 12.5797 1.11V2.59C12.5797 2.79424 12.4139 2.96 12.2097 2.96Z" fill="#274C66"/>
                  <path d="M8.87977 14.7999C8.67553 14.7999 8.50977 14.6341 8.50977 14.4299V8.50989C8.50977 8.30565 8.67553 8.13989 8.87977 8.13989C9.08401 8.13989 9.24977 8.30565 9.24977 8.50989V14.4299C9.24977 14.6341 9.08401 14.7999 8.87977 14.7999Z" fill="#274C66"/>
                  <path d="M5.54969 14.7999C5.34545 14.7999 5.17969 14.6341 5.17969 14.4299V8.50989C5.17969 8.30565 5.34545 8.13989 5.54969 8.13989C5.75393 8.13989 5.91969 8.30565 5.91969 8.50989V14.4299C5.91969 14.6341 5.75393 14.7999 5.54969 14.7999Z" fill="#274C66"/>
                  <path d="M12.2098 14.7999C12.0056 14.7999 11.8398 14.6341 11.8398 14.4299V8.50989C11.8398 8.30565 12.0056 8.13989 12.2098 8.13989C12.4141 8.13989 12.5798 8.30565 12.5798 8.50989V14.4299C12.5798 14.6341 12.4141 14.7999 12.2098 14.7999Z" fill="#274C66"/>
                </g>
                <defs>
                  <clipPath id="clip0_358_427">
                    <rect width="18" height="18" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </button>
          </>
      ),
    },
  ];

  // Function to handle blog deletion
  const handleDelete = async (id) => {
    await setId(id);
    await setShowModal(true);
  };

  // Handle modal confirm action
  const handleConfirm = async () => {
    await setBlogToDelete(true);
    await setShowModal(false); // Close modal first before executing state change
  };
  useEffect(()=> {
    const requestData = {
      pageSize: 1000,
      pageNumber: 1,
      ...(zipCode.length === 5 ? { zipCode } : {})
    };
    console.log(vendorItem);
    try {
      dispatch(getListOfVendors(requestData));
      if (!isLoading) {
        console.log(vendorItem);
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch]);
  // Effect to handle the deletion after confirmation
  useEffect(() => {
    if (blogToDelete) {
      const requestData = { id };
      dispatch(deleteVendorUser(requestData))
          .then(async ()=>{
            await setBlogToDelete(false); // Reset the flag after deletion
            await setShowModal(false);
            dispatch(getListOfVendors({ pageSize: 50, pageNumber: 1 }));
          })
    }
  }, [blogToDelete, id, dispatch]);


  const zipCodeDisplay = useCallback(() =>{
    const zipcodeForm = document.getElementById("zipcodeForm");
    zipcodeForm.classList.add("show");
    setLoad(true);
  }, []);

  const zipCodeForm = useFormik({
    initialValues: {
      zipCode: '',
    },
    validationSchema : Yup.object({
      zipCode: Yup.number().max(5, "Enter A Valid ZIP Code").required('Please Enter zip code'),
    }),
    onSubmit: async (values) => {
    }
  });

  const returnToVendor = () => {
    return () => {
      console.log("done");
      // navigate("/dashboard/vendors")
      // window.location.reload();
      setZipCode('');
      navigate("/dashboard/vendors");
      dispatch(getListOfVendors({ pageSize: 50, pageNumber: 1 }));
    }
  }


  return (
    <>
      <div className="vendorsPage">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-6">
              <h2>Vendors</h2>
            </div>
            <div className="col-lg-6">
              <div className="d-flex">
                <form id={"zipcodeForm"}>
                  <div className={"form-group d-flex"}>
                    <input className={"form-control"} type="number" name="zipCode" placeholder={"Enter Zip Code"} onChange={zipCodeForm.handleChange} value={zipCodeForm.values.zipCode}/>
                    <button className={"btn"} type={"submit"}>Search</button>
                  </div>
                  {zipCodeForm.touched.zipCode && zipCodeForm.errors.zipCode ? (
                      <div className="error">{zipCodeForm.errors.zipCode}</div>
                  ) : null}
                </form>
                {zipCode && zipCode.length === 5 ? <div className={"pill"}><h6>{zipCode}</h6> <button onClick={returnToVendor()} className={"btn cancelBtn"}><i
                    className="bi bi-x"></i></button></div> : null}
                <Link to={"new"} type="button" className='btn'>Add Vendor</Link>
                <div className="dropdown">
                  <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
                    Filter
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <path d="M12.75 3.75C12.75 3.30499 12.882 2.86998 13.1292 2.49997C13.3764 2.12996 13.7278 1.84157 14.139 1.67127C14.5501 1.50097 15.0025 1.45642 15.439 1.54323C15.8754 1.63005 16.2763 1.84434 16.591 2.15901C16.9057 2.47368 17.1199 2.87459 17.2068 3.31105C17.2936 3.74751 17.249 4.19991 17.0787 4.61104C16.9084 5.02217 16.62 5.37357 16.25 5.62081C15.88 5.86804 15.445 6 15 6C14.4033 6 13.831 5.76295 13.409 5.34099C12.9871 4.91903 12.75 4.34674 12.75 3.75ZM1.5 4.5H10.5C10.6989 4.5 10.8897 4.42098 11.0303 4.28033C11.171 4.13968 11.25 3.94891 11.25 3.75C11.25 3.55109 11.171 3.36032 11.0303 3.21967C10.8897 3.07902 10.6989 3 10.5 3H1.5C1.30109 3 1.11032 3.07902 0.96967 3.21967C0.829018 3.36032 0.75 3.55109 0.75 3.75C0.75 3.94891 0.829018 4.13968 0.96967 4.28033C1.11032 4.42098 1.30109 4.5 1.5 4.5ZM6 6.75C5.53579 6.75131 5.08335 6.89616 4.7047 7.16471C4.32605 7.43325 4.03973 7.81234 3.885 8.25H1.5C1.30109 8.25 1.11032 8.32902 0.96967 8.46967C0.829018 8.61032 0.75 8.80109 0.75 9C0.75 9.19891 0.829018 9.38968 0.96967 9.53033C1.11032 9.67098 1.30109 9.75 1.5 9.75H3.885C4.02259 10.1392 4.26458 10.483 4.58448 10.7438C4.90439 11.0046 5.28988 11.1725 5.69877 11.2289C6.10766 11.2853 6.52419 11.2281 6.90278 11.0637C7.28137 10.8992 7.60742 10.6338 7.84526 10.2964C8.08309 9.95909 8.22355 9.56281 8.25125 9.15098C8.27894 8.73914 8.19282 8.32762 8.0023 7.96146C7.81178 7.59529 7.5242 7.28859 7.17105 7.07492C6.81789 6.86125 6.41276 6.74884 6 6.75ZM16.5 8.25H10.5C10.3011 8.25 10.1103 8.32902 9.96967 8.46967C9.82902 8.61032 9.75 8.80109 9.75 9C9.75 9.19891 9.82902 9.38968 9.96967 9.53033C10.1103 9.67098 10.3011 9.75 10.5 9.75H16.5C16.6989 9.75 16.8897 9.67098 17.0303 9.53033C17.171 9.38968 17.25 9.19891 17.25 9C17.25 8.80109 17.171 8.61032 17.0303 8.46967C16.8897 8.32902 16.6989 8.25 16.5 8.25ZM7.5 13.5H1.5C1.30109 13.5 1.11032 13.579 0.96967 13.7197C0.829018 13.8603 0.75 14.0511 0.75 14.25C0.75 14.4489 0.829018 14.6397 0.96967 14.7803C1.11032 14.921 1.30109 15 1.5 15H7.5C7.69891 15 7.88968 14.921 8.03033 14.7803C8.17098 14.6397 8.25 14.4489 8.25 14.25C8.25 14.0511 8.17098 13.8603 8.03033 13.7197C7.88968 13.579 7.69891 13.5 7.5 13.5ZM16.5 13.5H14.115C13.9381 12.9996 13.5899 12.5778 13.1321 12.3093C12.6743 12.0407 12.1363 11.9427 11.6132 12.0324C11.0901 12.1222 10.6155 12.394 10.2734 12.7998C9.93131 13.2056 9.74368 13.7192 9.74368 14.25C9.74368 14.7808 9.93131 15.2944 10.2734 15.7002C10.6155 16.106 11.0901 16.3778 11.6132 16.4676C12.1363 16.5574 12.6743 16.4593 13.1321 16.1907C13.5899 15.9222 13.9381 15.5004 14.115 15H16.5C16.6989 15 16.8897 14.921 17.0303 14.7803C17.171 14.6397 17.25 14.4489 17.25 14.25C17.25 14.0511 17.171 13.8603 17.0303 13.7197C16.8897 13.579 16.6989 13.5 16.5 13.5Z" fill="#023866"/>
                    </svg>
                  </button>
                  <ul className="dropdown-menu">
                    <li><button className="dropdown-item" onClick={zipCodeDisplay}>Sort By ZIP Code</button></li>
                    {/*<li><a className="dropdown-item" href="#">Sort By Alphabets</a></li>*/}
                    {/*<li><a className="dropdown-item" href="#">Sort By members type</a></li>*/}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="listingArea">
            {isLoading ? <Loader /> : (
                <DataTable
                    columns={columns}
                    data={vendors}
                    customStyles={customStyles}
                    pagination={true}
                />
            )}
            {showModal && (
                <ConfirmationModal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    onConfirm={handleConfirm}
                />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
