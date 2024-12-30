import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addVendorPreferencesInEvent, getCategoryPreferencesList, getListOfVendors, getVendorsReviews, getVendorDetails,noAuthGetVendorDetails } from '../../Redux/Reducers/categorySlice';
import useCategorySelector from '../../Redux/Selectors/useCategorySelector';
import { base_url } from '../../Redux/Utils/helper';
import './buildinginner.scss';
import DynamicModal from '../../components/DynamicModal';
import DynamicToast from '../../components/DynamicToast';
import { createRoomForVendorPreference } from '../../Redux/Reducers/chatSlice';
import defaultImg from '../../assets/default.jpg';
import Loader from "../../components/Loader.jsx";

export default function CategoryPreferences() {
    const { categoryPreferences, zipCode } = useParams();
    const location = useLocation(); // Use useLocation to get the location object
    const dispatch = useDispatch();
    const vendorDispatch = useDispatch();
    const categoryDispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [modalData, setModalData] = useState(null);
    const [selectedPreferences, setSelectedPreferences] = useState(new Set());
    const { categoryName } = location.state || {};
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const {
        categoryPreferencesItem,
        isLoading,
        vendorItem,
    } = useCategorySelector();

    const handleShowToast = useCallback((message) => {
        setMessage(message);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 5000); // Hide toast after 5 seconds
    }, []);


    useEffect(() => {
        console.log('categoryPreferences', categoryPreferences, 'zipCode', zipCode);
        // console.log(categoryPreferences);
        // setSelectedPreferences((prevPrefs) => new Set([...prevPrefs, categoryPreferences]));
        const fetchData = async () => {
            await dispatch(getCategoryPreferencesList(categoryPreferences));
            setLoading(false);
        };

        fetchData();
    }, [dispatch, categoryPreferences]);

    const fetchVendors = useCallback((page, preferences) => {
        const requestData = {
            categoryPreferences: Array.from(preferences),
            categoryId : categoryPreferences,
            ...(zipCode && zipCode.length === 5 ? {zipCode: zipCode} : {}),
        };
        // Check for the user object in localStorage
        const user = JSON.parse(localStorage.getItem("user"));
        if (localStorage.getItem("accessToken") && user.zipCode) {
            requestData.zipCode = user.zipCode; // Add zipCode if it exists
        }
        vendorDispatch(getListOfVendors(requestData));
    }, [vendorDispatch]);

    useEffect(() => {
        fetchVendors(page, Array.from(selectedPreferences));
    }, [fetchVendors, page, selectedPreferences]);

    useEffect(() => {
        if (vendorItem && vendorItem.totalPages) {
            setTotalPages(vendorItem.totalPages);
        }
        console.log("vendors", vendorItem.vendors);
    }, [vendorItem]);

    const handleCheckboxChange = useCallback((preferenceId) => {
        setSelectedPreferences((prevSelected) => {
            const updated = new Set(prevSelected);
            if (updated.has(preferenceId)) {
                updated.delete(preferenceId);
            } else {
                updated.add(preferenceId);
            }
            setPage(1); // Reset to the first page when preferences change
            return updated;
        });
    }, []);

    const onDone = useCallback((message) => {
        handleShowToast(message);
    }, [handleShowToast]);

    const onAddPress = useCallback((vendorDetails) => {
        console.log("running");
        // event.preventDefault(); // Prevent default action
        // event.stopPropagation(); // Prevent event bubbling
        if (localStorage.getItem('currentEventId')) {
            try {
                const requestData = {
                    vendorPreferenceId: vendorDetails?.id,
                    eventId: localStorage.getItem('currentEventId'),
                };
                dispatch(addVendorPreferencesInEvent({ requestData, onDone: () => onDone('Vendor Added Successfully') }));
            } catch (error) {
                console.log(error);
            }
        } else {
            navigate("/couple-login");
        }
    }, [dispatch, onDone]);

    const renderCategorySection = useCallback((category, index) => (
        <div className="categorySec" key={index}>
            <h4>{category.title}</h4>
            {category.data.map((preference) => (
                <div className="form-check" key={preference.preferenceId}>
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={selectedPreferences.has(preference.preferenceId)}
                        onChange={() => handleCheckboxChange(preference.preferenceId)}
                        id={preference.preferenceId}
                    />
                    <label className="form-check-label" htmlFor={preference.preferenceId}>
                        {preference.preferenceName}
                    </label>
                </div>
            ))}
        </div>
    ), [handleCheckboxChange, selectedPreferences]);

    const renderCategories = () => {
        if (isLoading) {
            return (<Loader/>);
        } else if (!categoryPreferencesItem.categoryPreferences || !Array.isArray(categoryPreferencesItem.categoryPreferences) || categoryPreferencesItem.categoryPreferences.length === 0) {
            return (<Loader/>);
        } else {
            return categoryPreferencesItem.categoryPreferences.map((category) => renderCategorySection(category));
        }
    };

    const handleModalOpen = useCallback(async (id) => {
        // const reviewsResponse = await dispatch(getVendorsReviews(id));
        // const reviews = reviewsResponse.payload;
        const response = await dispatch(noAuthGetVendorDetails(id));
        const details = response.payload;
        // console.log(reviews);

        // const vendorReviews = vendorReviewsItem.reviews || [];
        // console.log(response.payload);
        setModalData({id, details});
    }, [dispatch]);

    const handleModalClose = useCallback(() => {
        setModalData(null);
    }, []);

    const createChat = useCallback((id, title) => {
        if (localStorage.getItem('accessToken')) {
            try {
                const requestData = {
                    vendorPreferenceId: id
                };
                const response = dispatch(createRoomForVendorPreference(requestData));
                navigate(`/categories/chat/${response.payload}`, { state: { selectedVendorTitle: title } });
            } catch (error) {
                console.log(error);
            }
        } else {
            navigate('/couple-login');
        }
    }, [dispatch, navigate]);

    const renderVendors = () => {
        // Check if vendorItem is null or undefined
        if (!vendorItem) {
            return <Loader />;
        }

        // Check if vendorItem.vendors is not an array
        if (!Array.isArray(vendorItem.vendors)) {
            return <p>No vendors available</p>;
        }

        // Check if the array is empty
        if (vendorItem.vendors.length === 0) {
            return <p>No vendors available</p>;
        }

        // Render vendors if the array has items
        return vendorItem.vendors.map((vendor, index) => (
            <div className="col-sm-12 col-lg-4" key={index}>
                <img
                    src={vendor.imageUrl ? `${base_url}/${vendor.imageUrl}` : defaultImg}
                    alt={vendor.name}
                />
                <button
                    onClick={() =>
                        handleModalOpen(
                            vendor.id,
                            vendor.name,
                            vendor.description,
                            `${vendor.imageUrl}`,
                            null,
                            vendor.lat,
                            vendor.lon
                        )
                    }
                >
                    <h5 id={vendor.id}>{vendor.name}</h5>
                </button>
                <p className="d-flex align-items-center mb-0">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="12"
                        height="12"
                        fill="#023866"
                        className="bi bi-star me-2"
                        viewBox="0 0 16 16"
                    >
                        <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.56.56 0 0 0-.163-.505L1.71 6.745l4.052-.576a.53.53 0 0 0 .393-.288L8 2.223l1.847 3.658a.53.53 0 0 0 .393.288l4.052.575-2.906 2.77a.56.56 0 0 0-.163.506l.694 3.957-3.686-1.894a.5.5 0 0 0-.461 0z" />
                    </svg>
                    {vendor.rating}
                </p>
                <h6>${vendor.price}*</h6>
                <p className="underline">
                    *Prices may vary based on time, date, and circumstances.
                </p>
                <div className="d-flex">
                    <button
                        className="btn"
                        onClick={() => onAddPress(vendor)}
                    >
                        ADD TO DASHBOARD
                    </button>
                    <button
                        className="btn chatBtn"
                        onClick={() => createChat(vendor.id, vendor.name)}
                    >
                        <i className="bi bi-chat"></i>
                    </button>
                </div>
            </div>
        ));
    };


    return (
        <>
            {modalData && (
                <DynamicModal
                    id={modalData.id}
                    show={!!modalData}
                    details={modalData.details}
                    reviews={modalData.reviews}
                    onClose={handleModalClose}
                />
            )}
            <div className="weddingBuildingInner">
                <DynamicToast show={showToast} message={message} />
                <div className="titleBox">
                    <div className="d-flex">
                        <div className="title">
                            <h2>{categoryName}</h2>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="d-flex">
                        <div className="categories">
                            {renderCategories()}
                        </div>
                        <div className="main">
                            <div className="row">
                                {renderVendors()}
                            </div>
                            {/*<div className="pagination">*/}
                            {/*    <button*/}
                            {/*        className="btn btn-outline-primary"*/}
                            {/*        disabled={page === 1}*/}
                            {/*        onClick={() => setPage((prevPage) => prevPage - 1)}*/}
                            {/*    >*/}
                            {/*        Previous*/}
                            {/*    </button>*/}
                            {/*    {renderPagination()}*/}
                            {/*    <button*/}
                            {/*        className="btn btn-outline-primary"*/}
                            {/*        disabled={page === totalPages}*/}
                            {/*        onClick={() => setPage((prevPage) => prevPage + 1)}*/}
                            {/*    >*/}
                            {/*        Next*/}
                            {/*    </button>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
