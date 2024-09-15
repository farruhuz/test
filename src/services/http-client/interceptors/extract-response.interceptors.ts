import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

const extractResponse = (response: AxiosResponse) => {
  if (response.config.shouldReturnOriginalResponse) {
    return response;
  }

  return Object.assign(response, response.data);
};

const extractErrorResponse = (error: AxiosError) => {
  if (error.response) {
    error.response = extractResponse(error.response);
  }

  return Promise.reject(error);
};

export const applyExtractorResponseInterceptor = (axiosInstance: AxiosInstance) => {
  axiosInstance.defaults.shouldReturnOriginalResponse = false;
  axiosInstance.interceptors.response.use(extractResponse, extractErrorResponse);

  return axiosInstance;
};
