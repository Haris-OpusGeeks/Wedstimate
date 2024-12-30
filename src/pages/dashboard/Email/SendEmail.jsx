import {Link, useLocation} from "react-router-dom";
import {sendEmail} from "../../../Redux/Reducers/profileSlice.js";
import {useDispatch} from "react-redux";
import {useFormik} from "formik";
import * as Yup from "yup";
import dynamicToast from "../../../components/DynamicToast.jsx";
import DynamicToast from "../../../components/DynamicToast.jsx";
import {useState} from "react";

function SendEmail() {

    const dispatch = useDispatch();
    const email =  localStorage.getItem("email") || "";
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState("");

    // console.log(email);
    const handleShowToast = (message) => {
        setMessage(message);
        setShowToast(true);
        // Optionally hide the toast after a certain time
        setTimeout(() => {
            setShowToast(false);
        }, 5000); // Hide toast after 1 seconds
    };


    const formik = useFormik({
        initialValues: {
            subject:'',
            message_contact: ''
        },
        validationSchema: Yup.object({
            subject: Yup.string().required('First name is required'),
            message_contact: Yup.string().required('Message is required')
        }),
        onSubmit: async (values) => {
            console.log("clicked")
            const requestData = {
                body : values.message_contact,
                subject : values.subject,
                to : email,
            }
            try {
                await dispatch(sendEmail(requestData))
                    .then(()=>{
                        console.log("done");
                        handleShowToast("Email Sent");
                        values.subject = "";
                        values.message_contact = "";
                    })
                    .catch((error) => {
                        console.error("Failed to send Message:", error);
                    });
            } catch (error) {
                console.log(error);
            }
        }
    });
    return (
        <>
            <DynamicToast show={showToast} message={message} />
            <div className="blogPageDashboard">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-8">
                            <h2>Send Email</h2>
                            <p>{email ? `To : ${email}` : null}</p>
                        </div>
                        <div className="col-lg-4">
                        </div>
                    </div>
                    <div className="listingArea col-lg-5">
                        <form onSubmit={formik.handleSubmit} autoComplete="off">
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <label>Subject</label>
                                        <input
                                            className="form-control"
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            value={formik.values.subject}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.subject && formik.errors.subject ? (
                                            <div className="error">{formik.errors.subject}</div>
                                        ) : null}
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <textarea
                                    className="form-control"
                                    id="message_contact"
                                    name="message_contact"
                                    style={{height: '150px'}}
                                    value={formik.values.message_contact}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                ></textarea>
                                {formik.touched.message_contact && formik.errors.message_contact ? (
                                    <div className="error">{formik.errors.message_contact}</div>
                                ) : null}
                            </div>
                            <p className="add_top_30">
                                <input type="submit" className="btn_1 rounded" value="Submit"/>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SendEmail;