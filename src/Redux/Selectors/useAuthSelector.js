import {useSelector} from 'react-redux';

export default () => {
  const {
    accessToken,
    isLoggedIn,
    isLoading,
    isSuccess,
    isError,
    userRole,
    errorMessage,
  } = useSelector(state => state?.coupleLogin);

  return {
    accessToken,
    isLoggedIn,
    isLoading,
    isSuccess,
    isError,
    userRole,
    errorMessage,
  };
};