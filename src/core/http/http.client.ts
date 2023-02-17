import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { HttpMethod, HttpParams, HttpHeader } from "core";

export class HttpClient {
  get<D>(url: string, headers = {}): Promise<D> {
    return this.performRequest<D>(url, HttpMethod.GET, null, headers);
  }

  getAll<D>(url: string, headers = {}): Promise<D> {
    return this.performRequest<D>(url, HttpMethod.GET, null, headers);
  }

  post<D>(url: string, body: D, headers = {}): Promise<D> {
    return this.performRequest<D>(url, HttpMethod.POST, body, headers);
  }

  delete<D>(url: string, headers = {}): Promise<D> {
    return this.performRequest<D>(url, HttpMethod.DELETE, null, headers);
  }

  put<D>(url: string, body: D, headers = {}): Promise<D> {
    return this.performRequest<D>(url, HttpMethod.PUT, body, headers);
  }

  patch<D>(url: string, body: D, headers = {}): Promise<D> {
    return this.performRequest<D>(url, HttpMethod.PATCH, body, headers);
  }

  private baseUrl() {
    return import.meta.env.VITE_BASE_URL;
  }

  private performRequest<D>(
    path: string,
    method: HttpMethod,
    data: D | null,
    headers?: { [key: string]: string }
  ) {
    axios.defaults.withCredentials = true;

    const config = this.requestConfig<D>({ path, method, data, headers });

    return this.handleResponse<D>(config);
  }

  private handleResponse<D>(config: AxiosRequestConfig<D>): Promise<D> {
    return axios(config)
      .then((response) => {
        return response.data;
      })
      .catch((error: AxiosError) => {
        throw error?.response?.data;
      });
  }

  private requestConfig<D>(axiosParams: HttpParams) {
    const { path, method, data } = axiosParams;
    const url = `${this.baseUrl()}${path}`;

    const config: AxiosRequestConfig<D> = {
      method,
      data,
      url,
    };

    return config;
  }

  get requestUrl() {
    return this.baseUrl();
  }
}
