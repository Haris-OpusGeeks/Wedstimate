import {useSelector} from 'react-redux';

export default () => {
  const {
    categoryItem,
    categoryPreferencesItem,
    isSuccess,
    isError,
    vendorItem,
    isLoading,
    vendorReviewsItem,
    detailsItem,
    errorMessage,
  } = useSelector(state => state?.categoryData);

  return {
    categoryItem,
    vendorItem,
    isLoading,
    categoryPreferencesItem,
    vendorReviewsItem,
    isSuccess,
    isError,
    errorMessage,
    detailsItem
  };
};