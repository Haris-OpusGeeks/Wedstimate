import { TOAST_STATUS } from "../Constants/enum";
import { DESTROY_SESSION } from "../Constants/types";
import { messageHandlerSet } from "../Reducers/messageHandlerSlice";

const NETWORK_ERROR = 'Network Error';
const UNAUTHENTICATED = 'Authentication Failed.';

export const errorHandler = (error, dispatch) => {
  const errorMessage = error?.response?.data?.exception || 'An error occurred';

  if (error.message === NETWORK_ERROR) {
    dispatch(
      messageHandlerSet({message: NETWORK_ERROR, status: TOAST_STATUS.INFO}),
    );
    return NETWORK_ERROR;
  }
  if (errorMessage === UNAUTHENTICATED && error.response.status === 401) {
    dispatch(
      messageHandlerSet({
        message: `${UNAUTHENTICATED} Please Login Again`,
        status: TOAST_STATUS.ERROR,
      }),
    ),
      dispatch({type: DESTROY_SESSION});
    return UNAUTHENTICATED;
  }
  dispatch(
    messageHandlerSet({message: errorMessage, status: TOAST_STATUS.ERROR}),
  );
  return errorMessage;
};