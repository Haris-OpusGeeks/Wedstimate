import {useSelector} from 'react-redux';

export default () => {
    const {notifications, isLoading, isSuccess, isError, errorMessage} =
        useSelector(state => state?.notificationReducer);

    return {
        notifications,
        isLoading,
        isSuccess,
        isError,
        errorMessage
    };
};