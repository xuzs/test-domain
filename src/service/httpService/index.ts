import type { AxiosRequestConfig, AxiosInstance } from 'axios';

import { IMapper } from 'types-ddd';

import axios from 'axios';
import ServiceBasic from '../../core/serviceBasic';



const axiosInstance = axios.create();

type HttpCode = '0' | string | number;

type HttpDTO<T> = {
  c: HttpCode;
  m: string;
  d: T;
};

interface HttpInfrastructure {
  get<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T>;
  put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T>;
}

export default class HttpService extends ServiceBasic implements HttpInfrastructure {
  private client: AxiosInstance;

  constructor() {
    super();
    this.client = axiosInstance;
  }

  delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.client.delete<HttpDTO<T>>(url, config).then((response) => {
      return response.data.d;
    });
  }

  get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    return this.client.post<HttpDTO<T>>(url, config).then((response) => {
      return response.data.d;
    });
  }

  post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.client.post<HttpDTO<T>>(url, data, config).then((response) => {
      return response.data.d;
    });
  }

  put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    return this.client.put<HttpDTO<T>>(url, data, config).then((response) => {
      return response.data.d;
    });
  }
}

const CancelToken = axios.CancelToken;

export { CancelToken };
