import axios from "axios";

const getCommonHeaders = () => {
  return  {
    "Content-Type": "application/json",
    'authorization': `${localStorage.getItem('authToken')}`
  }
}

const BASE_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const HttpServices = {
  getRequest: async (url, headers) => {
    const result = await axios({
      method: "get",
      url: `${BASE_BACKEND_URL}${url}`,
      headers: {
        ...getCommonHeaders(),
        ...headers,
      },
    });
    return result;
  },
  postRequest: async (url, data, headers) => {
    const result = await axios({
      method: "post",
      url: `${BASE_BACKEND_URL}${url}`,
      data,
      headers: {
        ...getCommonHeaders(),
        ...headers,
      },
    });
    return result;
  },
  deleteRequest: async (url, data, headers) => {
    const result = await axios({
      method: "delete",
      url: `${BASE_BACKEND_URL}${url}`,
      data,
      headers: {
        ...getCommonHeaders(),
        ...headers,
      },
    });
    return result;
  },
  patchRequest: async (url, data, headers) => {
    const result = await axios({
      method: "patch",
      url: `${BASE_BACKEND_URL}${url}`,
      data,
      headers: {
        ...getCommonHeaders(),
        ...headers,
      },
    });
    return result;
  },
};

export default HttpServices;
