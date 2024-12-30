import {getCategoryList, getCategoryPreferencesList} from "../../../../Redux/Reducers/categorySlice.js";
import {useDispatch} from "react-redux";
import useCategorySelector from "../../../../Redux/Selectors/useCategorySelector.js";
import {useCallback, useEffect, useState} from "react";
import {base_url} from "../../../../Redux/Utils/helper.js";
import Loader from "../../../../components/Loader.jsx";
import './NewVendor.scss'
import Autocomplete from "react-google-autocomplete";
import usePreferenceSelector from "../../../../Redux/Selectors/usePreferenceSelector.js";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {registerVendorByAdmin} from "../../../../Redux/Reducers/authSlice.js";
import DynamicToast from "../../../../components/DynamicToast.jsx";

function NewVendor() {
    const dispatch = useDispatch();
    const {categoryItem:{categories}} = useCategorySelector();
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedPreferences, setSelectedPreferences] = useState([]);
    const { categoryPreferencesItem: { categoryPreferences } } = useCategorySelector();
    const { preferenceItem: { preference, isLoading } } = usePreferenceSelector();
    const [lat, setLat] = useState(0);
    const [lon, setLon] = useState(0);

    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState('');


    const handleShowToast = (message) => {
        setMessage(message);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 5000); // Hide toast after 5 seconds
    };

    const formik = useFormik({
        initialValues: {
            firstName: '',
            lastName: '',
            email: '',
            zipCode: '',
            password: '',
            address: '',
            price: '',
            description: '',
            websiteUrl: '',
            files: [],
            Lat: 0,
            Lon: 0
        },
        validationSchema: Yup.object({
            firstName: Yup.string().required('First name is required'),
            lastName: Yup.string().required('Last name is required'),
            zipCode: Yup.string().max(5, 'It Must be 5 numbers only').required('ZIP Code is required'),
            email: Yup.string().email('Invalid email format').required('Email is required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
            address: Yup.string().required('Address is required'),
            price: Yup.number().required('Price is required'),
            description: Yup.string().required('Description is required'),
            websiteUrl: Yup.string().required('Website URL is required'),
            files: Yup.array()
                .min(1, 'At least one image is required') // Ensures that images are selected
                .of(
                    Yup.mixed()
                        .test('fileSize', 'File too large', value => !value || (value.size <= 5 * 1024 * 1024))
                        .test('fileType', 'Unsupported File Format', value => !value || ['image/jpeg', 'image/png'].includes(value.type))
                )
                .required('Images are required'),
        }),
        onSubmit: (values, { resetForm }) => {
            console.log("submitted");

            if (!selectedImages || selectedImages.length === 0) {
                console.error("No images selected. Cannot proceed with API request.");
                return; // Prevent the API call if no images are selected
            }

            const formData = new FormData();
            formData.append('CategoryId', selectedCategory);
            formData.append('ZipCode', values?.zipCode);
            formData.append('Name', `${values.firstName} ${values.lastName}`);
            formData.append('Address', values?.address);
            formData.append('Description', values?.description);
            formData.append('Lat', lat);
            formData.append('Lon', lon);
            formData.append('Price', values?.price);
            formData.append('WebsiteUrl', values?.websiteUrl);
            formData.append('SelectedPreferences', selectedPreferences.join(','));
            formData.append('Email', values?.email);
            formData.append('Password', values?.password);
            formData.append('FirstName', values?.firstName);
            formData.append('LastName', values?.lastName);
            formData.append('ProfileTypeId', '12fc2765-6b28-4f1e-8489-589ee5d08cab');
            values.files.forEach(file => formData.append("Images", file));

            // if (selectedImages?.length > 0) {
            //     selectedImages.forEach(image => {
            //         formData.append('Images', image);
            //     });
            // }

            for (const [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }

            try {
                dispatch(registerVendorByAdmin({ formData }))
                    .then((response) => {
                        if (response.type === "registerVendorByAdmin/fulfilled") {
                            console.log("vendor registered: ", response);
                            handleShowToast("Vendor Has Been Registered");
                            setLat(0);
                            setLon(0);
                            setSelectedImages([]);
                            setSelectedCategory(null);
                            setSelectedPreferences([]);
                            resetForm();
                        } else {
                            console.log(response);
                            // handleShowToast(response.error.message);
                        }
                    })
                    .catch((error) => {
                        handleShowToast("There was an error registering the vendor");
                        console.log(error);
                    });
            } catch (error) {
                console.log(error);
            }
        }
    });



    const handleAddressChange = (place) => {
        if (place && place.geometry) {
            const location = place.geometry.location;
            setLat(location.lat());
            setLon(location.lng());
            formik.setFieldValue('address', place.formatted_address);
            formik.setFieldValue('Lat', location.lat());
            formik.setFieldValue('Lon', location.lng());
        }
    };
    const handleImageRemove = (index) => {
        setSelectedImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

    useEffect(() => {
        dispatch(getCategoryList());
    }, [dispatch]);
    const selection = async (id) => {
        await setSelectedCategory(id);
        console.log(id); // Log the id instead of selectedCategory which will not be updated immediately
        renderCategories();
    };

    useEffect(() => {
        if (selectedCategory) {
            dispatch(getCategoryPreferencesList(selectedCategory));
        }
    }, [dispatch]);

    useEffect(() => {
        if (selectedCategory) {
            dispatch(getCategoryPreferencesList(selectedCategory));
        }
    }, [dispatch, selectedCategory]);

    useEffect(() => {
        if (!isLoading && categoryPreferences && Array.isArray(categoryPreferences) && categoryPreferences.length > 0) {
            console.log("Rendering categories", categoryPreferences);
        }
    }, [categoryPreferences, isLoading]);

    const handlePillClick = (preferenceId) => {
        setSelectedPreferences((prev) => {
            if (prev.includes(preferenceId)) {
                return prev.filter(id => id !== preferenceId);
            } else {
                return [...prev, preferenceId];
            }
        });
    };

    const renderCategorySection = useCallback((category, index) => (
        <div className="categorySec mb-3" key={index}>
            <h4>{category.title}</h4>
            <div className="pillsContainer d-flex flex-wrap column-gap-4">
                {category.data.map((item) => (
                    <div
                        key={`pill-${item.preferenceId}`}
                        className={`pill border border-primary p-2 rounded-pill ps-3 pe-3 ${selectedPreferences.includes(item.preferenceId) ? 'selected bg-primary' : ''}`}
                        onClick={() => handlePillClick(item.preferenceId)}
                    >
                        {item.preferenceName}
                    </div>
                ))}
            </div>
        </div>
    ), [selectedPreferences]);

    const renderCategories = () => {
        console.log("run");
        if (isLoading) {
            return <p>Loading...</p>;
        } else if (!categoryPreferences || !Array.isArray(categoryPreferences) || categoryPreferences.length === 0) {
            return <p>No categories found</p>;
        } else {
            return categoryPreferences.map((category) => renderCategorySection(category));
        }
    };
    return (
        <>
            <DynamicToast show={showToast} message={message} />
            <div className="vendorsPage">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-8">
                            <h2>Create A New Vendor</h2>
                        </div>
                        <div className="col-lg-4">
                        </div>
                    </div>
                    <div className="VendorFormArea">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="d-flex flex-wrap column-gap-3 row-gap-3">
                                <h2 className={"w-100"}>Vendor SignUp</h2>
                                <div className={"mb-3"}>
                                    <input
                                        className={"form-control"}
                                        type="text"
                                        placeholder="First Name"
                                        name="firstName"
                                        value={formik.values.firstName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.firstName && formik.errors.firstName ?
                                        <div className="error">{formik.errors.firstName}</div> : null}
                                </div>

                                <div className={"mb-3"}>
                                    <input
                                        className={"form-control"}
                                        type="text"
                                        placeholder="Last Name"
                                        name="lastName"
                                        value={formik.values.lastName}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.lastName && formik.errors.lastName ?
                                        <div className="error">{formik.errors.lastName}</div> : null}
                                </div>

                                <div className={"mb-3"}>
                                    <input
                                        className={"form-control"}
                                        type="email"
                                        placeholder="Email Address"
                                        name="email"
                                        value={formik.values.email}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.email && formik.errors.email ?
                                        <div className="error">{formik.errors.email}</div> : null}
                                </div>

                                <div className={"mb-3"}>
                                    <input
                                        className={"form-control"}
                                        type="password"
                                        placeholder="Enter Your Password"
                                        name="password"
                                        value={formik.values.password}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    {formik.touched.password && formik.errors.password ? <div className="error">{formik.errors.password}</div> : null}
                                </div>
                            </div>
                            <div className="d-flex flex-wrap column-gap-3 row-gap-3">
                                <h2 className={"w-100"}>Select Category</h2>
                                {categories ? categories.map((category, index) => (
                                    <div key={index} className={`col-lg-4 col-sm-6 ${selectedCategory === category.id ? 'selected' : ''}`} onClick={() => selection(category.id)}>
                                        <div className="imageBox">
                                            <img src={`${base_url}/${category.imageUrl}`} alt="" />
                                        </div>
                                        <div className="textBox">
                                            <h5>{category.name}</h5>
                                        </div>
                                    </div>
                                )):<Loader/>}
                            </div>
                            <div className="d-flex flex-wrap column-gap-3 row-gap-3">
                                <h2 className={"w-100"}>Update Preference</h2>
                                <div className={"mb-3"}>
                                    <Autocomplete
                                        apiKey={"AIzaSyDmKL3Ceh_HNgsYhuBGvQn0Kngc2EDAlFc"}
                                        onPlaceSelected={handleAddressChange}
                                        className="form-control"
                                        defaultValue=""
                                        options={{
                                            componentRestrictions: {country: "US"},
                                            types: ['geocode', 'establishment']
                                        }}
                                        libraries={["places"]}
                                    />
                                </div>
                                <div className={"mb-3"}>
                                    <input
                                        className={"form-control"}
                                        type="number"
                                        name={"price"}
                                        placeholder="Enter Your Price"
                                        value={formik.values.price}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur} // To handle touched state for validation
                                    />
                                    {formik.touched.price && formik.errors.price ?
                                        <div className="error">{formik.errors.price}</div> : null}
                                </div>
                                <div className={"mb-3"}>
                                    <input
                                        className={"form-control"}
                                        type="number"
                                        name={"zipCode"}
                                        placeholder="Enter Your ZIP Code"
                                        value={formik.values.zipCode}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur} // To handle touched state for validation
                                    />
                                    {formik.touched.zipCode && formik.errors.zipCode ?
                                        <div className="error">{formik.errors.zipCode}</div> : null}
                                </div>
                                <div className="mb-3 d-flex flex-column column-gap-4 w-100">
                                    <h2>Select Image</h2>
                                    <div className="form-group">
                                        {selectedImages.length > 0 ? (
                                            <div className="image-grid">
                                                {selectedImages.map((imageUrl, index) => (
                                                    <div key={index} className="image-container">
                                                        <img src={`${imageUrl}`}
                                                             alt={`Uploaded image ${index + 1}`}
                                                             className="img-fluid"/>
                                                        <button
                                                            type="button"
                                                            className="remove-image-btn btn btn-danger"
                                                            onClick={() => handleImageRemove(index)}
                                                        >
                                                            &times;
                                                        </button>
                                                    </div>
                                                ))}
                                                <div className="image-upload-box">
                                                    <label htmlFor="file" className="plus-icon">+</label>
                                                    <input
                                                        type="file"
                                                        id="file"
                                                        className="form-control"
                                                        multiple
                                                        onChange={(event) => {
                                                            const files = Array.from(event.target.files);
                                                            const fileUrls = files.map(file => URL.createObjectURL(file));
                                                            setSelectedImages(prev => [...prev, ...fileUrls]);
                                                            formik.setFieldValue('files', files);
                                                        }}
                                                        style={{display: 'none'}}
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="image-upload-box">
                                                <label htmlFor="file" className="plus-icon">+</label>
                                                <input
                                                    type="file"
                                                    id="file"
                                                    className="form-control"
                                                    multiple
                                                    onChange={(event) => {
                                                        const files = Array.from(event.target.files);
                                                        const fileUrls = files.map(file => URL.createObjectURL(file));
                                                        setSelectedImages(fileUrls);
                                                        formik.setFieldValue('files', files);
                                                    }}
                                                    style={{display: 'none'}}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className={"mb-3"}>
                                    <textarea
                                        name="description"
                                        id="description"
                                        className="form-control"
                                        placeholder={"Description"}
                                        value={formik.values.description}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur} // To handle touched state for validation
                                    ></textarea>
                                    {formik.touched.description && formik.errors.description ?
                                        <div className="error">{formik.errors.description}</div> : null}
                                </div>
                                <div className={"mb-3"}>
                                    <input
                                        name="websiteUrl"
                                        id="websiteUrl"
                                        className="form-control"
                                        placeholder={"Enter Your Website"}
                                        value={formik.values.websiteUrl}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur} // To handle touched state for validation
                                    />
                                    {formik.touched.websiteUrl && formik.errors.websiteUrl ?
                                        <div className="error">{formik.errors.websiteUrl}</div> : null}
                                </div>
                                <div className={"mb-3 w-100 flex"}>
                                    <h2>Select Preferences</h2>
                                    {isLoading ? <Loader/> : categoryPreferences && categoryPreferences.length > 0 ? (
                                        categoryPreferences.map((category, index) => renderCategorySection(category, index))
                                    ) : <p>No categories found</p>}

                                </div>
                            </div>
                            <button className={"btn"} type="submit">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewVendor;