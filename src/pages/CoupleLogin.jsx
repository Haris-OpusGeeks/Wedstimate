// import whiteLogo from '../assets/logo white.png';
import logo from '../assets/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik} from 'formik';
import * as Yup from 'yup'
import { useDispatch } from 'react-redux';
import { registerCouples, loginUser,} from '../Redux/Reducers/authSlice';
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

    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
    };

    useEffect(()=>{
        if (isLoading){
            console.log("profile Loading");
        } else if (isError) {
            console.log("profile error");
        } else if (isSuccess) {
            console.log(user);
            if(user.isVendor) {
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
    const toggleRegister = (()=>{
        setRegistered(!isRegistered);
    })
    // const { user, isAuthenticated, isLoading, error, isLoggedIn } = useAuthSelector();
    // function handleClick() {
    //     // console.log('clicked');
    // }
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
                    await dispatch(getUserProfile())
                        // .then((response) =>{
                        //     if (isSuccess){
                        //         console.log("response", response);
                        //         if(localStorage.getItem('user').isVendor) {
                        //             console.log('done');
                        //             console.log(user);
                        //             navigate('/categories/vendor/dashboard');
                        //         } else {
                        //             console.log('done');
                        //             console.log(user);
                        //             navigate('/categories/couples/dashboard');
                        //         }
                        //     }
                        // });
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
                // setSubmitting(false);
                // console.log('done');
                await dispatch(getUserProfile());
                  // if(user) {
                  //     if(user.isVendor) {
                  //         console.log('done');
                  //         console.log(user);
                  //         navigate('/categories/vendor/dashboard');
                  //     } else {
                  //         console.log('done');
                  //         console.log(user);
                  //         navigate('/categories/couples/dashboard');
                  //     }
                  // }
              },
            })).unwrap().catch(error => {
              console.log('error', error);
              setErrorMessage(error.message);
              setSubmitting(false);
            });
          },
      });
      const formOutput = (()=>{
            if (isRegistered == true) {
                return(
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
                                    )} {/* Toggle Bootstrap eye icon */}
                                </span>
                            </div>
                            {coupleLogin.touched.password && coupleLogin.errors.password ? (
                                <div className="error">{coupleLogin.errors.password}</div>
                            ) : null}
                        </div>
                        {errorMessage && <div className="error">{errorMessage}</div>}
                        <button type='submit' className='btn firstBtn' value='submit'>SUBMIT</button>
                        <button type="button" className='btn secondBtn' onClick={toggleRegister}>Register</button>
                    </form>
                );
            } else {
                return(
                    <form onSubmit={coupleRegister.handleSubmit}>
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
                                    )} {/* Toggle Bootstrap eye icon */}
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
      })
  return (
    <>
        <div className="userLogin">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-7">
                        {/*<div className="row boxRow">*/}
                        {/*    <div className="col-lg-5 box col-sm-12">*/}
                        {/*        <img src={matching} alt="" />*/}
                        {/*        <h4>Preference-Based Matching</h4>*/}
                        {/*        <p><span>Wedstimate offers preference-based matching, actively connecting couples with vendors that align with their specific preferences, style, and budget</span></p>*/}
                        {/*    </div>*/}
                        {/*    <div className="col-lg-5 box  col-sm-12">*/}
                        {/*        <img src={messaging} alt="" />*/}
                        {/*        <h4>In-App Messaging</h4>*/}
                        {/*        <p><span>Wedstimate offers in-app messaging. allowing seamless communication between you and your vendors.</span></p>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<div className="row boxRow">*/}
                        {/*    <div className="col-lg-5 box  col-sm-12">*/}
                        {/*        <img src={vendor} alt="" />*/}
                        {/*        <h4>Extensive Vendor Network</h4>*/}
                        {/*        <p><span>Wedstimate boasts a vast network of hundreds of vendors in various areas. This helps us find the ideal vendor for you</span></p>*/}
                        {/*    </div>*/}
                        {/*    <div className="col-lg-5 box  col-sm-12">*/}
                        {/*        <img src={deals} alt="" />*/}
                        {/*        <h4>Exclusive Deals</h4>*/}
                        {/*        <p><span>Wedstimate provides exclusive deals and packages for couples, helping you get the best value for your money.</span></p>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <div className={"content"}>
                            <h1>JOIN TODAY!</h1>
                            <h2> Let us help create your dream wedding!</h2>
                            <h3>Wedstimate.com is the new vendor directory where engaged couples go to find the best wedding vendors in the industry!</h3>
                            <hr/>
                            <h4>Preference-Based Matching</h4>
                            <p>Wedstimate offers preference-based matching, actively connecting couples with vendors that align with their specific preferences, style, and budget</p>
                            <hr/>
                            <h4>In-App Messaging</h4>
                            <p>Wedstimate offers in-app messaging. allowing seamless communication between you and your vendors.</p>
                            <hr/>
                            <h4>Extensive Vendor Network</h4>
                            <p>Wedstimate boasts a vast network of hundreds of vendors in various areas. This helps us find the ideal vendor for you</p>
                            <hr/>
                            <h4>Exclusive Deals</h4>
                            <p>Wedstimate provides exclusive deals and packages for couples, helping you get the best value for your money.</p>
                        </div>
                    </div>
                    <div className="col-lg-5">
                        <Link to={'/'}>
                            <img src={logo} alt="" />
                        </Link>
                        <h2>Create a FREE account</h2>
                        <div className="form">
                            {formOutput()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
