import endPoints from "../Constants/endpoints";
import { fetchApi } from "../Utils/helper";

class LeadsServices {
  getListOfNewLeads = async (data) => {
    const response = await fetchApi({
      method: 'POST',
      endPoint: endPoints.GET_NEW_LEADS,
      token: true,
      data,
    });
    return response;
  };
  getListOfAllTimeLeads = async (data) => {
    const response = await fetchApi({
      method: 'POST',
      endPoint: endPoints.GET_ALL_TIME_LEADS,
      token: true,
      data,
    });
    return response;
  };
}

const leadsServices = new LeadsServices();
export default leadsServices;