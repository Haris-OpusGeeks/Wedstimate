// import axios from "axios";
import axios from "axios";
import { getAccessToken } from "./localStore";
import moment from 'moment/moment';
// import https from 'https';

// export const base_url = 'https://159.203.143.160';
export const base_url = 'https://wedstimateapi.com';

// api helper
export const fetchApi = async ({
  method,
  endPoint,
  token,
  data,
  params,
  formData,
  tenant,
}) => {
  const headers = {
    // tenant: 'root',
  };
  if (token) headers.Authorization = 'Bearer ' + (await getAccessToken());
  // if (token) headers.Authorization = 'Bearer ' + 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6ImRjMmFkZmQyLWEwODktNGVkZC1hNDBhLTczM2RkMDkwY2JmMyIsImh0dHA6Ly9zY2hlbWFzLnhtbHNvYXAub3JnL3dzLzIwMDUvMDUvaWRlbnRpdHkvY2xhaW1zL2VtYWlsYWRkcmVzcyI6InNhbXBsZUBnbWFpbC5jb20iLCJmdWxsTmFtZSI6InNhbXBsZSBzYW1wbGUiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoic2FtcGxlIiwiaHR0cDovL3NjaGVtYXMueG1sc29hcC5vcmcvd3MvMjAwNS8wNS9pZGVudGl0eS9jbGFpbXMvc3VybmFtZSI6InNhbXBsZSIsImlwQWRkcmVzcyI6IjExOS43My45Ni43MiIsInRlbmFudCI6InJvb3QiLCJpbWFnZV91cmwiOiIiLCJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9tb2JpbGVwaG9uZSI6IiIsImV4cCI6MTcyMTgwNDc0MX0.pcrRfras2p1xJE5tewtIHtjO1NC5kUdo0gFXAGxLJcc';
  if (tenant) headers.tenant = tenant;
  

  if (formData) {
    headers['Content-Type'] = 'multipart/form-data';
    headers['Accept'] = 'multipart/form-data';
    headers['Cache-Control']= 'no-cache, no-store, must-revalidate';
    // headers['tenant'] = 'root';
  } else {
    headers['Content-Type'] = 'application/json';
    headers['Accept'] = 'application/json';
    headers['Cache-Control']= 'no-cache, no-store, must-revalidate';
  }

  var config = {
    method,
    url: `${base_url}/api/${endPoint}`,
    headers,
    data: data ? data : undefined,
  //   agent : new https.Agent({
  //     rejectUnauthorized: false,
  //  }),
};
  console.log(config.url);
  console.log(config.headers);
  console.log(config.data);
  if (params) config.params = params;

  return await axios(config);
};

class Dateformatter {
  dateWithTime = date => {
    return moment(date).format('DD-MM-YYYY hh:mm:ss');
  };
  MMMM_D_YY = date => {
    return moment(date).format('MMMM D, YYYY');
  };
  getHour = date => {
    return moment(date).format('hh');
  };
  getMinute = date => {
    return moment(date).format('mm');
  };
  getAmOrPm = date => {
    return moment(date).format('a');
  };
  MM_DD_YYYY = date => {
    return moment(date).format('MM/DD/YYYY');
  };
  isBefore = date => {
    return moment(date).isBefore();
  };
}

export const dateformatter = new Dateformatter();


export function formatMessageTime(date) {
  const now = moment();
  const messageDate = moment.utc(date).local(); // Convert UTC to local time

  if (messageDate.isSame(now, 'day')) {
    return messageDate.format('h:mma'); // e.g., 5:10pm
  } else if (messageDate.isSame(now.subtract(1, 'day'), 'day')) {
    return 'Yesterday';
  } else if (messageDate.isAfter(now.subtract(6, 'days'))) {
    return messageDate.format('dddd'); // e.g., Monday
  } else {
    return messageDate.format('MMMM Do YYYY'); // e.g., July 8th 2023
  }
}


export function convertUtcToLocalTime(date) {
  const now = moment();
  const messageDate = moment.utc(date).local(); // Convert UTC to local time

  if (messageDate.isSame(now, 'day')) {
    return messageDate.format('h:mma'); // e.g., 5:10pm
  } else if (messageDate.isSame(now.subtract(1, 'day'), 'day')) {
    return 'Yesterday';
  } else if (messageDate.isAfter(now.subtract(6, 'days'))) {
    return messageDate.format('dddd'); // e.g., Monday
  } else {
    return messageDate.format('MMMM Do YYYY'); // e.g., July 8th 2023
  }
}

export function convertUTCToLocal(date) {
  // console.log(date);
  var gmtDateTime = moment.utc(date)
  var local = gmtDateTime.local().format('YYYY-MMM-DD');
  return local;
}


// blog excerpt creation

export function createExcerpt(content, length) {
  if (content.length > length) {
    return content.substring(0, length) + "...";  // Trim content to the given length and add ellipsis
  }
  return content;
}