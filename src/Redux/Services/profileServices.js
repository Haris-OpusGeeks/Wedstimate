import endPoints from "../Constants/endpoints";
import { fetchApi } from "../Utils/helper";


class ProfileServices {
  getUserProfile = async () => {
    const response = await fetchApi({
      method: 'GET',
      endPoint: endPoints.GET_USER_PROFILE,
      token: true,
    });
    return response;
  };
  updateUserProfile = async data => {
    const response = await fetchApi({
      method: 'POST',
      endPoint: endPoints.UPDATE_USER_PROFILE,
      token: true,
      data,
      formData: true,
    });
    return response;
  };
  changePassword = async data => {
    const response = await fetchApi({
      method: 'PUT',
      endPoint: endPoints.CHANGE_PASSWORD,
      token: true,
      data,
    });
    return response;
  };
  deleteVendorUser = async data => {
    const response = await fetchApi({
      method: 'POST',
      endPoint: `${endPoints.DELETE_VENDOR_ACCOUNT}?userId=${data.id}`,
      token: true,
      data,
      // formData: true,
    });
    return response;
  };
  deleteCoupleUser = async data => {
    const response = await fetchApi({
      method: 'POST',
      endPoint: `${endPoints.DELETE_COUPLE_ACCOUNT}?userId=${data.userId}`,
      token: true,
      data,
      // formData: true,
    });
    return response;
  };
  getAllCouples = async data  => {
    if (data) {
      console.log(data);
      if(data.zipCode) {
        const response = await fetchApi({
          method: 'GET',
          endPoint: `${endPoints.COUPLES}?zipCode=${data.zipCode}`,
          token: true,
        });
        return response;
      } else if(data.vendorId) {
        const response = await fetchApi({
          method: 'GET',
          endPoint: `${endPoints.COUPLES}?vendorId=${data.vendorId}`,
          token: true,
        });
        return response;
      }
    } else {
      const response = await fetchApi({
        method: 'GET',
        endPoint: endPoints.COUPLES,
        token: true,
      });
      return response;
    }
  };
  contactUs = async data => {
    const response = await fetchApi({
      method: 'PUT',
      endPoint: endPoints.CONTACT_US,
      token: true,
      data,
    });
    return response;
  };
  sendEmail = async data => {
    const response = await fetchApi({
      method: 'PUT',
      endPoint: endPoints.SEND_EMAIL,
      token: true,
      data,
    });
    return response;
  };
}

const profileServices = new ProfileServices();
export default profileServices;