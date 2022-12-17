import { PaginationDTO } from 'shared'
export class Pagination {
	pageNumber: number
	pageSize: number
	totalElements: number
	totalPages: number

	setProperties(dto: PaginationDTO) {
		this.setPaginationInfo(dto)
	}

	private setPaginationInfo(dto: PaginationDTO) {
		this.pageNumber = dto.pageNumber
		this.pageSize = dto.pageSize
		this.totalElements = dto.totalElements
		this.totalPages = dto.totalPages
	}
}
