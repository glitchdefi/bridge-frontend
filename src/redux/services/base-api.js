import axios from "axios";

import { ENDPOINTS, LOCAL_STORAGE, ROUTES } from "../../constants";
import { BACK_END_URL } from "../../_configs";





const request = axios.create({
  baseURL: BACK_END_URL,
  timeout: LOCAL_STORAGE.TIMEOUT,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
    // Authorization: `Bearer ${localStorage.getItem(LOCAL_STORAGE.ACCESS_TOKEN)}`,
  },
});



// Add a response interceptor


const unwApi = {
  get: (url) => {
    // console.log("url get: ", url);
    return request({
      method: "get",
      url: url,
    })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  },
  post: (url, data) => {
    // console.log("post ", { url }, { data });
    return request({
      method: "post",
      url: url,
      data: data,
    })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  },
  delete: (url, data) => {
    return request({
      method: "delete",
      url: url,
      data: data,
    })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  },
  put: (url, data) => {
    return request({
      method: "put",
      url: url,
      data: data,
    })
      .then((response) => {
        return response;
      })
      .catch((err) => {
        throw err;
      });
  },
};

export default unwApi;
