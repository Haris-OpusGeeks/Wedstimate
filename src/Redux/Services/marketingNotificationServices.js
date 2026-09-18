import endPoints from '../Constants/endpoints.js';
import {fetchApi} from '../Utils/helper.js';

class MarketingNotificationServices {
  getListOfMarketingNotifications = async params => {
    const response = await fetchApi({
      method: 'GET',
      endPoint: endPoints.MARKETING_NOTIFICATIONS,
      token: true,
      params,
    });
    return response;
  };

  createMarketingNotification = async data => {
    const response = await fetchApi({
      method: 'POST',
      endPoint: endPoints.MARKETING_NOTIFICATIONS,
      token: true,
      data,
    });
    return response;
  };

  updateMarketingNotification = async (id, data) => {
    const response = await fetchApi({
      method: 'PUT',
      endPoint: `${endPoints.MARKETING_NOTIFICATIONS}/${id}`,
      token: true,
      data,
    });
    return response;
  };

  deleteMarketingNotification = async id => {
    const response = await fetchApi({
      method: 'DELETE',
      endPoint: `${endPoints.MARKETING_NOTIFICATIONS}/${id}`,
      token: true,
    });
    return response;
  };
}

const marketingNotificationServices = new MarketingNotificationServices();
export default marketingNotificationServices;
