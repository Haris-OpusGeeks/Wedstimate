import {useSelector} from 'react-redux';

export default () => {
  const {packageItem, isSuccess, isError, isLoading, membershipItem} = useSelector(
    state => state?.packageReducer,
  );

  return {
    isLoading,
    packageItem,
    membershipItem,
    isSuccess,
    isError,
  };
};