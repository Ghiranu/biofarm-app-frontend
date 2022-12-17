export type ColumnDefinitionType<T, K extends keyof T> = {
	colName: string
	dbName: K
	mandatory: boolean
}