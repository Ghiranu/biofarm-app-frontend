import { HttpMethod } from '../enums'

export interface HttpParams {
	data?: any
	enctype?: string
	headers?: { [key: string]: string }
	method: HttpMethod
	params?: any
	path: string
}
