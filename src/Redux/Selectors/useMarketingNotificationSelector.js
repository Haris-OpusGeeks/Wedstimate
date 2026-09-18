import {useSelector} from 'react-redux';

export default () => {
  const {
    notifications,
    isLoading,
    isSuccess,
    isError,
    isSaving,
    isDeleting,
    errorMessage,
  } =
    useSelector(state => state?.marketingNotificationReducer);

  return {
    notifications,
    isLoading,
    isSuccess,
    isError,
    isSaving,
    isDeleting,
    errorMessage,
  };
};
