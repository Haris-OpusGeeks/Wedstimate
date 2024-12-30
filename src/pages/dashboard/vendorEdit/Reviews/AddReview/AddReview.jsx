import React, {useEffect, useState} from 'react';
import './AddReview.scss';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { adminAddReview } from '../../../../../Redux/Reducers/chatSlice.js';
import {getCouples} from "../../../../../Redux/Reducers/profileSlice.js";
import useProfileSelector from "../../../../../Redux/Selectors/useProfileSelector.js";
import {useNavigate, useParams} from "react-router-dom";
import {noAuthGetVendorDetails} from "../../../../../Redux/Reducers/categorySlice.js";
import useCategorySelector from "../../../../../Redux/Selectors/useCategorySelector.js";
import Rating from 'react-rating';
import DynamicToast from "../../../../../components/DynamicToast.jsx";

function AddReview() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {couples:{coupleList}} = useProfileSelector();
    const {detailsItem:{details}} = useCategorySelector();
    const [vendorIdValue, setVendorId] = useState(null);
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleShowToast = (message) => {
        setMessage(message);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 5000); // Hide toast after 5 seconds
    };

    useEffect(()=>{
        const vendorId = JSON.parse(localStorage.getItem('vendor')).vendorId;
        console.log(coupleList);

        // setVendorId(vendor.vendorId);
        // console.log(vendor);
        try{
            const requestData = {
                vendorId:vendorId
            }
            dispatch(getCouples(requestData))
                .then(()=>{
                    console.log(coupleList);
                })
        } catch (e) {
            console.log(e);
        }
    }, [dispatch]);


    const formik = useFormik({
        initialValues: {
            review: '',
            rating: 0,
            coupleId: '',
            eventDetailId: ''
        },
        validationSchema: Yup.object({
            review: Yup.string()
                .required('Review is required')
                .min(10, 'Review should be at least 10 characters'),
            rating: Yup.number()
                .required('Rating is required')
                .min(1, 'Rating should be at least 1')
                .max(5, 'Rating should not exceed 5'),
            coupleId: Yup.string()
                .required('Couple ID is required'),
            eventDetailId: Yup.string()
                .required('Event Detail ID is required')
        }),
        onSubmit: (values) => {
            const requestData = {
                review: values.review,
                rating: values.rating,
                coupleId: values.coupleId,
                eventDetailId: values.eventDetailId,
            }
            // Dispatch the form data to the redux action
            dispatch(adminAddReview({requestData}))
                .then(()=>{
                    handleShowToast('Review Added');
                    formik.resetForm();
                    localStorage.removeItem('vendor');
                    navigate(`/dashboard/vendors/edit/reviews/${id}`);
                })
                .catch((error)=>{
                    handleShowToast(error);
                })
        }
    });

    return (
        <div className="addReviewPage">
            <DynamicToast show={showToast} message={message} />
            <div className="container-fluid">
                <div className="row">
                    <h2>Add Review</h2>
                    {coupleList && coupleList.length === 0 ? <h3 className={"text-danger"}>No couple is added to this vendor</h3> : null}
                    <form onSubmit={formik.handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="review">Review</label>
                            <textarea
                                id="review"
                                name="review"
                                className="form-control"
                                value={formik.values.review}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.review && formik.touched.review && (
                                <div className="error">{formik.errors.review}</div>
                            )}
                        </div>

                        <div className="form-group">
                            <label>Rating</label>
                            <Rating
                                emptySymbol={<i className="bi bi-star"></i>}
                                fullSymbol={<i className="bi bi-star-fill"></i>}
                                initialRating={formik.values.rating}
                                onChange={(value) => formik.setFieldValue('rating', value)}
                            />
                            {formik.errors.rating && formik.touched.rating && (
                                <div className="error">{formik.errors.rating}</div>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="coupleId">Select Couple</label>
                            <select
                                id="coupleId"
                                name="coupleId"
                                className="form-control"
                                value={formik.values.coupleId}
                                onChange={(e) => {
                                    const selectedCoupleId = e.target.value;
                                    formik.setFieldValue('coupleId', selectedCoupleId);
                                    const selectedCouple = coupleList.find(couple => couple.id === selectedCoupleId);
                                    formik.setFieldValue('eventDetailId', selectedCouple?.eventDetails[0]?.id || '');
                                }}
                                onBlur={formik.handleBlur}
                            >
                                <option value="" label="Select a couple"/>
                                {coupleList.map((couple) => (
                                    <option key={couple.id} value={couple.id}>
                                        {couple.fullName}
                                    </option>
                                ))}
                            </select>
                            {formik.errors.coupleId && formik.touched.coupleId && (
                                <div className="error">{formik.errors.coupleId}</div>
                            )}
                        </div>

                        <div className="form-group d-none">
                            <label htmlFor="eventDetailId">Event Detail ID</label>
                            <input
                                type="text"
                                id="eventDetailId"
                                name="eventDetailId"
                                className="form-control"
                                value={formik.values.eventDetailId}
                                readOnly
                            />
                            {formik.errors.eventDetailId && formik.touched.eventDetailId && (
                                <div className="error">{formik.errors.eventDetailId}</div>
                            )}
                        </div>

                        <button type="submit" className="btn btn-primary">Submit Review</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddReview;
