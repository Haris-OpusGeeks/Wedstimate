import endPoints from '../Constants/endpoints';
import { fetchApi } from '../Utils/helper';


class AuthServices {
  registerCouples = async data => {
    const response = await fetchApi({
      method: 'POST',
      endPoint: endPoints.COUPLES_SIGN_UP,
      data,
      tenant: 'root',
    });
    return response;
  };
  registerCouplesBulk = async data => {
    const response = await fetchApi({
      method: 'POST',
      endPoint: endPoints.BULK_COUPLES_SIGN_UP,
      data,
      formData: true,
      token: true,
    });
    return response;
  };
  registerVendor = async data => {
    const response = await fetchApi({
      method: 'POST',
      endPoint: endPoints.VENDOR_SIGN_UP,
      data,
      tenant: 'root',
    });
    return response;
  };
  registerVendorByAdmin = async data => {
    const response = await fetchApi({
      method: 'POST',
      endPoint: endPoints.ADMIN_VENDOR_SIGN_UP ,
      data,
      formData: true,
      token: true,
    });
    return response;
  };
  loginUser = async data => {
    const response = await fetchApi({
      method: 'POST',
      endPoint: endPoints.LOGIN,
      data,
      tenant: 'root',
    });
    return response;
  };
  forgotPassword = async data => {
    const response = await fetchApi({
      method: 'POST',
      endPoint: endPoints.FORGOT_PASSWORD,
      data,
      tenant: 'root',
    });
    console.log(response);
    return response;
  };
}

const authServices = new AuthServices();
export default authServices;