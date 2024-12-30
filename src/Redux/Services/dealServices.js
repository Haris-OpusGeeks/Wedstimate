import endPoints  from '../Constants/endpoints';
import { fetchApi } from '../Utils/helper';

class DealServices {
  getListOfDeals = async () => {
    const response = await fetchApi({
      method: 'GET',
      endPoint: endPoints.DEALS,
      token: true,
    });
    return response;
  };
  addDealInEvent = async data => {
    const response = await fetchApi({
      method: 'POST',
      endPoint: endPoints.ADD_DEAL,
      token: true,
      data,
    });
    return response;
  };
  createDeal = async data => {
    const response = await fetchApi({
      method: 'POST',
      endPoint: endPoints.DEALS,
      token: true,
      data,
      formData: true,
    });
    return response;
  };
  getDealDetailsById = async id => {
    const response = await fetchApi({
      method: 'GET',
      endPoint: `${endPoints.DEALS}/${id}`,
      token: true,
    });
    return response;
  };
  getDealReviewsById = async id => {
    const response = await fetchApi({
      method: 'GET',
      endPoint: `${endPoints.DEALS}/${id}/${endPoints.REVIEWS}`,
      token: true,
    });
    return response;
  };
}

const dealServices = new DealServices();
export default dealServices;