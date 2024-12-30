import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { addMyPreference } from "../Redux/Reducers/preferenceSlice";
import { getListOfMembershipTypes } from "../Redux/Reducers/packageSlice";
import usePackageSelector from "../Redux/Selectors/usePackageSelector";
import { useNavigate } from "react-router-dom";

export default function SelectPackage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { membershipItem: { membership, isLoading } } = usePackageSelector();
    const [selectedMembership, setSelectedMembership] = useState(null);

    useEffect(() => {
        dispatch(getListOfMembershipTypes());
    }, [dispatch]);

    const addPreference = () => {
      return async() => {
        try {
          const requestData = {
            categoryId : localStorage.getItem('preference'),
            membershipTypeId : selectedMembership,
            zipCode : "12345"
          }
          await dispatch(addMyPreference(requestData));
          navigate('/edit-preference');
        } catch (error) {
          console.log(error);
        }
      }
    }

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
                            {plan.name} - ${plan.price} for {plan.noOfLeads} leads
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
                        {renderMembership()} {/* Correctly call the function */}
                        <div className="container-fluid">
                            <button className={`btn ${selectedMembership ? "" : "disabled"}`} onClick={addPreference()}>
                                CONTINUE
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
