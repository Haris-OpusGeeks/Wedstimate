import logo from "../assets/logo.png";
import {Link, useNavigate} from "react-router-dom";
import {loginUser, registerVendor} from "../Redux/Reducers/authSlice";
import {useFormik} from "formik";
import * as Yup from "yup";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {getUserProfile} from "../Redux/Reducers/profileSlice";
import googleplay from "../assets/website/googleplay.png";
import applestore from "../assets/website/applestore.png";
import useProfileSelector from "../Redux/Selectors/useProfileSelector.js";

export default function VendorLogin() {
    const dispatch = useDispatch();
    const [isRegistered, setRegistered] = useState(true);
    const navigate = useNavigate();
    const [errorMessage, setErrorMessage] = useState("");
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const {user, isLoading, isSuccess, isError} = useProfileSelector();
    const [isVendorRegistered, setIsVendorRegistered] = useState(false);

    useEffect(()=>{
        if (isLoading){
            console.log("profile Loading");
        } else if (isError) {
            console.log("profile error");
        } else if (isSuccess) {
            console.log(user);
            if(user.isVendor) {
                if(isVendorRegistered) {
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
        onSubmit: (values, {setSubmitting}) => {
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
        onSubmit: (values, {setSubmitting}) => {
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

    const onDone = () => {
        dispatch(getUserProfile());
        navigate('/categories/vendor/dashboard');
    }
    const onRegisterDone = () => {
        dispatch(getUserProfile());
        navigate('/select-preference');
    }

    const formSwitch = () => {
        if (isRegistered) {
            return (
                <form action="" onSubmit={vendorLogin.handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            name='email'
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
                                name='password'
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
                                )} {/* Toggle Bootstrap eye icon */}
                            </span>
                        </div>
                        {vendorLogin.touched.password && vendorLogin.errors.password ? (
                            <div className="error">{vendorLogin.errors.password}</div>
                        ) : null}
                    </div>
                    {errorMessage && <div className="error">{errorMessage}</div>}
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
                <form action="" onSubmit={vendorRegister.handleSubmit}>
                    <div className="mb-3">
                        <div className="d-flex">
                            <div>
                                <label className="form-label">First Name</label>
                                <input
                                    name='firstName'
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
                                    name='lastName'
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
                            name='email'
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
                                name='password'
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
                                )} {/* Toggle Bootstrap eye icon */}
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
                                        <hr/>
                                        <ul>
                                            <li>Message all leads that view your profile</li>
                                            <hr/>
                                            <li>Be featured on our social media channels</li>
                                            <hr/>
                                            <li>Automated matching</li>
                                            <hr/>
                                        </ul>
                                    </div>
                                    <div className="d-flex flex-column appLinks">
                                        <a href="https://play.google.com/store/apps/details?id=com.rough_smoke_23947">
                                            <img src={googleplay} alt="" width={150}/>
                                        </a>
                                        <a href="https://apps.apple.com/us/app/wedstimate-wedding-planner/id1578772552">
                                            <img src={applestore} alt="" width={150}/>
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
                                            <hr/>
                                            <li>In-app Messaging</li>
                                            <hr/>
                                            <li>Create profile with image gallery</li>
                                            <hr/>
                                        </ul>
                                    </div>
                                    <div className="d-flex flex-column appLinks">
                                        <a href="https://play.google.com/store/apps/details?id=com.rough_smoke_23947">
                                            <img src={googleplay} alt="" width={150}/>
                                        </a>
                                        <a href="https://apps.apple.com/us/app/wedstimate-wedding-planner/id1578772552">
                                            <img src={applestore} alt="" width={150}/>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <Link to={"/"}>
                                <img src={logo} alt=""/>
                            </Link>
                            <h2>Create an account</h2>
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
