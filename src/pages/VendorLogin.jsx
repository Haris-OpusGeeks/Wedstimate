import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { loginUser, registerVendor, forgotPassword, resetPassword } from "../Redux/Reducers/authSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getUserProfile } from "../Redux/Reducers/profileSlice";
import googleplay from "../assets/website/googleplay.png";
import applestore from "../assets/website/applestore.png";
import useProfileSelector from "../Redux/Selectors/useProfileSelector.js";

export default function VendorLogin() {
    const dispatch = useDispatch();
    const [isRegistered, setRegistered] = useState(true);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const { user, isLoading, isSuccess, isError } = useProfileSelector();
    const [isVendorRegistered, setIsVendorRegistered] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showResetPassword, setShowResetPassword] = useState(false);
    const [resetEmail, setResetEmail] = useState(""); // Store email from forgotPassword API
    const [formHeading, setFormHeading] = useState("Vendor Login"); // Track the current form heading

    useEffect(() => {
        if (isLoading) {
            console.log("profile Loading");
        } else if (isError) {
            console.log("profile error");
        } else if (isSuccess) {
            console.log(user);
            if (user.isVendor) {
                if (isVendorRegistered) {
                    console.log('registered');
                    console.log(user);
                    navigate('/select-preference');
                } else {
                    console.log('done');
                    console.log(user);
                    navigate('/categories/vendor/dashboard');
                }
            } else if (!user.isVendor) {
                console.log('done');
                console.log(user);
                navigate('/categories/couples/dashboard');
            }
        }
    }, [isError, isLoading, isSuccess, user]);

    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    };

    const toggleRegister = () => {
        setRegistered(!isRegistered);
        setFormHeading(isRegistered ? "Create an account" : "Vendor Login"); // Update heading
    };

    const vendorRegister = useFormik({
        initialValues: {
            lastName: "",
            firstName: "",
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            firstName: Yup.string()
                .max(100, "Must be Less than 50 characters")
                .required("Required"),
            lastName: Yup.string()
                .max(100, "Must be Less than 50 characters")
                .required("Required"),
            email: Yup.string()
                .email()
                .max(125, "Must be Less than 125 characters")
                .required("Required"),
            password: Yup.string()
                .max(50, "Must be Less than 50 characters")
                .required("Required"),
        }),
        onSubmit: (values, { setSubmitting }) => {
            dispatch(registerVendor({
                requestData: values,
                onDone: async () => {
                    setSubmitting(false);
                    await dispatch(getUserProfile());
                },
            })).unwrap().catch(error => {
                console.log('error', error);
                setErrorMessage(error.message);
                setSubmitting(false);
            });
            setIsVendorRegistered(true);
        },
    });

    const vendorLogin = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email()
                .max(125, "Must be Less than 125 characters")
                .required("Required"),
            password: Yup.string()
                .max(50, "Must be Less than 50 characters")
                .required("Required"),
        }),
        onSubmit: (values, { setSubmitting }) => {
            dispatch(loginUser({
                requestData: values,
                onDone: async () => {
                    setSubmitting(false);
                    await dispatch(getUserProfile());
                },
            })).unwrap().catch(error => {
                console.log('error', error);
                setErrorMessage(error.message);
                setSubmitting(false);
            });
        },
    });

    const forgotPasswordForm = useFormik({
        initialValues: {
            email: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .email()
                .max(125, "Must be Less than 125 characters")
                .required("Required"),
        }),
        onSubmit: (values, { setSubmitting }) => {
            dispatch(forgotPassword({
                requestData: values,
                onDone: async () => {
                    setSubmitting(false);
                },
            }))
                .unwrap()
                .then((response) => {
                    console.log(response); // Log the response for debugging
                    if (response) {
                        alert(response); // Display the success message
                        setResetEmail(values.email); // Store the email for reset password form
                        setShowForgotPassword(false);
                        setShowResetPassword(true); // Show the reset password form
                        setFormHeading("Create a new password"); // Update heading
                    }
                })
                .catch(error => {
                    console.log('error', error);
                    setErrorMessage(error.message || "An error occurred. Please try again.");
                    setSubmitting(false);
                });
        },
    });

    const resetPasswordForm = useFormik({
        initialValues: {
            password: "",
            confirmPassword: "",
            token: "", // OTP field (named as token by backend)
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .max(50, "Must be Less than 50 characters")
                .required("Required"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref("password"), null], "Passwords must match") // Compare passwords
                .required("Required"),
            token: Yup.string().required("OTP is required"), // OTP field
        }),
        onSubmit: (values, { setSubmitting }) => {
            const resetData = {
                email: resetEmail, // Use the email from forgotPassword API
                password: values.password,
                token: values.token, // OTP field
            };

            dispatch(resetPassword({
                requestData: resetData,
                onDone: async () => {
                    setSubmitting(false);
                },
            }))
                .unwrap()
                .then((response) => {
                    console.log(response); // Log the response for debugging
                    if (response) {
                        alert(response); // Display the success message
                        setShowResetPassword(false); // Hide the reset password form
                        setShowForgotPassword(false); // Hide the forgot password form
                        setFormHeading("Vendor Login"); // Update heading
                    }
                })
                .catch(error => {
                    console.log('error', error);
                    setErrorMessage(error.message || "An error occurred. Please try again.");
                    setSubmitting(false);
                });
        },
    });

    const formSwitch = () => {
        if (showForgotPassword) {
            return (
                <form onSubmit={forgotPasswordForm.handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            name="email"
                            type="email"
                            className="form-control"
                            onChange={forgotPasswordForm.handleChange}
                            value={forgotPasswordForm.values.email}
                        />
                        {forgotPasswordForm.touched.email && forgotPasswordForm.errors.email ? (
                            <div className="error">{forgotPasswordForm.errors.email}</div>
                        ) : null}
                    </div>
                    {errorMessage && <div className="error">{errorMessage}</div>}
                    <button type="submit" className="btn firstBtn" disabled={forgotPasswordForm.isSubmitting}>
                        {forgotPasswordForm.isSubmitting ? "Sending..." : "Send OTP"}
                    </button>
                    <button type="button" className="btn secondBtn" onClick={() => {
                        setShowForgotPassword(false);
                        setFormHeading("Vendor Login"); // Update heading
                    }}>
                        Back to Login
                    </button>
                </form>
            );
        } else if (showResetPassword) {
            return (
                <form onSubmit={resetPasswordForm.handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">New Password</label>
                        <div className="password-input-container">
                        <input
                            name="password"
                            type={isPasswordVisible ? "text" : "password"}
                            className="form-control"
                            onChange={resetPasswordForm.handleChange}
                            value={resetPasswordForm.values.password}
                        />
                        <span
                                className="password-toggle-icon"
                                onClick={togglePasswordVisibility}
                            >
                                {isPasswordVisible ? (
                                    <i className="bi bi-eye-slash"></i>
                                ) : (
                                    <i className="bi bi-eye"></i>
                                )}
                        </span>
                        </div>
                        {resetPasswordForm.touched.password && resetPasswordForm.errors.password ? (
                            <div className="error">{resetPasswordForm.errors.password}</div>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Confirm Password</label>
                        <div className="password-input-container">
                        <input
                            name="confirmPassword"
                            type={isPasswordVisible ? "text" : "password"}
                            className="form-control"
                            onChange={resetPasswordForm.handleChange}
                            value={resetPasswordForm.values.confirmPassword}
                        />
                        <span
                                className="password-toggle-icon"
                                onClick={togglePasswordVisibility}
                            >
                                {isPasswordVisible ? (
                                    <i className="bi bi-eye-slash"></i>
                                ) : (
                                    <i className="bi bi-eye"></i>
                                )}
                            </span>
                        </div>
                        {resetPasswordForm.touched.confirmPassword && resetPasswordForm.errors.confirmPassword ? (
                            <div className="error">{resetPasswordForm.errors.confirmPassword}</div>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">OTP</label>
                        <input
                            name="token"
                            type="text"
                            className="form-control"
                            onChange={resetPasswordForm.handleChange}
                            value={resetPasswordForm.values.token}
                        />
                        {resetPasswordForm.touched.token && resetPasswordForm.errors.token ? (
                            <div className="error">{resetPasswordForm.errors.token}</div>
                        ) : null}
                    </div>
                    {errorMessage && <div className="error">{errorMessage}</div>}
                    <button type="submit" className="btn firstBtn" disabled={resetPasswordForm.isSubmitting}>
                        {resetPasswordForm.isSubmitting ? "Resetting..." : "Reset Password"}
                    </button>
                    <button type="button" className="btn secondBtn" onClick={() => {
                        setShowResetPassword(false);
                        setFormHeading("Vendor Login"); // Update heading
                    }}>
                        Back to Login
                    </button>
                </form>
            );
        } else if (isRegistered) {
            return (
                <form onSubmit={vendorLogin.handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            name="email"
                            type="email"
                            className="form-control"
                            onChange={vendorLogin.handleChange}
                            value={vendorLogin.values.email}
                        />
                        {vendorLogin.touched.email && vendorLogin.errors.email ? (
                            <div className="error">{vendorLogin.errors.email}</div>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <div className="password-input-container">
                            <input
                                name="password"
                                type={isPasswordVisible ? "text" : "password"}
                                className="form-control"
                                onChange={vendorLogin.handleChange}
                                value={vendorLogin.values.password}
                            />
                            <span
                                className="password-toggle-icon"
                                onClick={togglePasswordVisibility}
                            >
                                {isPasswordVisible ? (
                                    <i className="bi bi-eye-slash"></i>
                                ) : (
                                    <i className="bi bi-eye"></i>
                                )}
                            </span>
                        </div>
                        {vendorLogin.touched.password && vendorLogin.errors.password ? (
                            <div className="error">{vendorLogin.errors.password}</div>
                        ) : null}
                    </div>
                    {errorMessage && <div className="error">{errorMessage}</div>}
                    <a className="forgot-password-link" onClick={() => {
                        setShowForgotPassword(true);
                        setFormHeading("Enter Your Email"); // Update heading
                    }}>
                        Forgot Password?
                    </a>
                    <button type="submit" className="btn firstBtn">
                        LOGIN
                    </button>
                    <button type="button" className="btn secondBtn" onClick={toggleRegister}>
                        Create Account
                    </button>
                </form>
            );
        } else {
            return (
                <form onSubmit={vendorRegister.handleSubmit}>
                    <div className="mb-3">
                        <div className="d-flex">
                            <div>
                                <label className="form-label">First Name</label>
                                <input
                                    name="firstName"
                                    type="text"
                                    className="form-control"
                                    onChange={vendorRegister.handleChange}
                                    value={vendorRegister.values.firstName}
                                />
                                {vendorRegister.touched.firstName && vendorRegister.errors.firstName ? (
                                    <div className="error">{vendorRegister.errors.firstName}</div>
                                ) : null}
                            </div>
                            <div>
                                <label className="form-label">Last Name</label>
                                <input
                                    name="lastName"
                                    type="text"
                                    className="form-control"
                                    onChange={vendorRegister.handleChange}
                                    value={vendorRegister.values.lastName}
                                />
                                {vendorRegister.touched.lastName && vendorRegister.errors.lastName ? (
                                    <div className="error">{vendorRegister.errors.lastName}</div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            name="email"
                            type="email"
                            className="form-control"
                            onChange={vendorRegister.handleChange}
                            value={vendorRegister.values.email}
                        />
                        {vendorRegister.touched.email && vendorRegister.errors.email ? (
                            <div className="error">{vendorRegister.errors.email}</div>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <div className="password-input-container">
                            <input
                                name="password"
                                type={isPasswordVisible ? "text" : "password"}
                                className="form-control"
                                onChange={vendorRegister.handleChange}
                                value={vendorRegister.values.password}
                            />
                            <span
                                className="password-toggle-icon"
                                onClick={togglePasswordVisibility}
                            >
                                {isPasswordVisible ? (
                                    <i className="bi bi-eye-slash"></i>
                                ) : (
                                    <i className="bi bi-eye"></i>
                                )}
                            </span>
                        </div>
                        {vendorRegister.touched.password && vendorRegister.errors.password ? (
                            <div className="error">{vendorRegister.errors.password}</div>
                        ) : null}
                    </div>
                    {errorMessage && <div className="error">{errorMessage}</div>}
                    <button type="submit" className="btn firstBtn">
                        SUBMIT
                    </button>
                    <button type="button" className="btn secondBtn" onClick={toggleRegister}>
                        Login
                    </button>
                </form>
            );
        }
    };

    return (
        <>
            <div className="userLogin">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-7">
                            <div className="row">
                                <div className="col-lg-5 col-sm-12">
                                    <div className={"cardHeader"}>
                                        <h2>PLATINUM PLAN</h2>
                                        <h3>
                                            <sup>$</sup>120<sub>/MO</sub>
                                        </h3>
                                    </div>
                                    <div className="features">
                                        <p>Everything in Gold plus:</p>
                                        <hr />
                                        <ul>
                                            <li>Message all leads that view your profile</li>
                                            <hr />
                                            <li>Be featured on our social media channels</li>
                                            <hr />
                                            <li>Automated matching</li>
                                            <hr />
                                        </ul>
                                    </div>
                                    <div className="d-flex flex-column appLinks">
                                        <a target="_blank" href="https://play.google.com/store/apps/details?id=com.wedstimatemobileapp">
                                            <img src={googleplay} alt="" width={150} />
                                        </a>
                                        <a target="_blank" href="https://apps.apple.com/us/app/wedstimate/id6712045315">
                                            <img src={applestore} alt="" width={150} />
                                        </a>
                                    </div>
                                </div>
                                <div className="col-lg-5 col-sm-12">
                                    <div className={"cardHeader"}>
                                        <h2>GOLD PLAN</h2>
                                        <h3>
                                            <sup>$</sup>99<sub>/MO</sub>
                                        </h3>
                                    </div>
                                    <div className="features">
                                        <ul>
                                            <li>5 Leads Guaranteed per month</li>
                                            <hr />
                                            <li>In-app Messaging</li>
                                            <hr />
                                            <li>Create profile with image gallery</li>
                                            <hr />
                                        </ul>
                                    </div>
                                    <div className="d-flex flex-column appLinks">
                                        <a target="_blank" href="https://play.google.com/store/apps/details?id=com.wedstimatemobileapp">
                                            <img src={googleplay} alt="" width={150} />
                                        </a>
                                        <a target="_blank" href="https://apps.apple.com/us/app/wedstimate/id6712045315">
                                            <img src={applestore} alt="" width={150} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <Link to={"/"}>
                                <img src={logo} alt="" />
                            </Link>
                            <h2>{formHeading}</h2>
                            <div className="form">
                                {formSwitch()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}