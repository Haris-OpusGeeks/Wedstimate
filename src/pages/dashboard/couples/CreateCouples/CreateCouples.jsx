import './CreateCouples.scss';
import {useFormik} from "formik";
import * as Yup from "yup";
import {logout, registerCouples, registerCouplesInBulk} from "../../../../Redux/Reducers/authSlice.js";
import {getUserProfile} from "../../../../Redux/Reducers/profileSlice.js";
import {useDispatch} from "react-redux";
import {useState} from "react";
import excelIcon from "../../../../assets/excel.png";
import DynamicToast from "../../../../components/DynamicToast.jsx";

function CreateCouples() {
    const dispatch = useDispatch();
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState('');
    const [csvDownloadUrl, setCsvDownloadUrl] = useState(null);
    const [showDownloadLink, setShowDownloadLink] = useState(false);


    const handleShowToast = (message) => {
        setMessage(message);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 5000); // Hide toast after 5 seconds
    };

    const togglePasswordVisibility = () => {
        setPasswordVisible(!isPasswordVisible);
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
            // console.log('Form values:' + values);
            // setSubmitting(false);
            console.log('Form submitted:', values);
            values.weddngZipCode = values.weddngZipCode.toString();
            try {
                dispatch(registerCouples({
                    requestData: values,
                    onDone: async (response) => {
                        if (response && response.status === 400) {
                            handleShowToast(response.error.message);
                            console.log(response);
                            coupleRegister.resetForm();
                        } else {
                            handleShowToast("Couple User Has Been Created");
                            setSubmitting(false);
                            console.log('done');
                            console.log(response);
                            coupleRegister.resetForm();
                        }
                    },
                })).unwrap().catch(error => {
                    console.log('error', error);
                    handleShowToast(error.message);
                    coupleRegister.resetForm();
                    setSubmitting(false);
                });
            } catch (error) {
                console.log(error);
            }
        },
    });


    const fileUploadFormik = useFormik({
        initialValues: {
            file: null,
        },
        validationSchema: Yup.object({
            file: Yup.mixed()
                .required('A file is required')
                .test(
                    'fileType',
                    'Unsupported file format. Please upload a CSV file.',
                    (value) => {
                        return value && value.type === 'text/csv';
                    }
                ),
        }),
        onSubmit: async (values, { setSubmitting }) => {
            const formData = new FormData();
            formData.append('file', values.file);
            try {
                const response = await dispatch(registerCouplesInBulk({formData})).unwrap()
                console.log(response);
                const csv = URL.createObjectURL(new Blob([response], { type: "text/csv" }));
                setCsvDownloadUrl(csv);
                setShowDownloadLink(true);
                setSubmitting(false);
            }catch (error) {
                console.log(error);
            }
        },
    });


    // const click = () => {
    //     console.log("done");
    // }

    return (
        <>
            <DynamicToast show={showToast} message={message} />
            <div className="vendorsPage">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-8">
                            <h2>Couples</h2>
                        </div>
                    </div>
                    <div className="contentArea">
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button className="nav-link active" id="singleCouple-tab" data-bs-toggle="tab"
                                        data-bs-target="#singleCouple-tab-pane" type="button" role="tab"
                                        aria-controls="singleCouple-tab-pane" aria-selected="true">Create A Couple
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button className="nav-link" id="multipleCouple-tab" data-bs-toggle="tab"
                                        data-bs-target="#multipleCouple-tab-pane" type="button" role="tab"
                                        aria-controls="multipleCouple-tab-pane" aria-selected="false">Upload Multiple Couples
                                </button>
                            </li>
                        </ul>
                        <div className="tab-content" id="myTabContent">
                            <div className="tab-pane fade show active" id="singleCouple-tab-pane" role="tabpanel"
                                 aria-labelledby="singleCouple-tab" tabIndex="0">
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
                                    <button type='submit' className='btn'>SUBMIT</button>
                                </form>
                            </div>
                            <div className="tab-pane fade" id="multipleCouple-tab-pane" role="tabpanel"
                                 aria-labelledby="multipleCouple-tab" tabIndex="0">
                                <form onSubmit={fileUploadFormik.handleSubmit}>
                                    <input
                                        className="form-control d-none"
                                        name="file"
                                        id="file"
                                        type="file"
                                        onChange={(event) => {
                                            fileUploadFormik.setFieldValue('file', event.currentTarget.files[0]);
                                        }}
                                    />
                                    <label htmlFor="file">
                                        <img src={excelIcon} alt="Excel Upload Icon"/>
                                        <h5>Upload Your Excel File Here</h5>
                                        {fileUploadFormik.values.file && (
                                            <div className="file-name">
                                                Selected File: {fileUploadFormik.values.file.name}
                                            </div>
                                        )}
                                    </label>
                                    {fileUploadFormik.errors.file && fileUploadFormik.touched.file ? (
                                        <div className="error">{fileUploadFormik.errors.file}</div>
                                    ) : null}
                                    <button type="submit" className="btn">Submit</button>
                                </form>
                                {/* Download Link */}
                                {showDownloadLink && (
                                    <div className="download-link">
                                        <a href={csvDownloadUrl} download="CouplesUploadResult.csv">
                                            Download Result CSV
                                        </a>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default CreateCouples;