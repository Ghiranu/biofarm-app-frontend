import { RefreshOutlined } from '@mui/icons-material'
import {
	Alert,
	Button,
	Table as MUITable,
	TableBody,
	TableContainer,
	TableHead,
	TableRow,
} from '@mui/material'
import { SCROLL_TYPE } from 'shared/constants'
import { createSkeletonTable, getColumnHeaders, getTableRows } from './utils'

import './Table.scss'
import { useTable } from 'shared/containers'
import { ColumnDefinitionType } from 'shared'
import { DEFAULT_TABLE_WIDTH } from 'shared/constants'

type Props<T, K extends keyof T> = {
	columns: Array<ColumnDefinitionType<T, K>>
	deleteColumnHandler?: (
		_header: ColumnDefinitionType<T, K>,
		_index: number,
	) => void
	error: string | null
	isLoading: boolean
	numberOfRows: number
	refreshData?: boolean
	rows: Array<T>
	setRefreshData?: (
		_value: boolean | ((_prevState: boolean) => boolean),
	) => void
	tableWidth?: string
}

const Table = <T, K extends keyof T>({
	columns,
	deleteColumnHandler,
	error,
	isLoading,
	numberOfRows,
	refreshData,
	rows,
	setRefreshData,
	tableWidth,
}: Props<T, K>): JSX.Element => {
	const {
		tableRef,
		scrollType,
		refreshError,
		mouseOverHandler,
		resetScrollAfterTimeout,
		setScroll,
	} = useTable({ numberOfRows, refreshData, setRefreshData })

	const skeletonTable = createSkeletonTable(numberOfRows, columns)
	const errorContainer = (
		<div className="errorContainer">
			<Alert sx={{ mb: '3rem' }} severity="error">
				A aparut o eroare!
			</Alert>
			<Button
				onClick={refreshError}
				variant="outlined"
				color="info"
				endIcon={<RefreshOutlined />}
			>
				Reincarca
			</Button>
		</div>
	)

	return error ? (
		errorContainer
	) : (
		<TableContainer
			ref={tableRef}
			sx={{
				overflowX: scrollType,
				overflowY: SCROLL_TYPE.VISIBLE,
				marginBottom: '1rem',
				width: tableWidth as string,
			}}
		>
			<MUITable
				onMouseEnter={setScroll}
				onMouseLeave={resetScrollAfterTimeout}
				onMouseOver={mouseOverHandler}
				sx={{ minWidth: 650, margin: '1.5rem 0' }}
				aria-label="simple table"
			>
				<TableHead
					sx={{
						backgroundColor: '#E2E2E2',
					}}
				>
					<TableRow>
						{getColumnHeaders(columns, deleteColumnHandler)}
					</TableRow>
				</TableHead>
				<TableBody>
					{isLoading
						? skeletonTable
						: getTableRows(rows, numberOfRows, columns)}
				</TableBody>
			</MUITable>
		</TableContainer>
	)
}

Table.defaultProps = {
	deleteColumnHandler: undefined,
	setRefreshData: undefined,
	refreshData: false,
	tableWidth: DEFAULT_TABLE_WIDTH,
}

export default Table
