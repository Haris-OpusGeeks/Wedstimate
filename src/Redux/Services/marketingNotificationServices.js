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
}

const marketingNotificationServices = new MarketingNotificationServices();
export default marketingNotificationServices;
