import DataTable from 'react-data-table-component';
import './blog.scss';
import {Link, useNavigate} from 'react-router-dom';
import {useEffect, useState} from "react";
import {getListOfBlogs, deleteBlog} from "../../../Redux/Reducers/blogSlice.js";
import {useDispatch} from "react-redux";
import useBlogSelector from "../../../Redux/Selectors/useBlogSelector.js";
import ConfirmationModal from "../../../components/dashboard/Popup/ConfirmationModal.jsx";
import Loader from "../../../components/Loader.jsx";


export default function BlogDashboard() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {blogs} =useBlogSelector();
    const [id, setId] = useState("");

    // State to manage modal visibility and the blog to delete
    const [showModal, setShowModal] = useState(false);
    const [blogToDelete, setBlogToDelete] = useState(false);

    // Function to handle blog deletion
    const handleDelete = (id) => {
        setId(id);
        setShowModal(true);
    };

    // Handle modal confirm action
    const handleConfirm = () => {
        setBlogToDelete(true);
        setShowModal(false); // Close modal first before executing state change
    };

    const onBlogEdit =  (blog) => {
        return async () => {
            if (localStorage.getItem('singleBlog')) {
                await localStorage.removeItem('singleBlogEdit');
                await localStorage.setItem('singleBlogEdit', JSON.stringify(blog));
                navigate(`/dashboard/blog/edit/${blog.id}`);
            } else {
                await localStorage.setItem('singleBlogEdit', JSON.stringify(blog));
                navigate(`/dashboard/blog/edit/${blog.id}`);
            }
        }
    }

    // Effect to handle the deletion after confirmation
    useEffect(() => {
        if (blogToDelete) {
            const requestData = { id };
            dispatch(deleteBlog(requestData))
                .then(async ()=>{
                    await setBlogToDelete(false); // Reset the flag after deletion
                    await setShowModal(false);
                    window.location.reload();
                })
        }
    }, [blogToDelete, id, dispatch]);
    useEffect(() => {
        dispatch(getListOfBlogs());
        console.log(blogs);
    }, []);
    const columns = [
        {
            name: 'Sr No',
            selector: (row, index) => index + 1, // Dynamically generate the serial number
            width: "100px",
        },
        {
            name: 'Blog Title',
            selector: row => row.title, // Access the blog title from the API response
            width: "55vw",
        },
        {
            name: 'Action',
            cell: (row) => (
                <>
                    <Link className="btn" onClick={onBlogEdit(row)} title='Edit'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#023866" className="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                        </svg>
                    </Link>
                    <button className="btn" title='Delete' onClick={() => handleDelete(row.id)}>
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
    const customStyles = {
        table: {
            style :{
                height: '60vh',
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
    return (
        <>
            <div className="blogPageDashboard">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-8">
                            <h2>Blogs</h2>
                        </div>
                        <div className="col-lg-4">
                            <div className="d-flex">
                                <Link className='btn' to={'new'}>Add Blog</Link>
                            </div>
                        </div>
                    </div>
                    <div className="listingArea">
                        <DataTable
                            columns={columns}
                            data={blogs}
                            customStyles={customStyles}
                            fixedHeader
                            noDataComponent={<Loader/>}
                        />
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