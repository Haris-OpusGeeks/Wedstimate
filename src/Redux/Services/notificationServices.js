import endPoints from "../Constants/endpoints.js";
import {fetchApi} from "../Utils/helper.js";

class NotificationServices {
    getListOfNotifications = async params => {
        const response = await fetchApi({
            method: 'GET',
            endPoint: endPoints.GET_NOTIFICATIONS,
            token: true,
        });
        return response;
    };
}

const notificationServices = new NotificationServices();
export default notificationServices;