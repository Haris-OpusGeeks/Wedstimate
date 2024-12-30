import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { createDeal } from "../Redux/Reducers/dealSlice";
import DynamicToast from "../components/DynamicToast";
import { useCallback, useState } from "react";
import { dateformatter } from "../Redux/Utils/helper";

export default function CreateDeal() {
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();

    const handleShowToast = useCallback((message) => {
        setMessage(message);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 5000); // Hide toast after 5 seconds
    }, []);

    const formik = useFormik({
        initialValues: {
            name: "",
            price: "",
            image: null || "",
            expireDate: "",
            address: "",
            zipCode: "",
            description: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Required"),
            price: Yup.number(),
            image: Yup.mixed(),
            expireDate: Yup.date(),
            address: Yup.string().required("Required"),
            zipCode: Yup.number().required("Required"),
            description: Yup.string().required("Required"),
        }),
        onSubmit: async (values, { setSubmitting, setErrors }) => {
            const formData = new FormData();
            formData.append('Name', values?.name);
            formData.append('Description', values?.description);
            formData.append('Address', values?.address);
            formData.append('Price', values?.price);
            formData.append('ZipCode', values?.zipCode);
            formData.append('DateExpire', dateformatter.MM_DD_YYYY(values?.expireDate));
            if (values.image) formData.append('Images', values.image);
            
            for (const [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
              }
            dispatch(createDeal({
                formData,
                onDone: async () => {
                    setSubmitting(false);
                    handleShowToast("Deal is created");
                    // Additional success handling can be added here, e.g., navigation
                }
            })).unwrap().catch(error => {
                console.error('Error:', error);
                handleShowToast(error.message || "An error occurred");
                setSubmitting(false);
                // Set form errors if available
                if (error.errors) {
                    setErrors(error.errors);
                }
            });
        },
    });

    return (
        <>
            <div className="createDealpage">
                <DynamicToast show={showToast} message={message} />
                <div className="container-fluid">
                    <div className="blueBanner d-flex justify-content-between">
                        <div className="textBox">
                            <h2>Create Your Deal</h2>
                        </div>
                        <div className="buttonBox">
                            <button className="btn" onClick={formik.handleSubmit} disabled={formik.isSubmitting}>
                                {formik.isSubmitting ? "Submitting..." : "SUBMIT"}
                            </button>
                        </div>
                    </div>
                    <div className="createDeal">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    className="form-control"
                                    placeholder="Name"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.name}
                                />
                                {formik.touched.name && formik.errors.name ? (
                                    <div className="text-danger">{formik.errors.name}</div>
                                ) : null}
                                <input
                                    type="number"
                                    name="price"
                                    id="price"
                                    className="form-control"
                                    placeholder="Price"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.price}
                                />
                                {formik.touched.price && formik.errors.price ? (
                                    <div className="text-danger">{formik.errors.price}</div>
                                ) : null}
                            </div>
                            <div className="mb-3">
                                <input
                                    type="file"
                                    name="image"
                                    id="image"
                                    className="form-control"
                                    onChange={(event) => {
                                        formik.setFieldValue("image", event.currentTarget.files[0]);
                                    }}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.image && formik.errors.image ? (
                                    <div className="text-danger">{formik.errors.image}</div>
                                ) : null}
                                <input
                                    type="date"
                                    name="expireDate"
                                    id="expireDate"
                                    className="form-control"
                                    placeholder={"Expire Date"}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.expireDate}
                                />
                                {formik.touched.expireDate && formik.errors.expireDate ? (
                                    <div className="text-danger">{formik.errors.expireDate}</div>
                                ) : null}
                            </div>
                            <div className="mb-3">
                                <input
                                    type="text"
                                    name="address"
                                    id="address"
                                    className="form-control"
                                    placeholder="Address"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.address}
                                />
                                {formik.touched.address && formik.errors.address ? (
                                    <div className="text-danger">{formik.errors.address}</div>
                                ) : null}
                                <input
                                    type="number"
                                    name="zipCode"
                                    id="zipCode"
                                    className="form-control"
                                    placeholder="Zip Code"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.zipCode}
                                />
                                {formik.touched.zipCode && formik.errors.zipCode ? (
                                    <div className="text-danger">{formik.errors.zipCode}</div>
                                ) : null}
                            </div>
                            <div className="mb-3">
                                <textarea
                                    name="description"
                                    id="description"
                                    rows="10"
                                    className="form-control"
                                    placeholder="Description"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.description}
                                />
                                {formik.touched.description && formik.errors.description ? (
                                    <div className="text-danger">{formik.errors.description}</div>
                                ) : null}
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
