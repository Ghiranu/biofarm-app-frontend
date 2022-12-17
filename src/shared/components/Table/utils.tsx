import { IconButton, Skeleton, TableCell, TableRow } from '@mui/material'
import { v4 as uuidv4 } from 'uuid'
import { COLORS } from 'shared/constants'
import { ColumnDefinitionType } from 'shared'

export const createtSkeletonRow = <T, K extends keyof T>(
	columns: ColumnDefinitionType<T, K>[],
) => {
	return columns.map((_heading) => (
		<TableCell key={uuidv4()} component="th" scope="row">
			<Skeleton variant="rounded" />
		</TableCell>
	))
}

export const createSkeletonTable = <T, K extends keyof T>(
	numberOfRows: number,
	columns: ColumnDefinitionType<T, K>[],
) => {
	const rows: JSX.Element[] = []

	for (let i = 0; i < numberOfRows; i++) {
		const row = (
			<TableRow key={uuidv4()}>{createtSkeletonRow(columns)}</TableRow>
		)
		rows.push(row)
	}

	return rows
}

const getTableRow = (
	tableCells: JSX.Element[],
	_rowColor: string | undefined,
) => {
	return (
		<TableRow
			key={uuidv4()}
			sx={{
				backgroundColor: _rowColor ? getRowColor(_rowColor) : 'initial',
			}}
		>
			{tableCells}
		</TableRow>
	)
}

const getRowColor = (rowColor: string | undefined) => {
	if (rowColor === undefined) {
		return
	}

	if (rowColor.toLowerCase() === COLORS.RED.TEXT) {
		return COLORS.RED.CSSVALUE
	}

	if (rowColor.toLocaleLowerCase() === COLORS.YELLOW.TEXT) {
		return COLORS.YELLOW.CSSVALUE
	}

	if (rowColor.toLowerCase() === COLORS.NONE.TEXT) {
		return COLORS.NONE.CSSVALUE
	}
}

const getTableCell = (isLink: boolean, content: string | JSX.Element) => {
	const cellContent = isLink ? (
		<a href="#" className="customLink">
			{content}
		</a>
	) : (
		content
	)
	return (
		<TableCell
			component="th"
			key={uuidv4()}
			scope="row"
			sx={{ whiteSpace: 'nowrap' }}
		>
			{cellContent}
		</TableCell>
	)
}

export const getTableRows = <T, K extends keyof T>(
	rows: any[],
	numberOfRows: number,
	columns: ColumnDefinitionType<T, K>[],
) => {
	const tableRows: JSX.Element[] = []
	const colNames = columns.map((header) => header.dbName)

	for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
		const tableCells: JSX.Element[] = []
		const currentRow = rows[rowIndex]
		if (currentRow === undefined || currentRow === null) return

		for (let colIndex = 0; colIndex < colNames.length; colIndex++) {
			const isLink = colNames[colIndex] === 'number'
			const columnField = colNames[colIndex]
			const cellContent = currentRow[columnField]
			tableCells.push(getTableCell(isLink, cellContent as string))
		}

		tableRows.push(getTableRow(tableCells, rows[rowIndex].contactColor))
	}

	return tableRows
}

export const getColumnHeaders = <T, K extends keyof T>(
	columns: ColumnDefinitionType<T, K>[],
	deleteColumnHandler,
) => {
	return columns.map((heading: ColumnDefinitionType<T, K>, index: number) => (
		<TableCell
			key={uuidv4()}
			sx={{
				backgroundColor: '#E2E2E2',
				minWidth: heading.colName.split(' ').length > 2 ? '10rem' : '',
			}}
			className="tableHeader"
		>
			<div>
				{heading.colName}
				{heading.mandatory ? null : (
					<IconButton
						size="small"
						onClick={() =>
							deleteColumnHandler
								? deleteColumnHandler(heading, index)
								: null
						}
						className="deleteButton"
					>
						[x]
					</IconButton>
				)}
			</div>
		</TableCell>
	))
}
