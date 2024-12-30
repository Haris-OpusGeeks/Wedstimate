import './vendoredit.scss';
import defaultImg from '../../../assets/default.jpg'
import {Link, useNavigate, useParams} from 'react-router-dom';
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {getVendorDetails} from "../../../Redux/Reducers/categorySlice.js";
import useCategorySelector from "../../../Redux/Selectors/useCategorySelector.js";
import {base_url} from "../../../Redux/Utils/helper.js";
import {getListOfAllTimeLeads, getListOfNewLeads} from "../../../Redux/Reducers/leadsSlice.js";
import useleadsSelector from "../../../Redux/Selectors/useleadsSelector.js";
import Loader from "../../../components/Loader.jsx";
import {extendFreeTrial} from "../../../Redux/Reducers/paymentSlice.js";
import {useFormik} from "formik";
import * as Yup from 'yup';
import DynamicToast from "../../../components/DynamicToast.jsx";

export default function VendorEdit() {
    const {id} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {detailsItem:{details, isLoading}} = useCategorySelector();
    const {allTimeLeadsItem, newLeadsItem} = useleadsSelector();
    const trialForm = document.querySelector(".trialForm");
    const user = JSON.parse(localStorage.getItem('user'));
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState('');

    const handleShowToast = (message) => {
        setMessage(message);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 5000); // Hide toast after 5 seconds
    };


    useEffect(()=>{
        dispatch(getVendorDetails(id));
        console.log("details", details);
    }, [dispatch]);

    useEffect(() => {
        console.log("details", details);
        if (details) {
            console.log("working")
            const requestData = {
                vendorId : details.vendorId,
            }
            console.log("requestData", requestData);
            dispatch(getListOfNewLeads(requestData));
            dispatch(getListOfAllTimeLeads(requestData));
            console.log(newLeadsItem.leads);
            console.log(allTimeLeadsItem.leads);
        }
    }, [details, dispatch]);

    const emailNavigation = () => {
        return async () => {
            await localStorage.setItem("email", details.email);
            navigate("/dashboard/send-email");
        }
    }

    const showTrialForm = () => {
        trialForm.classList.toggle("show");
    }

    const formik = useFormik({
        initialValues: {
            vendorId: details ? details.vendorId : '',
            expiresDate: '',
        },
        validationSchema: Yup.object({
            vendorId: Yup.string().required('Vendor ID is required'),
            expiresDate: Yup.date().required('Expiration date is required').nullable(),
        }),
        onSubmit: (values) => {
            const requestData = {
                vendorId: values.vendorId,
                expiresDate: values.expiresDate,
            };

            dispatch(extendFreeTrial(requestData))
                .then(() => {
                    // Handle success, e.g., show a success message or redirect
                    handleShowToast('Trial extended successfully!');
                    formik.resetForm();
                })
                .catch((error) => {
                    // Handle error, e.g., show an error message
                    handleShowToast('Failed to extend trial: ' + error.message);
                });
        },
    });
  return (
    <>
        <DynamicToast show={showToast} message={message} />
        <div className="vendorProfile">
            <div className="container-fluid">
                <h2>Vendor Profile</h2>
                <div className="profileBox">
                    <div className="row">
                        <div className="col-lg-3">
                            <img src={details && details.imageUrls[0] ? `${base_url}/${details.imageUrls[0]}` : defaultImg} alt="" />
                            <h5>{details ? details.name : 'default Vendor'}</h5>
                        </div>
                        <div className="col-lg-9">
                            <div className="row numbers">
                                <div className="col-lg-5">
                                    <h2>{newLeadsItem ? newLeadsItem.leads.length : <Loader/>}</h2>
                                    <h6>Number of leads this month</h6>
                                </div>
                                <div className="col-lg-5">
                                    <h2>{allTimeLeadsItem ? allTimeLeadsItem.leads.length : <Loader/>}</h2>
                                    <h6>Number of all time leads</h6>
                                </div>
                            </div>
                            <Link to={`/dashboard/vendors/edit/reviews/${id}`} className='btn editBtn'>
                                <div className="d-flex">
                                    <h4>Reviews edit</h4>
                                    <i className="bi bi-pencil-square"></i>
                                </div>
                            </Link>
                            <div className="row">
                                <div className="col-lg-5">
                                    <Link to={`/dashboard/vendors/${id}/leads`} className='btn'>Add Leads</Link>
                                </div>
                                <div className="col-lg-5">
                                    <button onClick={emailNavigation()} className='btn'>Live Email</button>
                                </div>
                            </div>
                            <div className={"d-flex extendTrial"}>
                                <form className={"trialForm"} onSubmit={formik.handleSubmit}>
                                    <input
                                        className={"form-control"}
                                        type="date"
                                        name="expiresDate"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.expiresDate}
                                    />
                                    {formik.errors.expiresDate && formik.touched.expiresDate && (
                                        <div className="error">{formik.errors.expiresDate}</div>
                                    )}
                                    <button type={"submit"} className={"btn"}>Extend Trial</button>
                                    <button type={"button"} className={"btn close"} onClick={() => showTrialForm()}>
                                        <i className="bi bi-x-circle"></i>
                                    </button>
                                    <button type={"button"} className={"btn trigger"}
                                            onClick={() => showTrialForm()}>Extend Trial
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
