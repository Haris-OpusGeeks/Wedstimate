import vendorImage from "../../../../assets/vendorimg.png";
import {Link, useParams} from "react-router-dom";
import defaultImg from '../../../../assets/default.jpg';
import './VendorReviews.scss'
import RatingDynamic from "../../../../components/RatingDynamic.jsx";
import {getVendorDetails, getVendorsReviews} from "../../../../Redux/Reducers/categorySlice.js";
import {useDispatch} from "react-redux";
import useCategorySelector from "../../../../Redux/Selectors/useCategorySelector.js";
import {useEffect} from "react";
import {base_url} from "../../../../Redux/Utils/helper.js";
import {deleteReview} from "../../../../Redux/Reducers/chatSlice.js";

function VendorReviews() {
    const {id} = useParams();
    const dispatch = useDispatch();
    const {vendorReviewsItem:{reviews}, detailsItem:{details}} = useCategorySelector();
    useEffect(() => {
        dispatch(getVendorsReviews(id));
        dispatch(getVendorDetails(id));
        console.log(reviews);
    }, [dispatch]);

    const deleteVendorReview = async (reviewId) => {
        console.log(reviewId);
        const requestData = {
            id: reviewId
        };
        await dispatch(deleteReview({requestData}))
            .then(async ()=>{
                window.location.reload();
            })
    };

    return (
        <>
            <div className="vendorReviews">
                <div className="container-fluid">
                    {/*<h2>Vendor Profile</h2>*/}
                    <div className="profileBox">
                        <div className="row">
                            <div className="col-lg-3">
                                <div className={"reviewDetail"}>
                                    <h2>{reviews.length} Reviews</h2>
                                    <h4>{details ? details.rating.toFixed() : null} Rating</h4>
                                </div>
                                <div className={"vendorDetail"}>
                                    <img src={details && details.imageUrl? `${base_url}/${details.imageUrl}` : vendorImage} alt=""/>
                                    <h5>{details ? details.name : null}</h5>
                                </div>
                                <div className={"reviewButton"}>
                                    <Link to={`/dashboard/vendors/edit/reviews/add/${id}`} onClick={async ()=>{await localStorage.setItem('vendor', JSON.stringify(details));}} className={"btn"}>Add Review</Link>
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div className={"d-flex flex-column"}>
                                    {/* Map through reviews array */}
                                    {reviews?.map((reviewItem, index) => (
                                        <div key={reviewItem.id} className={"review"}>
                                            <div className={"reviewDetail"}>
                                                {/*<button className={"btn closeBtn"}><i className="bi bi-x"></i></button>*/}
                                                <div className={"d-flex flex-column"}>
                                                    <div className={"reviewBody d-flex"}>
                                                        <div className={"coupleImg"}>
                                                            <img
                                                                src={reviewItem.coupleImageUrl ? `${base_url}/${reviewItem.coupleImageUrl}` : defaultImg}
                                                                alt={`${reviewItem.coupleName}`}
                                                            />
                                                        </div>
                                                        <div className={"coupleReview"}>
                                                            <h6>{reviewItem.coupleName}</h6>
                                                            <div className={"d-flex"}>
                                                                <RatingDynamic rating={reviewItem.rating || 0} />
                                                                <p>{reviewItem.rating || 'No Rating'}</p>
                                                            </div>
                                                            {/* Show review content if available */}
                                                            {reviewItem.review && (
                                                                <h5>{reviewItem.review}</h5>
                                                            )}
                                                            <p>Sent On: {new Date(reviewItem.date).toLocaleDateString()}</p>
                                                        </div>
                                                    </div>
                                                    <div className={"reviewFooter d-flex justify-content-end"}>
                                                        <button className={"btn btn-danger"}
                                                                onClick={() => deleteVendorReview(reviewItem.id)}>DELETE
                                                        </button>
                                                        {/*<div className={"share"}>*/}
                                                        {/*    <div className={"d-flex"}>*/}
                                                        {/*        <p>Share it On:</p>*/}
                                                        {/*        <div className={"socialMedia"}>*/}
                                                        {/*            <a href={"#"}>*/}
                                                        {/*                <i className="bi bi-twitter-x"></i>*/}
                                                        {/*            </a>*/}
                                                        {/*            <a href={"#"}>*/}
                                                        {/*                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512">*/}
                                                        {/*                    <path*/}
                                                        {/*                        d="M80 299.3V512H196V299.3h86.5l18-97.8H196V166.9c0-51.7 20.3-71.5 72.7-71.5c16.3 0 29.4 .4 37 1.2V7.9C291.4 4 256.4 0 236.2 0C129.3 0 80 50.5 80 159.4v42.1H14v97.8H80z"/>*/}
                                                        {/*                </svg>*/}
                                                        {/*            </a>*/}
                                                        {/*        </div>*/}
                                                        {/*    </div>*/}
                                                        {/*    <button className={"btn replyBtn"}>Reply</button>*/}
                                                        {/*</div>*/}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default VendorReviews;