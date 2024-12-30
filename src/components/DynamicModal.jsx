import PropTypes from 'prop-types';
import { base_url } from '../Redux/Utils/helper';
import defaultImg from '../assets/default.jpg';
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { createRoomForVendorPreference } from "../Redux/Reducers/chatSlice.js";
import { addVendorPreferencesInEvent, getVendorsReviews, noAuthGetVendorDetails } from "../Redux/Reducers/categorySlice.js";
import DynamicToast from "./DynamicToast.jsx";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation } from "swiper/modules";
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import RatingDynamic from "./RatingDynamic.jsx";
import useCategorySelector from "../Redux/Selectors/useCategorySelector.js";

// Components for individual sections
const ToastMessage = ({ showToast, message }) => (
    <DynamicToast show={showToast} message={message} />
);

const ImageSlider = ({ images }) => (
    images.length > 1 ? (
        <Swiper spaceBetween={0} slidesPerView={1} modules={[Navigation]} navigation>
          {images.map((image, index) => (
              <SwiperSlide key={index}>
                <img
                    src={image !== defaultImg ? `${base_url}/${image}` : defaultImg}
                    alt={`Image ${index + 1}`}
                    style={{ width: '100%', height: 'auto' }}
                />
              </SwiperSlide>
          ))}
        </Swiper>
    ) : (
        <img
            src={images[0] !== defaultImg ? `${base_url}/${images[0]}` : defaultImg}
            alt="Vendor"
            style={{ width: '100%', height: 'auto' }}
        />
    )
);

const ReviewsList = ({ reviews }) => (
    reviews?.length > 0 && (
        <div className="reviews">
          <h2>Reviews</h2>
          {reviews.map((review) => (
              <div className="d-flex" key={review.id}>
                <div className="imageBox">
                  <img src={review.coupleImageUrl ? `${base_url}/${review.coupleImageUrl}` : defaultImg} alt="Couple" />
                </div>
                <div className="contentBox">
                  <h3>{review.coupleName}</h3>
                  <RatingDynamic rating={review.rating} />
                  <p>{review.review}</p>
                </div>
              </div>
          ))}
          <hr />
        </div>
    )
);


const DynamicModal = ({ show, onClose, buttonText, buttonAction, id }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState('');
  // const [details, setDetails] = useState(null);
  const [images, setImages] = useState([defaultImg]);
  const [position, setPosition] = useState(null);
  const [reviews, setReviews] = useState([]);
  const {detailsItem:{details}} = useCategorySelector();

  useEffect(() => {
    if (id) {
      dispatch(noAuthGetVendorDetails(id)).then(() => {
        setPosition([details.lat, details.lon]);
        setImages(details.imageUrls || [defaultImg]);
      });
      if (localStorage.getItem('user')) {
        dispatch(getVendorsReviews(id)).then((response) => {
          setReviews(response);
        });
        console.log(reviews);
      }
    }
  }, [id, dispatch]);

  const MapDisplay = ({ position }) => {
    if (!position || position.length !== 2 || position.includes(null) || position.includes(undefined)) {
      return null; // Do not render the map if position is invalid
    }

    const DefaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow,
    });

    return (
        <MapContainer center={position} zoom={13} style={{ height: "400px", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={position} icon={DefaultIcon} />
        </MapContainer>
    );
  };


  const handleShowToast = useCallback((message) => {
    setMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  }, []);

  const onDone = useCallback((message) => {
    handleShowToast(message);
  }, [handleShowToast]);

  const addVendorPreference = useCallback(async () => {
    if (localStorage.getItem('currentEventId') && details) {
      try {
        const requestData = {
          vendorPreferenceId: details.id,
          eventId: localStorage.getItem('currentEventId'),
        };
        await dispatch(addVendorPreferencesInEvent({ requestData, onDone: () => onDone('Vendor Added Successfully') }));
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate("/couple-login");
    }
  }, [details, dispatch, navigate, onDone]);

  const createChat = async () => {
    if (localStorage.getItem('accessToken') && details) {
      try {
        const requestData = { vendorPreferenceId: details.id };
        await dispatch(createRoomForVendorPreference(requestData)).then(() => {
          navigate(`/categories/chat/${details.id}`, { state: { selectedVendorTitle: details.name } });
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      navigate('/couple-login');
    }
  };

  return (
      <>
        <ToastMessage showToast={showToast} message={message} />
        <div className={`dynamicModal modal fade ${show ? 'show' : ''}`} style={{ display: show ? 'block' : 'none' }} role="modal">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <ImageSlider images={images} />
                <h5 className="modal-title">{details ? details.name : null}</h5>
                <button type="button" className="close btn ms-auto" onClick={onClose} aria-label="Close">
                  <p aria-hidden="true">&times;</p>
                </button>
              </div>
              <div className="modal-body">
                <p>{details ? details.description : null}</p>
                <hr />
                <ReviewsList reviews={reviews} />
                <MapDisplay position={position} />
              </div>
              <div className="modal-footer">
                <div className="d-flex justify-content-around">
                  <div className="d-flex">
                    <button type="button" className="btn add" onClick={addVendorPreference}>Add To Dashboard</button>
                    <button type="button" className="btn add" onClick={createChat}><i className="bi bi-chat"></i></button>
                  </div>
                  {buttonText && buttonAction ? (
                      <button type="button" className="btn btn-danger" onClick={buttonAction}>
                        {buttonText}
                      </button>
                  ) : (
                      <button type="button" className="btn btn-secondary" onClick={onClose}>
                        Close
                      </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
  );
};

DynamicModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  buttonText: PropTypes.string,
  buttonAction: PropTypes.func,
  id: PropTypes.string.isRequired, // Assuming ID is a required prop for fetching details
};

DynamicModal.defaultProps = {
  buttonText: null,
  buttonAction: null,
};

export default DynamicModal;
