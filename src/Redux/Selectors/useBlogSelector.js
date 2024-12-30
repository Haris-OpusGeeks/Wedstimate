import {useSelector} from 'react-redux';

export default () => {
  const {
    blogs, 
    isSuccess, 
    isLoading, 
    isError,
    errorMessage,
    } = useSelector( state => state?.blogReducer);

  return {
    blogs,
    isSuccess,
    isLoading,
    errorMessage,
    isError,
  };
};