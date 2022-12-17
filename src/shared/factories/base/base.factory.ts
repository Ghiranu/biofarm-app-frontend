import { ApiError, ApiErrorDTO } from 'shared'
import { HttpStatus } from 'core'

export abstract class BaseFactory<D> {
	abstract fromDTO(_dto: D)

	abstract toDTO(_model: D)

	fromErrorDTO(error: ApiErrorDTO): ApiError {
		const apiError = new ApiError()
		apiError.message =
			error.status === HttpStatus.INTERNAL_SERVER_ERROR
				? this.genericServerError
				: error?.message

		return apiError
	}

	private get genericServerError() {
		return 'Something went wrong'
	}
}
