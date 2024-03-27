import axios, { AxiosError, AxiosResponse } from 'axios';
interface RequestConfig<T = any> {
    partialUrl: string;
    method: 'get' | 'post' | 'put' | 'delete';
    data?: T;
    params?: Record<string, any>;
    headers?: Record<string, string>;
}

export async function makeRequest<T>(config: RequestConfig<T>): Promise<AxiosResponse<T>> {
  try {
    return await axios.request<T>({ url: `${process.env.REACT_APP_BASE_URL}${config.partialUrl}`,...config});
  } catch (error) {
    const axiosError = error as AxiosError;
    throw new Error(`Request failed with status ${axiosError.response?.status}`);
  }
}