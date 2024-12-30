import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategoryList } from '../Redux/Reducers/categorySlice';
import { Link } from 'react-router-dom';
import { base_url } from '../Redux/Utils/helper';
export default function WeddingBuilding() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryList());

  }, [dispatch]);

  // Select the category data from the Redux store
  const categoryItem = useSelector(state => state.categoryData.categoryItem);

  const renderContent = () => {
    try {
      if (categoryItem.isLoading) {
        return <p>Loading...</p>;
      }
  
      if (categoryItem.categories.length > 0) {
        return (
          <div className="VendorTypesDiv">
            <div className="container-fluid">
              <div className="row">
                {categoryItem.categories.map((category, index) => (
                  <div key={index} className="col-sm-12 col-lg-3">
                    <div className="image">
                      <img src={`${base_url}/${category.imageUrl}`} alt={category.name} />
                    </div>
                    <h4>{category.name}</h4>
                    <p>{category.count} {category.name} in your zip</p>
                    <Link
                      className="btn"
                      to={{
                        pathname: `/categories/build-wedding/category/${category.id}`, // Pass the category ID
                        params : {categoryPreferences: category.id},
                        state: { categoryName: category.name } // Pass the category name
                      }}
                    >
                      SEARCH
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      }
    } catch (error) {
      return <p>error</p>
    }

    // return <p>No categories available</p>;
  };

  return (
    <div className="weddingBuilding">
      <h2>Vendors Types</h2>
      <p>Choose the vendor types you need for your wedding</p>
      {renderContent()}
    </div>
  );
}
