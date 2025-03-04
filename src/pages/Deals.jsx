import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useDealSelector from '../Redux/Selectors/useDealSelector';
import { addDealInEvent, getListOfDeals, deleteDeal } from '../Redux/Reducers/dealSlice';
import { base_url, convertUTCToLocal } from '../Redux/Utils/helper';
import DynamicToast from '../components/DynamicToast';
import { createRoomForDeal } from '../Redux/Reducers/chatSlice';
import defaultImg from '../assets/default.jpg';
import ConfirmationModal from '../components/dashboard/Popup/ConfirmationModal'; // Import the confirmation modal

export default function Deals() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { dealsItem, isLoading, isError, isSuccess } = useDealSelector();
    const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState('');
    const user = localStorage.getItem('user');

    // State for deletion functionality
    const [showModal, setShowModal] = useState(false);
    const [dealToDelete, setDealToDelete] = useState(false);
    const [id, setId] = useState("");

    const handleShowToast = (message) => {
        setMessage(message);
        setShowToast(true);
        setTimeout(() => {
            setShowToast(false);
        }, 5000); // Hide toast after 5 seconds
    };

    useEffect(() => {
        dispatch(getListOfDeals());
        console.log(dealsItem);
    }, [dispatch]);

    // Function to handle deal deletion
    const handleDelete = (id) => {
        setId(id);
        setShowModal(true);
    };

    // Handle modal confirm action
    const handleConfirm = () => {
        setDealToDelete(true);
        setShowModal(false); // Close modal first before executing state change
    };

    // Effect to handle the deletion after confirmation
    useEffect(() => {
        if (dealToDelete) {
            const requestData = { id };
            dispatch(deleteDeal(requestData))
                .then(() => {
                    // Reload the page after successful deletion
                    window.location.reload();
                })
                .finally(() => {
                    setDealToDelete(false); // Reset the flag after deletion
                });
        }
    }, [dealToDelete, id, dispatch]);

    const onDone = (message) => {
        handleShowToast(message);
    };

    const onRemovePress = (dealDetails) => {
        return async (event) => {
            event.preventDefault(); // Prevent default action
            event.stopPropagation(); // Prevent event bubbling
            if (localStorage.getItem('currentEventId')) {
                try {
                    const requestData = {
                        eventDetailId: dealDetails?.id,
                    };
                    await dispatch(addDealInEvent({
                        requestData,
                        onDone: () => onDone('Deal Removed Successfully'),
                    }));
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.log("Not Removed");
            }
        };
    };

    const onAddPress = (dealDetails) => {
        return async (event) => {
            event.preventDefault(); // Prevent default action
            event.stopPropagation(); // Prevent event bubbling
            if (localStorage.getItem('currentEventId')) {
                try {
                    const requestData = {
                        dealId: dealDetails?.id,
                        eventId: localStorage.getItem('currentEventId'),
                    };
                    await dispatch(addDealInEvent({
                        requestData,
                        onDone: () => onDone('Deal Added Successfully'),
                    }));
                } catch (error) {
                    console.log(error);
                }
            } else {
                console.log("Not added");
            }
        };
    };

    const createChat = (id, title) => {
        return async (event) => {
            event.preventDefault(); // Prevent default action
            event.stopPropagation(); // Prevent event bubbling
            try {
                const requestData = {
                    dealId: id,
                };
                const newRoomId = await dispatch(createRoomForDeal(requestData)); // Assuming the response is a plain string
                navigate(`/categories/chat/${newRoomId.payload}`, { state: { selectedVendorTitle: title } });
            } catch (error) {
                console.log(error);
            }
        };
    };

    const renderAddButtons = (deal) => {
        if (user && user.isVendor === false) {
            return <p></p>;
        } else {
            return (
                <>
                    {deal.isAdded ?
                        <button className='btn' onClick={onRemovePress(deal)}>REMOVE FROM DASHBOARD</button>
                        :
                        <button className='btn' onClick={onAddPress(deal)}>ADD TO DASHBOARD</button>
                    }
                    <button className='btn chatBtn' onClick={createChat(deal.id, deal.name)}><i className="bi bi-chat"></i></button>
                    <button className="deleBtn" onClick={() => handleDelete(deal.id)}><i className="bi bi-trash3-fill"></i></button>
                </>
            );
        }
    };

    const filteredDeals = dealsItem.deals.filter((deal) => {
        const currentDate = new Date();
        const expiryDate = new Date(deal.dateExpire);
        console.log(expiryDate);
        return expiryDate >= currentDate; // Only include deals that have not expired
    });
    console.log(filteredDeals);

    if (isLoading) return <p>Loading...</p>;
    if (isError) return <p>Error loading deals!</p>;

    if (!dealsItem || !dealsItem.deals) return <p>No deals available.</p>;

    return (
        <div className="dealsPage">
            <DynamicToast show={showToast} message={message} />
            <div className="container-fluid">
                <h2>View your deals</h2>
                <p>These are the deals you created.</p>
                <div className="row">
                    {filteredDeals.length > 0 ? (
                        filteredDeals.map((deal) => (
                            <div key={deal.id} className="col-lg-3 col-sm-12">
                                <img
                                    src={deal.imageUrl ? `${base_url}/${deal.imageUrl}` : defaultImg}
                                    alt={deal.name}
                                />
                                <button>
                                    <h5>{deal.name}</h5>
                                </button>
                                <p>{deal.description}</p>
                                <h6>Vendor: {deal.vendorName}</h6>
                                <h6>Price: ${deal.price}</h6>
                                <h6>Expire Date: {convertUTCToLocal(deal.dateExpire)}</h6>
                                <p className="underline">
                                    *Prices may vary based on time, date, and circumstances.
                                </p>
                                <div className="d-flex">{renderAddButtons(deal)}</div>
                            </div>
                        ))
                    ) : (
                        <p className="no-deals-found">No deals found.</p>
                    )}
                </div>
            </div>

            {/* Confirmation Modal */}
            {showModal && (
                <ConfirmationModal
                    show={showModal}
                    onClose={() => setShowModal(false)}
                    onConfirm={handleConfirm}
                />
            )}
        </div>
    );
}