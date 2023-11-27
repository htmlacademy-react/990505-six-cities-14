import axios, {AxiosError, AxiosInstance, AxiosResponse, InternalAxiosRequestConfig} from 'axios';
import {BACKEND_URL, REQUEST_TIMEOUT} from '../const';
import {getToken} from './token';
import {StatusCodes} from 'http-status-codes';
import {toast} from 'react-toastify';

class DetailMessageType {
}

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  const StatusCodeMapping: Record<number, boolean> = {
    [StatusCodes.BAD_REQUEST]: true,
    [StatusCodes.UNAUTHORIZED]: true,
    [StatusCodes.NOT_FOUND]: true,
    [StatusCodes.CONFLICT]: true
  };
  const shouldDisplayError = (response: AxiosResponse) => !!StatusCodeMapping[response.status];
  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();

      if (token && config.headers) {
        config.headers['x-token'] = token;
      }

      return config;
    },
  );

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError<DetailMessageType>) => {
      if (error.response && shouldDisplayError(error.response)) {
        const detailMessage = <{message: string}>(error.response.data);
        toast.warn(detailMessage.message);
      }

      throw error;
    }
  );

  return api;
};
