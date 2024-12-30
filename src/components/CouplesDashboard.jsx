import { useState, useEffect } from 'react';
import useDashboardSelector from '../Redux/Selectors/useDashboardSelector';
import { useDispatch } from 'react-redux';
import {deleteEventPreference, getDashboardDetails, saveCurrentEvent, getListOfEvents} from '../Redux/Reducers/dashboardSlice';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import DynamicModal from '../components/DynamicModal';
import DynamicToast from './DynamicToast';
import defaultImg from '../assets/default.jpg';
import {base_url, convertUTCToLocal, createExcerpt} from '../Redux/Utils/helper';
import { Link } from "react-router-dom";

export default function CouplesDashboard() {
  ChartJS.register(Title, Tooltip, Legend, ArcElement);
  const dispatch = useDispatch();
  const { dashboardDetails, isSuccess, isError, isLoading, eventsItem:{events} } = useDashboardSelector();
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [modalData, setModalData] = useState(null);

  const handleShowToast = (message) => {
    setMessage(message);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 5000);
  };

  const saveCurrentEventButton = async() => {
    await dispatch(saveCurrentEvent());
  }

  useEffect(() => {
    dispatch(getListOfEvents());
    console.log(events);
    dispatch(getDashboardDetails()).unwrap().catch(error => {
      setError(error.message);
    });
  }, [dispatch]);

  useEffect(() => {
    if (isSuccess && dashboardDetails?.details?.id) {
      localStorage.setItem('currentEventId', dashboardDetails.details.id);
    }
  }, [isSuccess, dashboardDetails]);

  const handleModalOpen = (vendor, vendorId) => {
    setModalData({
      ...vendor,
      buttonText: 'Delete',
      buttonAction: () => handleDeleteEventPreference(vendor.eventDetailId),
    });
  };

  const handleModalClose = () => {
    setModalData(null);
  };

  const handleDeleteEventPreference = (vendorId) => {
    const requestData = { eventDetailId: vendorId };
    dispatch(deleteEventPreference(requestData))
        .unwrap()
        .then(() => {
          handleShowToast('Event preference deleted successfully');
          handleModalClose();
        })
        .catch(() => {
          handleShowToast('Failed to delete event preference');
        });
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{"No Event Found"}</div>;

  const { details } = dashboardDetails;
  console.log(details);
  const estimatedCost = dashboardDetails.estimatedCost || 0;
  const eventDate = details ? convertUTCToLocal(details.date) : '';
  const zipCode = details?.zipCode || 'N/A';
  const numGuests = details?.noOfGuest || 0;
  const vendorData = details?.data || [];
  const hasEventPassed = () => new Date(eventDate) < new Date();

  const pieChartData = {
    labels: details?.pieChart?.map(item => item.name) || [],
    datasets: [
      {
        label: 'Cost Distribution',
        data: details?.pieChart?.map(item => item.per) || [],
        backgroundColor: details?.pieChart?.map(item => item.color) || [],
        cutout: '70%',
      },
    ],
  };

  return (
      <div className='coupleDashboard'>
        <DynamicToast show={showToast} message={message} />
        {details ? (
            <>
              <div className="container-fluid">
                <div className="d-flex">
                  <div className="totalPrice">
                    <h2>${estimatedCost}</h2>
                    <p>Estimated Event Cost</p>
                    {events.length > 1 ? (
                      <button className="accordion-button collapsed" type="button"  data-bs-toggle="collapse"
                              data-bs-target="#flush-collapseOne" aria-expanded="false"
                              aria-controls="flush-collapseOne">See All Events</button>
                    ) : null}
                  </div>
                  <div className="detailsDiv">
                    <div className="row">
                      <div className="col-4">
                        <h4>{zipCode}</h4>
                        <p>Zip Code</p>
                      </div>
                      <div className="col-4">
                        <h4>{eventDate}</h4>
                        <p>Date of Event</p>
                      </div>
                      <div className="col-4">
                        <h4>{numGuests}</h4>
                        <p># of Guests</p>
                      </div>
                    </div>
                  </div>
                  <button className="btn save-event-btn" onClick={saveCurrentEventButton}>Close Event</button>
                </div>
                <div className="chart">
                  <div className="accordion accordion-flush" id="accordionFlushExample">
                    <div className="accordion-item">
                      <div id="flush-collapseOne" className="accordion-collapse collapse"
                           data-bs-parent="#accordionFlushExample">
                        <div className="accordion-body">
                          {events.map((item) => (
                              <div key={item.id} className="accordion-item-content d-flex column-gap-5">
                                <div className={"d-flex flex-column w-35"}>
                                  <h5>{item.name}</h5>
                                  <p>
                                    <strong>Date:</strong> {new Date(item.date).toLocaleDateString()}
                                  </p>
                                </div>
                                <div className={"d-flex flex-column w-35"}>
                                  <p>
                                    <strong>Guests:</strong> {item.noOfGuest}
                                  </p>
                                  <p>
                                    <strong>Zip Code:</strong> {item.zipCode}
                                  </p>
                                </div>
                                <div className={"d-flex w-30"}>
                                  {/* Conditionally render the "Open Event" button */}
                                  {item.id !== details.id && (
                                      <Link to={`/categories/couples/dashboard/${item.id}`} className={"btn"}>
                                        Open Event
                                      </Link>
                                  )}
                                </div>
                              </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  <Pie data={pieChartData} style={{maxHeight:400}}/>
                </div>
                <div className="deals">
                  <div className="row">
                    {vendorData.map((vendor) => (
                        <div key={vendor.id} className="col-lg-3">
                          <div className="vendorCard">
                            <img
                                src={vendor.vendorProfileImageUrl ? `${base_url}/${vendor.vendorProfileImageUrl}` : defaultImg}
                                alt={vendor.name}/>
                            <h5>{vendor.name}</h5>
                            <p>{createExcerpt(vendor.description, 50)}</p>
                            <p>Price: ${vendor.price.toFixed(2)}</p>
                            <p>Rating: {vendor.rating.toFixed(1)}</p>
                            {vendor.lat && vendor.lon && (
                                <p className='d-none'>Location: {vendor.lat.toFixed(2)}, {vendor.lon.toFixed(2)}</p>
                            )}
                            <button className="btn" onClick={() => handleModalOpen(vendor, vendor.id)}>SEE DETAILS
                            </button>
                          </div>
                        </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
        ) : (
            <div className='container-fluid'>
              <h1>No current event found. Please create a new event.</h1>
              <Link className="btn create-event-btn" to="/create-event">
                Create New Event
              </Link>
            </div>
        )}
        {modalData && (
            <DynamicModal
                show={!!modalData}
                onClose={handleModalClose}
                id={modalData.id}
                imageUrl={modalData.imageUrl}
                title={modalData.name}
                description={modalData.description}
                buttonText={modalData.buttonText}
                buttonAction={modalData.buttonAction}
            />
        )}
      </div>
  );
}
