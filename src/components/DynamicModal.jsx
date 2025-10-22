import PropTypes from 'prop-types';
import { base_url } from '../Redux/Utils/helper';
import defaultImg from '../assets/default.jpg';
import starImage from '../assets/Star-1.png';
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
        dispatch(getVendorsReviews(id)).then((response) => {
          setReviews(response.payload);
        }); 
        console.log("reviews",reviews);
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
        <MapContainer center={position} zoom={13} style={{ height: "200px", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={position} icon={DefaultIcon} />
        </MapContainer>
    );
  };
const ReviewsList = ({ reviews }) => {
  // helper: generate random light color
  const getRandomLightColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 70%, 80%)`; // pastel shades
  };

  return (
    reviews?.length > 0 && (
reviews?.length > 0 && (
      <Swiper spaceBetween={10} slidesPerView={3} modules={[Navigation]} navigation>
        {reviews.map((review, index) => {
          const hasImage = !!review.coupleImageUrl;
          const firstLetter = review.coupleName?.charAt(0)?.toUpperCase() || "?";
          const bgColor = getRandomLightColor();

          // local state for read more/less per review
          const [isExpanded, setIsExpanded] = useState(false);

          return (
            <SwiperSlide key={index}>
              <div className="mainreviewCard" key={review.id}>
                {/* Reviewer Info */}
                <div className="reviewerInfo d-flex gap-10">
                  <div className="reviewerImage">
                    {hasImage ? (
                      <img
                        src={`${base_url}/${review.coupleImageUrl}`}
                        alt="Couple"
                        className="w-100"
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: 45,
                          height: 45,
                          borderRadius: "50%",
                          backgroundColor: bgColor,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: "bold",
                          fontSize: "18px",
                          color: "#fff",
                          textTransform: "uppercase",
                        }}
                      >
                        {firstLetter}
                      </div>
                    )}
                  </div>

                  <div className="reviewerName">
                    <h5>{review.coupleName}</h5>
                    <h6>
                      Sent on{" "}
                      {review.date
                        ? review.date.split("T")[0].split("-").reverse().join("-")
                        : ""}
                    </h6>
                  </div>
                </div>

                {/* Rating */}
                <div className="reviewRating d-flex gap-10">
                  <RatingDynamic rating={review.rating} />
                  <span>{review.rating === 5 ? `${review.rating}.0` : review.rating}</span>
                </div>

                {/* Review content with Read More */}
                <div className="contentBox">
                  <p className={`reviewText ${isExpanded ? "expanded" : "collapsed"}`}>
                    {review.review}
                  </p>

                  {review.review?.length > 150 && ( // show button only for long reviews
                    <button
                      className="readMoreBtn"
                      onClick={() => setIsExpanded(!isExpanded)}
                    >
                      {isExpanded ? "Read less" : "Read more"}
                    </button>
                  )}
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    )
  )
  );
};


// console.log("reviews>>>>", reviews.length);
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
                
                <button type="button" className="close btn ms-auto" onClick={onClose} aria-label="Close">
                  <p aria-hidden="true">&times;</p>
                </button>
              </div>
              <div className="modal-body">
                <div className="row w-100">
                  <div className="col-md-8 vendorContent">
                    <h3 className="modal-title">{details ? details.name : null}</h3>
                    <h6 class="modalAddress">{details ? details.address : null}</h6>
                    <p>{details ? details.description : null}</p></div>
                  <div className="col-md-4">
                      <div className='ratingBox d-flex align-items-center'>
                        <img src={starImage}/>
                        <h4>{details?.rating ? parseFloat(details.rating.toFixed(1)) : 0}</h4>
                      </div>
                      <h6 class="ratingCount">{reviews.length} Reviews</h6>
                      <h2 className='text-end'>Location</h2>
                      <MapDisplay position={position} />
                  </div>
                </div>
                <div className="row w-100 reviewRow">
                  <div className="col-md-4">
                    <div className="vendorPrice">
                      <h4>${details ? details.price : null}</h4>
                      <p className='text-start'>*Prices may vary based on time, date, and circumstances.</p>
                      <div className="btnDiv">
                        <button type="button" className="btn add" onClick={createChat}>Message Vendor</button>
                        <button type="button" className="btn add" onClick={addVendorPreference}>Add To Dashboard</button>
                      </div>
                    </div>
                    
                  </div>
                  <div className="col-md-8">
                    <ReviewsList reviews={reviews} />
                  </div>
                </div>
                
                
              </div>
              {/* <div className="modal-footer">
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
              </div> */}
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
