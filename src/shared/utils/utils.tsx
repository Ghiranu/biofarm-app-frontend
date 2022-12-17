export const isObject = <T,>(object: T): boolean => {
	if (
		typeof object === "object" &&
		!Array.isArray(object) &&
		object !== null
	) {
		return true
	}

	return false;
}