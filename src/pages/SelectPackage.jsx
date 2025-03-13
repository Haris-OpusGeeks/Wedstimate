import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addMyPreference } from "../Redux/Reducers/preferenceSlice";
import { getListOfMembershipTypes } from "../Redux/Reducers/packageSlice";
import usePackageSelector from "../Redux/Selectors/usePackageSelector";
import { useNavigate } from "react-router-dom";
import googleplay from "../assets/website/googleplay.png";
import applestore from "../assets/website/applestore.png";

export default function SelectPackage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { membershipItem: { membership, isLoading } } = usePackageSelector();
  const [selectedMembership, setSelectedMembership] = useState(null);

  useEffect(() => {
    dispatch(getListOfMembershipTypes());
  }, [dispatch]);

  const addPreference = () => {
    return async () => {
      try {
        if (selectedMembership) {
          // Open the modal using Bootstrap's JavaScript API
          const modal = new bootstrap.Modal(document.getElementById('installAppModal'));
          modal.show();
        }
      } catch (error) {
        console.log(error);
      }
    };
  };

  const handleSelection = (id) => {
    setSelectedMembership(id);
  };

  const renderMembership = () => {
    try {
      if (isLoading) {
        return (
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        );
      } else if (membership && membership.length > 0) {
        return membership.map((plan) => (
          <div className="form-check" key={plan.id}>
            <input
              className="form-check-input"
              type="radio"
              name="membership"
              id={plan.id}
              checked={selectedMembership === plan.id}
              onChange={() => handleSelection(plan.id)}
            />
            <label className="form-check-label" htmlFor={plan.id}>
              {plan.id === "58717190-5963-447e-9af8-551cecc33f11"
                ? `${plan.name} - $${plan.price} for 5 guaranteed leads and access to all couples that viewed your profile.`
                : `${plan.name} - $${plan.price} for ${plan.noOfLeads} leads`}
            </label>
          </div>
        ));
      } else {
        return <p>No membership plans available</p>;
      }
    } catch (error) {
      console.log(error);
      return <p>Something went wrong</p>;
    }
  };

  return (
    <>
      <div className="paymentPage">
        <div className="container-fluid">
          <div className="blueBanner d-flex">
            <h2>Choose your plan</h2>
          </div>
          <div className="packages">
            {renderMembership()}
            <div className="container-fluid">
              <button
                className={`btn ${selectedMembership ? "" : "disabled"}`}
                onClick={addPreference()}
                data-bs-toggle="modal"
                data-bs-target="#installAppModal"
              >
                CONTINUE
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bootstrap Modal */}
      <div
        className="modal fade"
        id="installAppModal"
        tabIndex="-1"
        aria-labelledby="installAppModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="installAppModalLabel">
                Install Our Mobile App
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                ✖
              </button>
            </div>
            <div className="modal-body">
              <p>
                You have to install our mobile app and purchase our package to
                continue.
              </p>
              <div className="d-flex gap-3">
                <a
                  target="_blank"
                  href="https://play.google.com/store/apps/details?id=com.wedstimatemobileapp"
                >
                  <img src={googleplay} alt="" width={150} />
                </a>
                <a
                  target="_blank"
                  href="https://apps.apple.com/us/app/wedstimate/id6712045315"
                >
                  <img src={applestore} alt="" width={150} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}