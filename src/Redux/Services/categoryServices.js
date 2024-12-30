import endPoints from "../Constants/endpoints";
import { fetchApi } from "../Utils/helper";


class CategoryServices {
  getCategoryList = async () => {
    const response = await fetchApi({
      method: 'GET',
      endPoint: endPoints.GET_CATEGORIES,
      token: true,
    });
    return response;
  };
  getCategoriesPreferencesList = async id => {
    const response = await fetchApi({
      method: 'GET',
      endPoint: `${endPoints.GET_CATEGORIES_PREFERENCES}/${id}`,
      token: true,
    });
    return response;
  };
  getListOfVendors = async data => {
    const response = await fetchApi({
      method: 'POST',
      endPoint: `${endPoints.VENDORS}/noauth`,
      token: true,
      data,
    });
    return response;
  };
  getVendorReviews = async id => {
    const response = await fetchApi({
      method: 'GET',
      endPoint: `${endPoints.VENDORS}/${id}/${endPoints.REVIEWS}`,
      token: true,
    });
    return response;
  };
  addVendorPreferencesInEvent = async data => {
    const response = await fetchApi({
      method: 'POST',
      endPoint: endPoints.ADD_VENDORS_PREFRENCES,
      token: true,
      data,
    });
    return response;
  };
  getVendorDetails = async id => {
    const response = await fetchApi({
      method: 'GET',
      endPoint: `${endPoints.VENDORS}/${id}`,
      token: true,
    });
    return response;
  };
  noAuthGetVendorDetails = async id => {
    const response = await fetchApi({
      method: 'GET',
      endPoint: `${endPoints.NOAUTH_VENDOR_DETAIL}/${id}/noauth`,
      tenant: 'root'
    });
    return response;
  };
}

const categoryServices = new CategoryServices();
export default categoryServices;