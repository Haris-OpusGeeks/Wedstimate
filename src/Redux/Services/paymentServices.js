import endPoints from "../Constants/endpoints";
import { fetchApi } from "../Utils/helper";


class PaymentServices {
    extendFreeTrial = async (data) => {
        const response = await fetchApi({
            method: 'POST',
            endPoint: endPoints.EXTEND_TRIAL,
            token: true,
            data,
        });
        return response;
    }
}

const paymentServices = new PaymentServices();
export default paymentServices;