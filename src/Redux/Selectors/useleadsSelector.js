import {useSelector} from 'react-redux';

export default () => {
  const {newLeadsItem, allTimeLeadsItem, isLoading, isSuccess, isError} =
    useSelector(state => state?.leadsReducer);

  return {
    newLeadsItem,
    allTimeLeadsItem,
    isLoading,
    isSuccess,
    isError,
  };
};