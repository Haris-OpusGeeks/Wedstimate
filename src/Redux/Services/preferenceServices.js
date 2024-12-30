import endPoints from "../Constants/endpoints";
import { fetchApi } from "../Utils/helper";

class PreferenceServices {
  getUniqueVisitorsCount = async () => {
    const response = await fetchApi({
      method: 'GET',
      endPoint: endPoints.GET_UNIQUE_VISITOR_COUNT,
      token: true,
    });
    return response;
  };

  getMyPreference = async () => {
    const response = await fetchApi({
      method: 'GET',
      endPoint: endPoints.PREFERENCE,
      token: true,
    });
    return response;
  };

  addMyPreference = async data => {
    const response = await fetchApi({
      method: 'POST',
      endPoint: endPoints.PREFERENCE,
      token: true,
      data,
    });
    return response;
  };

  updateMyPreference = async data => {
    const response = await fetchApi({
      method: 'PUT',
      endPoint: endPoints.PREFERENCE,
      token: true,
      data,
      formData: true,
    });
    return response;
  };
}

const preferenceServices = new PreferenceServices();
export default preferenceServices;