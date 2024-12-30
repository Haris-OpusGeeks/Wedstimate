import './Home.scss';
import {getCouples} from "../../../Redux/Reducers/profileSlice.js";
import {getListOfVendors} from "../../../Redux/Reducers/categorySlice.js";
import {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import useProfileSelector from "../../../Redux/Selectors/useProfileSelector.js";
import useCategorySelector from "../../../Redux/Selectors/useCategorySelector.js";
import {Link} from "react-router-dom";
import Loader from "../../../components/Loader.jsx";


export default function Home() {
    const dispatch = useDispatch();
    const {couples:{coupleList}} = useProfileSelector();
    const {vendorItem:{vendors}} = useCategorySelector();
    const date = new Date();
    const [filteredCouples, setFilteredCouples] = useState([]);

    // Filter only active couples and save to state
    useEffect(() => {
        if (coupleList) {
            const activeCouples = coupleList.filter(couple => couple.isActive);
            setFilteredCouples(activeCouples);
        }
    }, [coupleList]);

    useEffect(() => {
        const requestData = {
            pageSize: 100,
            pageNumber: 1,
        };
        dispatch(getListOfVendors(requestData));
        dispatch(getCouples());
        console.log(coupleList);
        console.log(vendors);
    }, [dispatch]);


  return (
    <>
        <div className="dashboardDiv">
            <h2>Dashboard</h2>
            <div className="dashboardBox">
                <div className="row">
                    <div className="col-lg-6">
                        <p className='blue'>{`${date.getDay()}-${date.getMonth()}-${date.getFullYear()}`}</p>
                        <h4>Welcome, Admin!</h4>
                        <p>Always stay updated on your dashboard</p>
                        <div className="flex">
                            <Link to={"/dashboard/vendors/new"} className="btn">Add Vendor</Link>
                            <Link to={"/dashboard/create-couples"} className="btn">Add Couple</Link>
                        </div>
                    </div>
                    <div className="col-lg-6">
                        <div className={"row justify-content-center"}>
                            <div className={"col-lg-5"}>
                                <h2>{coupleList ? filteredCouples.length : <Loader/>}</h2>
                                <h4>Total Couple Users</h4>
                                <Link className="btn" to={"/dashboard/couples"}>Details</Link>
                            </div>
                            <div className={"col-lg-5"}>
                                <h2>{vendors ? vendors.length : <Loader/>}</h2>
                                <h4>Total Vendor Users</h4>
                                <Link className="btn" to={"/dashboard/vendors"}>Details</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}
