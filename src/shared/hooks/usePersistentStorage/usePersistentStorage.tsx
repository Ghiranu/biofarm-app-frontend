import { useEffect, useState } from 'react'
import { PersistentStorage, isObject } from 'shared'

export function usePersistentStorage<T>(
	storage: globalThis.Storage,
	key: string,
	initialValue: T,
) {
	const [value, setValue] = useState<T>(() => {
		const valueFromStorage = PersistentStorage.getItem(key, storage)

		if (isObject(initialValue)) {
			return {
				...initialValue,
				...valueFromStorage,
			}
		}

		return valueFromStorage || initialValue
	})

	useEffect(() => {
		PersistentStorage.setItem(key, value, storage)
	}, [key, value])

	return [value, setValue] as const
}
