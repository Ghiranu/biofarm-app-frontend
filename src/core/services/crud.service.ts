import { BaseFactory } from "shared/factories";
import { ApiError } from "shared/types";

import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { HttpMethod, HttpParams } from "core";

class HttpClient {
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

export abstract class CrudService<D> {
  public http: HttpClient;
  protected factory: BaseFactory<D>;

  constructor() {
    this.http = new HttpClient();
  }

  protected abstract get path(): string;

  protected get(route: string) {
    const endpoint = `${this.basicPath()}/${route}`;
    return this.getResource(endpoint);
  }

  protected getAll(route: string) {
    const endpoint = `${this.basicPath()}/${route}`;
    return this.getResources(endpoint);
  }

  protected paginatedGet(numberOfRows: number, pageNumber: number) {
    const endpoint = this.paginatedPath(numberOfRows, pageNumber);
    return this.getResource(endpoint);
  }

  protected paginatedGetAll(numberOfRows: number, pageNumber: number) {
    const endpoint = this.paginatedPath(numberOfRows, pageNumber);
    return this.getResources(endpoint);
  }

  protected getById(id: number) {
    const endpoint = this.idPath(id);
    return this.getResource(endpoint);
  }

  protected getAllById(id: number) {
    const endpoint = this.idPath(id);
    return this.getResources(endpoint);
  }

  protected post(resource: D, route: string) {
    const endpoint = `${this.basicPath()}/${route}`;
    return this.postResource(resource, endpoint);
  }

  protected put(resource: D, route: string) {
    const endpoint = `${this.basicPath()}/${route}`;
    return this.putResource(resource, endpoint);
  }

  protected patch(resource: D) {
    const endpoint = this.basicPath();
    return this.patchResource(resource, endpoint);
  }

  protected delete(route: string) {
    const endpoint = `${this.basicPath()}/${route}`;
    return this.deleteResource(endpoint);
  }

  private getResources(url: string) {
    return this.http
      .getAll<D[]>(url)
      .then((response) =>
        response.map((resourceDTO) => this.factory.fromDTO(resourceDTO))
      )
      .catch((error: ApiError) => {
        throw this.factory.fromErrorDTO(error);
      });
  }

  private getResource(url: string) {
    return this.http
      .get<D>(url)
      .then((response) => this.factory.fromDTO(response))
      .catch((error: ApiError) => {
        throw this.factory.fromErrorDTO(error);
      });
  }

  private putResource(resource: D, url: string) {
    const query = url;
    const resourceDTO = this.factory.toDTO(resource);

    return this.http
      .put<D>(query, resourceDTO)
      .then((response) => this.factory.fromDTO(response))
      .catch((error: ApiError) => {
        throw this.factory.fromErrorDTO(error);
      });
  }

  private patchResource(resource: D, url: string) {
    const query = url;
    const resourceDTO = this.factory.toDTO(resource);

    return this.http
      .patch<D>(query, resourceDTO)
      .then((response: D) => this.factory.fromDTO(response))
      .catch((error: ApiError) => {
        throw this.factory.fromErrorDTO(error);
      });
  }

  private postResource(resource: D, url: string) {
    const query = url;

    const resourceDTO = this.factory.toDTO(resource);
    return this.http
      .post<D>(query, resourceDTO)
      .then((response: D) => {
        return this.factory.fromDTO(response);
      })
      .catch((error: ApiError) => {
        throw this.factory.fromErrorDTO(error);
      });
  }

  private deleteResource(url: string) {
    const query = url;
    return this.http
      .delete<D>(query)
      .then(() => console.log("Success"))
      .catch((error: ApiError) => {
        throw this.factory.fromErrorDTO(error);
      });
  }

  private paginatedPath(numberOfRows: number, pageNumber: number) {
    return `${this.path}?size=${numberOfRows}&page=${pageNumber}`;
  }

  private basicPath() {
    return this.path;
  }

  private idPath(id: number) {
    return `${this.path}/${id}`;
  }
}
