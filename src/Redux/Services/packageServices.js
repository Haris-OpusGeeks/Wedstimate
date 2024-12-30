
import endPoints from "../Constants/endpoints";
import { fetchApi } from "../Utils/helper";


class PackageServices {
  getListOfPackages = async params => {
    const response = await fetchApi({
      method: 'GET',
      endPoint: endPoints.PACKAGES,
      token: true,
      params,
    });
    // console.log(response);
    return response;
  };
  
  getMembershipTypes = async params => {
    const response = await fetchApi({
      method: 'GET',
      endPoint: endPoints.MEMBERSHIP_TYPE,
      token: true,
      params,
    });
    // console.log(response);
    return response;
  };

  createPackage = async data => {
    const response = await fetchApi({
      method: 'POST',
      endPoint: endPoints.PACKAGES,
      token: true,
      data,
    });
    return response;
  };

  addPackageInEvent = async data => {
    const response = await fetchApi({
      method: 'POST',
      endPoint: endPoints.ADD_PACKAGE,
      token: true,
      data,
    });
    return response;
  };

  updatePackage = async data => {
    const response = await fetchApi({
      method: 'PUT',
      endPoint: endPoints.PACKAGES,
      token: true,
      data,
    });
    return response;
  };

  deletePackage = async data => {
    const response = await fetchApi({
      method: 'DELETE',
      endPoint: `${endPoints.PACKAGES}?id=${data.id}`,
      token: true,
      data,
    });
    return response;
  };
}

const packageServices = new PackageServices();
export default packageServices;