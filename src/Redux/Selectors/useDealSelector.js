import {useSelector} from 'react-redux';

export default () => {
  const {
    dealsItem, 
    isSuccess, 
    isLoading, 
    isError
    } = useSelector( state => state?.dealReducer);

  return {
    dealsItem,
    isSuccess,
    isLoading,
    isError,
  };
};