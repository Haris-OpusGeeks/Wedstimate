import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { registerCouples, loginUser, forgotPassword, resetPassword } from '../Redux/Reducers/authSlice';
import { useEffect, useState } from 'react';
import { getUserProfile } from '../Redux/Reducers/profileSlice';
import useProfileSelector from '../Redux/Selectors/useProfileSelector';

export default function CoupleLogin() {
    const dispatch = useDispatch();
    const [isRegistered, setRegistered] = useState(true);
    const navigate = useNavigate();
    const { user, isLoading, isError, isSuccess } = useProfileSelector();
    const [errorMessage, setErrorMessage] = useState('');
    const UNAUTHENTICATED = 'Authentication Failed.';
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showResetPassword, setShowResetPassword] = useState(false);
    const [resetEmail, setResetEmail] = useState(''); // Store email from forgotPassword API
    const [formHeading, setFormHeading] = useState('Couple Login'); // Track the current form heading

    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    };

    useEffect(() => {
        if (isLoading) {
            console.log("profile Loading");
        } else if (isError) {
            console.log("profile error");
        } else if (isSuccess) {
            console.log(user);
            if (user.isVendor) {
                console.log('done');
                console.log(user);
                navigate('/categories/vendor/dashboard');
            } else if (!user.isVendor) {
                console.log('done');
                console.log(user);
                navigate('/categories/couples/dashboard');
            }
        }
    }, [isError, isLoading, isSuccess, user]);

    const toggleRegister = () => {
        setRegistered(!isRegistered);
        setFormHeading(isRegistered ? 'Create a FREE Account' : 'Couple Login'); // Update heading
    };

    const coupleRegister = useFormik({
        initialValues: {
            lastName: '',
            firstName: '',
            email: '',
            password: '',
            noOfGuest: '',
            weddingDate: '',
            weddngZipCode: '',
        },
        validationSchema: Yup.object({
            firstName: Yup.string().max(100, 'Must be Less than 100 characters').required('Required'),
            lastName: Yup.string().max(100, 'Must be Less than 100 characters').required('Required'),
            email: Yup.string().email().max(125, 'Must be Less than 125 characters').required('Required'),
            password: Yup.string().max(50, 'Must be Less than 50 characters').required('Required'),
            noOfGuest: Yup.number().required('Required'),
            weddingDate: Yup.string().required('Required'),
            weddngZipCode: Yup.string().max(5).required('Required'),
        }),
        onSubmit: (values, { setSubmitting }) => {
            values.weddngZipCode = values.weddngZipCode.toString();
            dispatch(registerCouples({
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

    const coupleLogin = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email().max(125, 'Must be Less than 125 characters').required('Required'),
            password: Yup.string().max(50, 'Must be Less than 50 characters').required('Required'),
        }),
        onSubmit: (values, { setSubmitting }) => {
            dispatch(loginUser({
                requestData: values,
                onDone: async () => {
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
            email: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email().max(125, 'Must be Less than 125 characters').required('Required'),
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
                    setFormHeading('Create a new password'); // Update heading
                }
            })
            .catch(error => {
                console.log('error', error);
                setErrorMessage(error.message || 'An error occurred. Please try again.');
                setSubmitting(false);
            });
        },
    });

    const resetPasswordForm = useFormik({
        initialValues: {
            password: '',
            confirmPassword: '',
            token: '', // OTP field (named as token by backend)
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .max(50, 'Must be Less than 50 characters')
                .required('Required'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match') // Compare passwords
                .required('Required'),
            token: Yup.string().required('OTP is required'), // OTP field
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
                    setFormHeading('Couple Login'); // Update heading
                }
            })
            .catch(error => {
                console.log('error', error);
                setErrorMessage(error.message || 'An error occurred. Please try again.');
                setSubmitting(false);
            });
        },
    });

    const formOutput = () => {
        if (showForgotPassword) {
            return (
                <form onSubmit={forgotPasswordForm.handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            name='email'
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
                    <button type='submit' className='btn firstBtn' value='submit' disabled={forgotPasswordForm.isSubmitting}>
                        {forgotPasswordForm.isSubmitting ? 'Sending...' : 'Send OTP'}
                    </button>
                    <button type="button" className='btn secondBtn' onClick={() => {
                        setShowForgotPassword(false);
                        setFormHeading('Couple Login'); // Update heading
                    }}>Back to Login</button>
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
                            name='token'
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
                    <button type='submit' className='btn firstBtn' value='submit' disabled={resetPasswordForm.isSubmitting}>
                        {resetPasswordForm.isSubmitting ? 'Resetting...' : 'Reset Password'}
                    </button>
                    <button type="button" className='btn secondBtn' onClick={() => {
                        setShowResetPassword(false);
                        setFormHeading('Couple Login'); // Update heading
                    }}>Back To Login</button>
                </form>
            );
        } else if (isRegistered) {
            return (
                <form onSubmit={coupleLogin.handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            name='email'
                            type="email"
                            className="form-control"
                            onChange={coupleLogin.handleChange}
                            value={coupleLogin.values.email}
                        />
                        {coupleLogin.touched.email && coupleLogin.errors.email ? (
                            <div className="error">{coupleLogin.errors.email}</div>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <div className="password-input-container">
                            <input
                                name='password'
                                type={isPasswordVisible ? "text" : "password"}
                                className="form-control"
                                onChange={coupleLogin.handleChange}
                                value={coupleLogin.values.password}
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
                        {coupleLogin.touched.password && coupleLogin.errors.password ? (
                            <div className="error">{coupleLogin.errors.password}</div>
                        ) : null}
                    </div>
                    {errorMessage && <div className="error">{errorMessage}</div>}
                    <a className="forgot-password-link" onClick={() => {
                        setShowForgotPassword(true);
                        setFormHeading('Enter Your Email'); // Update heading
                    }}>Forgot Password?</a>
                    <button type='submit' className='btn firstBtn' value='submit'>SUBMIT</button>
                    <button type="button" className='btn secondBtn' onClick={toggleRegister}>Register</button>
                </form>
            );
        } else {
            return (
                <form onSubmit={coupleRegister.handleSubmit}>
                    {/* Existing registration form fields */}
                    <div className="mb-3">
                        <div className="d-flex">
                            <div>
                                <label className="form-label">First Name</label>
                                <input
                                    name='firstName'
                                    type="text"
                                    className="form-control"
                                    onChange={coupleRegister.handleChange}
                                    value={coupleRegister.values.firstName}
                                />
                                {coupleRegister.touched.firstName && coupleRegister.errors.firstName ? (
                                    <div className="error">{coupleRegister.errors.firstName}</div>
                                ) : null}
                            </div>
                            <div>
                                <label className="form-label">Last Name</label>
                                <input
                                    name='lastName'
                                    type="text"
                                    className="form-control"
                                    onChange={coupleRegister.handleChange}
                                    value={coupleRegister.values.lastName}
                                />
                                {coupleRegister.touched.lastName && coupleRegister.errors.lastName ? (
                                    <div className="error">{coupleRegister.errors.lastName}</div>
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
                            onChange={coupleRegister.handleChange}
                            value={coupleRegister.values.email}
                        />
                        {coupleRegister.touched.email && coupleRegister.errors.email ? (
                            <div className="error">{coupleRegister.errors.email}</div>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <div className="password-input-container">
                            <input
                                name='password'
                                type={isPasswordVisible ? "text" : "password"}
                                className="form-control"
                                onChange={coupleRegister.handleChange}
                                value={coupleRegister.values.password}
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
                        {coupleRegister.touched.password && coupleRegister.errors.password ? (
                            <div className="error">{coupleRegister.errors.password}</div>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Number Of Guests</label>
                        <input
                            name='noOfGuest'
                            type="number"
                            className="form-control"
                            onChange={coupleRegister.handleChange}
                            value={coupleRegister.values.noOfGuest}
                        />
                        {coupleRegister.touched.noOfGuest && coupleRegister.errors.noOfGuest ? (
                            <div className="error">{coupleRegister.errors.noOfGuest}</div>
                        ) : null}
                    </div>
                    <div className="mb-3">
                        <div className="d-flex">
                            <div>
                                <label className="form-label">Wedding Date</label>
                                <input
                                    name='weddingDate'
                                    type="date"
                                    className="form-control"
                                    onChange={coupleRegister.handleChange}
                                    value={coupleRegister.values.weddingDate}
                                />
                                {coupleRegister.touched.weddingDate && coupleRegister.errors.weddingDate ? (
                                    <div className="error">{coupleRegister.errors.weddingDate}</div>
                                ) : null}
                            </div>
                            <div>
                                <label className="form-label">Wedding Zip Code</label>
                                <input
                                    name='weddngZipCode'
                                    type="number"
                                    className="form-control"
                                    onChange={coupleRegister.handleChange}
                                    value={coupleRegister.values.weddngZipCode}
                                />
                                {coupleRegister.touched.weddngZipCode && coupleRegister.errors.weddngZipCode ? (
                                    <div className="error">{coupleRegister.errors.weddngZipCode}</div>
                                ) : null}
                            </div>
                        </div>
                    </div>
                    {errorMessage && <div className="error">{errorMessage}</div>}
                    <button type='submit' className='btn firstBtn' value='submit'>SUBMIT</button>
                    <button type="button" className='btn secondBtn' onClick={toggleRegister}>Login</button>
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
                            <div className={"content"}>
                                <h1>JOIN TODAY!</h1>
                                <h2> Let us help create your dream wedding!</h2>
                                <h3>Wedstimate.com is the new vendor directory where engaged couples go to find the best wedding vendors in the industry!</h3>
                                <hr />
                                <h4>Preference-Based Matching</h4>
                                <p>Wedstimate offers preference-based matching, actively connecting couples with vendors that align with their specific preferences, style, and budget</p>
                                <hr />
                                <h4>In-App Messaging</h4>
                                <p>Wedstimate offers in-app messaging. allowing seamless communication between you and your vendors.</p>
                                <hr />
                                <h4>Extensive Vendor Network</h4>
                                <p>Wedstimate boasts a vast network of hundreds of vendors in various areas. This helps us find the ideal vendor for you</p>
                                <hr />
                                <h4>Exclusive Deals</h4>
                                <p>Wedstimate provides exclusive deals and packages for couples, helping you get the best value for your money.</p>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <Link to={'/'}>
                                <img src={logo} alt="" />
                            </Link>
                            <h2>{formHeading}</h2> {/* Dynamic heading */}
                            <div className="form">
                                {formOutput()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}