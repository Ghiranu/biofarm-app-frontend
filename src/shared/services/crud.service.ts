import { HttpClient } from 'core'
import { BaseFactory, ApiError } from 'shared'

export abstract class CrudService<D> {
	public http: HttpClient
	protected factory: BaseFactory<D>

	constructor() {
		this.http = new HttpClient()
	}

	protected abstract get path(): string

	protected get() {
		const endpoint = this.basicPath()
		return this.getResource(endpoint)
	}
	protected paginatedGet(numberOfRows: number, pageNumber: number) {
		const endpoint = this.paginatedPath(numberOfRows, pageNumber)
		return this.getResource(endpoint)
	}

	protected paginatedGetAll(numberOfRows: number, pageNumber: number) {
		const endpoint = this.paginatedPath(numberOfRows, pageNumber)
		return this.getResources(endpoint)
	}

	protected getById(id: number) {
		const endpoint = this.idPath(id)
		return this.getResource(endpoint)
	}

	protected getAllById(id: number) {
		const endpoint = this.idPath(id)
		return this.getResources(endpoint)
	}

	protected post(resource: D) {
		const endpoint = this.basicPath()
		return this.postResource(resource, endpoint)
	}

	protected put(resource: D) {
		const endpoint = this.basicPath()
		return this.putResource(resource, endpoint)
	}

	protected patch(resource: D) {
		const endpoint = this.basicPath()
		return this.patchResource(resource, endpoint)
	}

	protected delete(resource: D) {
		const endpoint = this.basicPath()
		return this.deleteResource(resource, endpoint)
	}

	private getResources(url: string) {
		return this.http
			.getAll<D[]>(url)
			.then((response) =>
				response.map((resourceDTO) =>
					this.factory.fromDTO(resourceDTO),
				),
			)
			.catch((error: ApiError) => {
				throw this.factory.fromErrorDTO(error)
			})
	}

	private getResource(url: string) {
		return this.http
			.get<D>(url)
			.then((response) => this.factory.fromDTO(response))
			.catch((error: ApiError) => {
				throw this.factory.fromErrorDTO(error)
			})
	}

	private putResource(resource: D, url: string) {
		const query = url
		const resourceDTO = this.factory.toDTO(resource)

		return this.http
			.put<D>(query, resourceDTO)
			.then((response) => this.factory.fromDTO(response))
			.catch((error: ApiError) => {
				throw this.factory.fromErrorDTO(error)
			})
	}

	private patchResource(resource: D, url: string) {
		const query = url
		const resourceDTO = this.factory.toDTO(resource)

		return this.http
			.patch<D>(query, resourceDTO)
			.then((response: D) => this.factory.fromDTO(response))
			.catch((error: ApiError) => {
				throw this.factory.fromErrorDTO(error)
			})
	}

	private postResource(resource: D, url: string) {
		const query = url

		const resourceDTO = this.factory.toDTO(resource)
		return this.http
			.post<D>(query, resourceDTO)
			.then((response: D) => {
				return this.factory.fromDTO(response)
			})
			.catch((error: ApiError) => {
				throw this.factory.fromErrorDTO(error)
			})
	}

	private deleteResource(resource: D, url: string) {
		const query = url
		return this.http
			.delete<D>(query)
			.then(() => resource)
			.catch((error: ApiError) => {
				throw this.factory.fromErrorDTO(error)
			})
	}

	private paginatedPath(numberOfRows: number, pageNumber: number) {
		return `${this.path}?size=${numberOfRows}&page=${pageNumber}`
	}

	private basicPath() {
		return this.path
	}

	private idPath(id: number) {
		return `${this.path}/${id}`
	}
}
