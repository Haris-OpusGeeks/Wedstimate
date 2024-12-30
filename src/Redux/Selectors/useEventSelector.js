import {useSelector} from 'react-redux';

export default () => {
    const {eventsItem, isSuccess, isError, isLoading, eventDetails} = useSelector(
        state => state?.eventReducer,
    );

    return {
        eventsItem,
        eventDetails,
        isSuccess,
        isError,
        isLoading,
    };
};