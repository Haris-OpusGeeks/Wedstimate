import {useSelector} from 'react-redux';

export default () => {
  const {dashboardDetails, isSuccess, isError, isLoading, eventsItem} = useSelector(
    state => state?.dasboardReducer,
  );

  return {
    dashboardDetails,
    isSuccess,
    isError,
    isLoading,
    eventsItem
  };
};