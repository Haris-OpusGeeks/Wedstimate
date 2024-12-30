import endPoints from "../Constants/endpoints";
import { fetchApi } from "../Utils/helper";


class ChatServices {
  getMessagesList = async data => {
    const response = await fetchApi({
      method: 'GET',
      endPoint: endPoints.CHAT,
      token: true,
    });
    return response;
  };

  getChatMessages = async id => {
    const response = await fetchApi({
      method: 'GET',
      endPoint: `${endPoints.CHAT}/${id}`,
      token: true,
    });
    return response;
  };

  markMessagesRead = async id => {
    const response = await fetchApi({
      method: 'PATCH',
      endPoint: `${endPoints.CHAT}/${id}/${endPoints.MARK_MESSAGES_READ}`,
      token: true,
    });
    return response;
  };

  sendMessage = async data => {
    const response = await fetchApi({
      method: 'POST',
      endPoint: endPoints.SEND_MESSAGE,
      token: true,
      data,
    });
    return response;
  };

  createRoomForDeal = async data => {
    const response = await fetchApi({
      method: 'POST',
      endPoint: endPoints.CREATE_ROOM_FOR_DEAL,
      token: true,
      data,
    });
    return response;
  };

  createRoomForVendorPreference = async data => {
    const response = await fetchApi({
      method: 'POST',
      endPoint: endPoints.CREATE_ROOM_FOR_VENDOR_PREFERENCE,
      token: true,
      data,
    });
    return response;
  };

  addReview = async data => {
    const response = await fetchApi({
      method: 'POST',
      endPoint: endPoints.ADD_REVIEW,
      token: true,
      data,
    });
    return response;
  };

  adminAddReview = async data => {
    const response = await fetchApi({
      method: 'POST',
      endPoint: endPoints.ADMIN_ADD_REVIEW,
      token: true,
      data,
    });
    return response;
  };

  deleteReview = async data => {
    const response = await fetchApi({
      method: 'DELETE',
      endPoint: endPoints.ADD_REVIEW,
      token: true,
      data,
    });
    return response;
  };
}

const chatServices = new ChatServices();
export default chatServices;