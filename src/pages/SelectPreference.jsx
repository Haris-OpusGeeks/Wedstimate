import { useDispatch } from "react-redux";
import { getCategoryList } from "../Redux/Reducers/categorySlice";
import useCategorySelector from "../Redux/Selectors/useCategorySelector";
import { useEffect, useState } from "react";
import { base_url } from "../Redux/Utils/helper";
import { useNavigate } from "react-router-dom"
import { addMyPreference } from "../Redux/Reducers/preferenceSlice";

export default function SelectPreference() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { categoryItem: { categories, isLoading } } = useCategorySelector();
    const [selectedCategory, setSelectedCategory] = useState(null); // Default value should be null

    useEffect(() => {
        dispatch(getCategoryList());
    }, [dispatch]);

    const selection = (id) => {
        setSelectedCategory(id);
        console.log(id); // Log the id instead of selectedCategory which will not be updated immediately
    };

    const addPreference = () => {
        return async() => {
            await localStorage.setItem("preference", selectedCategory)
            navigate('/select-package');
        }
    }

    const renderContent = () => {
        try {
            if (isLoading) {
                return (
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                );
            } else if (categories && categories.length > 0) {
                return (
                    <>
                        <div className="row">
                            {categories.map((category, index) => (
                                <div key={index} className={`col-lg-3 col-sm-6 ${selectedCategory === category.id ? 'selected' : ''}`} onClick={() => selection(category.id)}>
                                    <div className="imageBox">
                                        <img src={`${base_url}/${category.imageUrl}`} alt="" />
                                    </div>
                                    <div className="textBox">
                                        <h5>{category.name}</h5>
                                        <p>{category.count} {category.name} in your zip</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                );
            }
        } catch (error) {
            return <p>{error.message}</p>; // Use error.message to get the error description
        }
    };

    return (
        <>
            <div className="preferencePage">
                <div className="container-fluid">
                    <div className="blueBanner d-flex">
                        <div className="text">
                            <h2>What type of vendor are you?</h2>
                            <p>Select area of expertise</p>
                        </div>
                        <div className="buttonBox">
                            <button className={`btn ${selectedCategory ? "selected" : null}`} onClick={addPreference()}>CONTINUE</button>
                        </div>
                    </div>
                    <div className="preferences">
                        <h4>Our Service</h4>
                        <p>Wedstimate connects your wedding business with the couples that are the best match for you and your service. We curate leads for you by sending newly engaged couples that are looking for your type of service, in the price range you list, with your style and sensibilities, to your profile. We make it easy for them to find you and then we connect you.</p>
                        {renderContent()}
                    </div>
                </div>
            </div>
        </>
    );
}
