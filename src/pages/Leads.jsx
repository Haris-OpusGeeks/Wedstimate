import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {getListOfAllTimeLeads, getListOfNewLeads} from '../Redux/Reducers/leadsSlice';
import { useEffect } from "react";
import useleadsSelector from "../Redux/Selectors/useleadsSelector";
import {convertUtcToLocalTime} from "../Redux/Utils/helper.js";
import '../App.scss';

export default function Leads() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { newLeadsItem, allTimeLeadsItem, isSuccess, isLoading } = useleadsSelector();

    useEffect(() => {
        // Fetch both types of leads when the component mounts
        dispatch(getListOfNewLeads({}));
        dispatch(getListOfAllTimeLeads({}));
    }, [dispatch]);

    const openChat = (id) => {
      return () => {
        navigate(`/categories/chat/${id}`);
      }
    }

    const renderLeads = (leads) => (
        leads.map((lead) => (
            <div className="couple" key={lead.id}>
                <div className="d-block">
                  <h4>{lead.name}</h4>
                  <p>{lead.email}</p>
                  <p>Wedding Date : {convertUtcToLocalTime(lead.date)}</p>
                  <p>ZIP Code : {lead.zipCode}</p>
                </div>
                <div className="d-block">
                  <button className="btn" onClick={openChat(lead.id)}>
                  <i className="bi bi-chat"></i>
                  </button>
                </div>
            </div>
        ))
    );

    const renderLoading = () => (
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    );

    return (
        <>
            <div className="leadsPage">
                <div className="container-fluid">
                    <div className="blueBanner">
                        <h2>See Your Leads</h2>
                    </div>
                    <div className="leads">
                        <div className="accordion" id="accordionExample">
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button
                                        className="accordion-button"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseOne"
                                        aria-expanded="true"
                                        aria-controls="collapseOne"
                                    >
                                        This Month's Leads
                                    </button>
                                </h2>
                                <div
                                    id="collapseOne"
                                    className="accordion-collapse collapse show"
                                    data-bs-parent="#accordionExample"
                                >
                                    <div className="accordion-body">
                                        {isLoading ? renderLoading() : renderLeads(newLeadsItem.leads)}
                                    </div>
                                </div>
                            </div>
                            <div className="accordion-item">
                                <h2 className="accordion-header">
                                    <button
                                        className="accordion-button collapsed"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseTwo"
                                        aria-expanded="false"
                                        aria-controls="collapseTwo"
                                    >
                                        All Time Leads
                                    </button>
                                </h2>
                                <div
                                    id="collapseTwo"
                                    className="accordion-collapse collapse"
                                    data-bs-parent="#accordionExample"
                                >
                                    <div className="accordion-body">
                                        {isLoading ? renderLoading() : renderLeads(allTimeLeadsItem.leads)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
