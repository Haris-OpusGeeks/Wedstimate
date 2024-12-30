import endPoints from "../Constants/endpoints.js";
import {fetchApi} from "../Utils/helper.js";


class EventServices {
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

    createEvent = async data => {
        const response = await fetchApi({
            method: 'POST',
            endPoint: endPoints.EVENTS,
            token: true,
            data,
        });
        return response;
    };
}

const eventServices = new EventServices();
export default eventServices;