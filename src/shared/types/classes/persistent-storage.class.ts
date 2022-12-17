interface PersistentStorage {
	getItem(_key: string, _storage: globalThis.Storage): string | null
	setItem<T>(_key: string, _value: T, _storage: globalThis.Storage): void
}

class Storage implements PersistentStorage {
	getItem(key: string, storage: globalThis.Storage) {
		const item = storage.getItem(key)

		if (item === null || item === 'null') {
			return undefined
		}

		try {
			return JSON.parse(item)
		} catch (err: any) {
			console.error(`Cannot get item with key ${key} from local storage`)
		}

		return item
	}

	setItem<T>(key: string, value: T, storage: globalThis.Storage) {
		if (value === undefined) {
			storage.removeItem(key)
		} else {
			storage.setItem(key, JSON.stringify(value))
		}
	}
}

export const PersistentStorage = new Storage()
