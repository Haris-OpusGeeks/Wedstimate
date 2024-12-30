import {useSelector} from 'react-redux';

export default () => {
  const {user, isLoading, isSuccess, isError, isFetching, couples, errorMessage} = useSelector(
    state => state?.profileReducer,
  );

  return {
    user,
    isLoading,
    isSuccess,
    isError,
    isFetching,
    couples,
    userErrorMessage : errorMessage
  };
};