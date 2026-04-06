import React, { useEffect, useState } from 'react';
import googleplay from "../assets/website/googleplay.png";
import applestore from "../assets/website/applestore.png";

export default function Download() {
  const [showModal, setShowModal] = useState(true); // Modal visibility state

  useEffect(() => {
    if (showModal) {
      // Optionally, you can handle any additional logic here when modal opens
    }
  }, [showModal]);

  const closeModal = () => setShowModal(false); // Function to close modal

  return (
    <div className='DownloadSection' style={{ backgroundColor: "#0007", height:"100vh"}}>
      {/* Modal */}
      {showModal && (
        <div
          className="modal fade show"
          id="installAppModal"
          tabIndex="-1"
          aria-labelledby="installAppModalLabel"
          aria-hidden="true"
          style={{ display: 'block' }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="installAppModalLabel">
                  Install Our Mobile App
                </h5>
                {/* <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal} // Close modal
                  aria-label="Close"
                >
                  ✖
                </button> */}
              </div>
              <div className="modal-body">
                <p>
                  You've received a link to view a post shared through our app. To access this post and explore more, please install the app on your mobile device.<br></br><br></br>
                </p>
                <div className="d-flex gap-3">
                  <a
                    target="_blank"
                    href="https://play.google.com/store/apps/details?id=com.wedstimatemobileapp"
                  >
                    <img src={googleplay} alt="Google Play" width={150} />
                  </a>
                  <a
                    target="_blank"
                    href="https://apps.apple.com/us/app/wedstimate/id6712045315"
                  >
                    <img src={applestore} alt="App Store" width={150} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
