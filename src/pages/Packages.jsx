import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPackageInEvent, getListOfPackages } from '../Redux/Reducers/packageSlice';
import usePackageSelector from '../Redux/Selectors/usePackageSelector';
import DynamicToast from '../components/DynamicToast';
// import { messageHandlerSet } from '../Redux/Reducers/messageHandlerSlice';
// import { TOAST_STATUS } from '../Redux/Constants/enum';

export default function Packages() {
  const dispatch = useDispatch();
  const eventid = localStorage.getItem('currentEventId');
  const [showToast, setShowToast] = useState(false);
    const [message, setMessage] = useState('');
  const {
      packageItem: {isLoading, packages},
  } = usePackageSelector();
  const handleShowToast = (message) => {
    setMessage(message);
    setShowToast(true);
    // Optionally hide the toast after a certain time
    setTimeout(() => {
      setShowToast(false);
    }, 5000); // Hide toast after 1 seconds
  };

  useEffect(() => {
    dispatch(getListOfPackages({})); // Add any necessary params
  }, [dispatch]);

  const onDone = (message) => {
    handleShowToast(message);
};

  const onAddPress = (packageDetails) => {
    return async() => {
        if (localStorage.getItem('currentEventId')) {
            try {
                const requestData = {
                  packageId: packageDetails?.id,
                  eventId: eventid,
                };
                const response = await dispatch(addPackageInEvent(requestData));
                if (response.meta.requestStatus === "fulfilled") {
                    onDone('Package Added Successfully');
                } else {
                    console.log(requestData)
                    console.error('Unexpected Response:', response);
                }
                console.log(packageDetails);
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("not added");
        }

    }
};

  if (isLoading) return <p>Loading...</p>;
  return (
    <div className="packagesPage">
      <DynamicToast show={showToast} message={message} />
      <div className="container-fluid">
        <h2>Available Packages</h2>
        <p>Select from the available packages below:</p>
        <div className="row">
          {packages.map(pkg => (
            <div key={pkg.id} className="col-lg-4 col-sm-12">
              <h5>{pkg.name}</h5>
              <p className='description'>{pkg.description}</p>
              {pkg.packageDetails.map(detail => (
                <div key={detail.id}>
                  <h6 className='vendorName'>{detail.name}</h6>
                  {/* <img src={detail.imagePath || 'default-image-path.png'} alt={detail.name} /> */}
                  {/*<p>{detail.description}</p>*/}
                  <p>Price: ${detail.price}</p>
                </div>
              ))}
              <p className='total'>Price: ${pkg.price}</p>
              <button className='btn' onClick={onAddPress(pkg)}>ADD TO DASHBOARD</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
