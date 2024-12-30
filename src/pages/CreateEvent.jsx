import React from 'react';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { createEvent } from '../Redux/Reducers/eventSlice';
import {useNavigate} from "react-router-dom";

function CreateEvent() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const couple = JSON.parse(localStorage.getItem('user'));

    // Validation schema for the form fields
    const validationSchema = Yup.object({
        name: Yup.string().required('Event name is required'),
        weddngZipCode: Yup.string()
            .required('Zip code is required')
            .matches(/^[0-9]{5}$/, 'Invalid zip code format'),
        weddingDate: Yup.date().required('Event date is required'),
        noOfGuest: Yup.number()
            .required('Number of guests is required')
            .min(1, 'Must have at least one guest')
    });

    // Initial form values
    const initialValues = {
        name: '',
        weddngZipCode: '',
        weddingDate: '',
        noOfGuest: 0,
        coupleId: couple.id // Assuming `coupleId` will be dynamically set
    };

    // Formik setup for form submission
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values, { setSubmitting, resetForm }) => {
            const requestData = values;
            dispatch(createEvent({
                requestData,
                onDone: (response) => {
                    alert('Event created successfully!');
                    resetForm();
                    setSubmitting(false);
                    navigate('/categories/couples/dashboard');
                }
            })).catch((error) => {
                alert('Error creating event');
                setSubmitting(false);
            });
        }
    });

    return (
        <div className="createEventPage">
            <div className="container-fluid">
                <div className={"row"}>
                    <div className="col-lg-6">
                        <div className={"content"}>
                            <h1>JOIN TODAY!</h1>
                            <h2> Let us help create your dream wedding!</h2>
                            <h3>Wedstimate.com is the new vendor directory where engaged couples go to find the best
                                wedding vendors in the industry!</h3>
                            <hr/>
                            <h4>Preference-Based Matching</h4>
                            <p>Wedstimate offers preference-based matching, actively connecting couples with vendors
                                that align with their specific preferences, style, and budget</p>
                            <hr/>
                            <h4>In-App Messaging</h4>
                            <p>Wedstimate offers in-app messaging. allowing seamless communication between you and your
                                vendors.</p>
                            <hr/>
                            <h4>Extensive Vendor Network</h4>
                            <p>Wedstimate boasts a vast network of hundreds of vendors in various areas. This helps us
                                find the ideal vendor for you</p>
                            <hr/>
                            <h4>Exclusive Deals</h4>
                            <p>Wedstimate provides exclusive deals and packages for couples, helping you get the best
                                value for your money.</p>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <h2>Create Event</h2>
                        <form onSubmit={formik.handleSubmit} className="eventForm">
                            <div className="form-group">
                                <label htmlFor="name">Event Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                    className={formik.touched.name && formik.errors.name ? 'input-error' : ''}
                                />
                                {formik.touched.name && formik.errors.name &&
                                    <div className="error">{formik.errors.name}</div>}
                            </div>

                            <div className="form-group">
                                <label htmlFor="weddngZipCode">Wedding Zip Code</label>
                                <input
                                    type="text"
                                    id="weddngZipCode"
                                    name="weddngZipCode"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.weddngZipCode}
                                    className={formik.touched.weddngZipCode && formik.errors.weddngZipCode ? 'input-error' : ''}
                                />
                                {formik.touched.weddngZipCode && formik.errors.weddngZipCode && (
                                    <div className="error">{formik.errors.weddngZipCode}</div>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="weddingDate">Wedding Date</label>
                                <input
                                    type="date"
                                    id="weddingDate"
                                    name="weddingDate"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.weddingDate}
                                    className={formik.touched.weddingDate && formik.errors.weddingDate ? 'input-error' : ''}
                                />
                                {formik.touched.weddingDate && formik.errors.weddingDate && (
                                    <div className="error">{formik.errors.weddingDate}</div>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="noOfGuest">Number of Guests</label>
                                <input
                                    type="number"
                                    id="noOfGuest"
                                    name="noOfGuest"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.noOfGuest}
                                    className={formik.touched.noOfGuest && formik.errors.noOfGuest ? 'input-error' : ''}
                                />
                                {formik.touched.noOfGuest && formik.errors.noOfGuest && (
                                    <div className="error">{formik.errors.noOfGuest}</div>
                                )}
                            </div>

                            <button type="submit" className="btn btn-primary" disabled={formik.isSubmitting}>
                                {formik.isSubmitting ? 'Creating Event...' : 'Create Event'}
                            </button>
                        </form>
                        <div></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CreateEvent;
