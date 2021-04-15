import baseApi from "./base-api";
import { ENDPOINTS } from "../../constants";
import axios from "axios";
import { result } from "lodash";
/**
 * Login
 * @param {Object} data
 */
export const getListProjects = async () => {

  const result = await axios.get('/data/data.json')
  // console.log(result)
  return {
    status: 200,
    data: result.data
  }

  // return baseApi.get(`${ENDPOINTS.GET_PROJECTS}`);
};

export const getProject = async (contract) => {

  const result = await axios.get('/data/data.json')
  const item = result.data.find(e => e.contract == contract);
  if (item) {
    return {
      status: 200,
      data: item
    }
  } else {
    return {
      status: 404,
      data: null
    }
  }
}


