import DataTable from 'react-data-table-component';
import {useEffect, useState} from "react";
import {getCouples} from "../../../Redux/Reducers/profileSlice.js";
import {useDispatch} from "react-redux";
import useProfileSelector from "../../../Redux/Selectors/useProfileSelector.js";
import {convertUtcToLocalTime} from "../../../Redux/Utils/helper.js";
import './vendorLeads.scss';
import {Link, useParams} from "react-router-dom";
import {addVendorPreferencesInEvent} from "../../../Redux/Reducers/categorySlice.js";
import DynamicToast from "../../../components/DynamicToast.jsx";

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


export default function VendorLeads() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {couples:{coupleList}} = useProfileSelector();
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState('');

    const handleShowToast = (message) => {
        setMessage(message);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 5000); // Hide toast after 5 seconds
    };

    useEffect(() => {
        // const requestData = {
        //     vendorId : id
        // }
        dispatch(getCouples());
    }, [dispatch]);

    const columns = [
        {
            name: 'Lead Name',
            selector: row => row.fullName,
            sortable: true,
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Date Created',
            selector: row => convertUtcToLocalTime(row.createdOn),
            sortable: true,
        },
        {
            name: 'Wedding Date',
            selector: row => convertUtcToLocalTime(row.weddingDate),
            sortable: true,
        },
        {
            name: 'ZIP Code',
            selector: row => row.zipCode,
            sortable: true,
        },
        {
            name: 'Action',
            cell: (row) => (
                <>
                    <button className="btn" title='Delete' onClick={() => handleAdd(id, row.eventId, row.id, row.eventDetails )}>
                        Add Lead
                    </button>
                </>
            ),
        },
    ];


    const handleAdd = async (vendorId, eventId, coupleId, eventDetails) => {
        if (eventDetails) {
            const requestData = {
                vendorPreferenceId : vendorId,
                eventId : eventId,
                coupleId : coupleId
            }
            dispatch(addVendorPreferencesInEvent({requestData}))
                .then(()=>{
                    handleShowToast("vendor added to couple")
                })
                .catch((error) => {
                    console.error("Failed to create package:", error);
                    handleShowToast("Failed to add vendor");
                });
        } else {
            handleShowToast("event do not exist!");
        }
    }
    return (
        <>
            <DynamicToast show={showToast} message={message} />
            <div className="leadsPage">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-8">
                            <h2>Leads This Month</h2>
                        </div>
                        <div className="col-lg-4">
                            <div className="d-flex">
                                {/*<button type="button" className='btn'>Add Leads</button>*/}
                            </div>
                        </div>
                    </div>
                    <div className="listingArea">
                        <div className={"row"}>
                            <div className={"col-lg-12"}>
                                <DataTable
                                    columns={columns}
                                    data={coupleList}
                                    customStyles={customStyles}
                                    fixedHeader
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
