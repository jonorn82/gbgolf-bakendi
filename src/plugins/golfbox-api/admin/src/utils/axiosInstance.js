/**
 * axios with a custom config.
 */

import axios from 'axios';
import { auth, wrapAxiosInstance } from '@strapi/helper-plugin';

const golfboxUrl = 'https://golfbox.sveitan.is'
const golfboxInstance = axios.create({
  baseURL: `${golfboxUrl}`,
});

golfboxInstance.interceptors.request.use(
  async (config) => {
    config.headers = {
      //Authorization: `Bearer ${auth.getToken()}`,
      'Access-Control-Allow-Origin': '*',
      Accept: 'application/json',
      'Content-Type': 'application/json',
      
    };

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

golfboxInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // whatever you want to do with the error
    if (error.response?.status === 401) {
      auth.clearAppStorage();
      window.location.reload();
    }

    throw error;
  }
);


/* async function getData() {
  console.log("getting Data")
    let config = {
      headers: {'Access-Control-Allow-Origin': '*'}
    }
    res = await axios.get("https://scores.golfbox.dk/Handlers/ScheduleHandler/GetSchedule/CustomerId/1688/Season/2022", config)
    res = res.data.replaceAll("!0", "0").replaceAll("!1", "1")
    res = JSON.parse(res)
    console.log(res);
    return res
} */

export default golfboxInstance;
