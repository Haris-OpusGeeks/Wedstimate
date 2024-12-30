import endPoints from "../Constants/endpoints";
import { fetchApi } from "../Utils/helper";


class DashboardServices {
  getListOfEvents = async () => {
    const response = await fetchApi({
      method: 'GET',
      endPoint: endPoints.EVENTS,
      token: true,
    });
    return response;
  };

  getEventDetailsById = async id => {
    const response = await fetchApi({
      method: 'GET',
      endPoint: `${endPoints.EVENTS}/${id}`,
      token: true,
    });
    return response;
  };

  getDashboardDetails = async () => {
    const response = await fetchApi({
      method: 'GET',
      endPoint: endPoints.GET_DASHBOARD_DETAILS,
      token: true,
    });
    return response;
  };
  saveCurrentEvent = async () => {
    const response = await fetchApi({
      method: 'POST',
      endPoint: endPoints.SAVE_CURRENT_EVENT,
      token: true,
    });
    return response;
  };
  deleteEventPreference = async data => {
    const response = await fetchApi({
      method: 'DELETE',
      endPoint: endPoints.DELETE_EVENT_PREFERENCE,
      token: true,
      data,
    });
    return response;
  };
}

const dashboardServices = new DashboardServices();
export default dashboardServices;