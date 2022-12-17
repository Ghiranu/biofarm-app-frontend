import { render } from '@testing-library/react'
import Table from './Table'
import { CONTACT_HEADINGS, rows } from 'shared/constants'

const numberOfRows = rows.length
const headings = CONTACT_HEADINGS.map((heading) => heading.colName)
test('renders contact table', () => {
	window.scrollTo = jest.fn()
	const { getByRole } = render(
		<Table
			numberOfRows={numberOfRows}
			error={null}
			isLoading={false}
			rows={rows}
			columns={CONTACT_HEADINGS}
		/>,
	)
	const table = getByRole('table')
	expect(table).toBeInTheDocument()
})

test('renders all table rows', () => {
	window.scrollTo = jest.fn()
	const { getAllByRole } = render(
		<Table
			numberOfRows={numberOfRows}
			error={null}
			isLoading={false}
			rows={rows}
			columns={CONTACT_HEADINGS}
		/>,
	)
	const tableRows = getAllByRole('row')
	expect(tableRows).toHaveLength(11)
})

test('renders all table column headers', () => {
	window.scrollTo = jest.fn()
	const { getByText } = render(
		<Table
			numberOfRows={numberOfRows}
			error={null}
			isLoading={false}
			rows={rows}
			columns={CONTACT_HEADINGS}
		/>,
	)

	headings.forEach((header) => {
		expect(getByText(header)).toBeInTheDocument()
	})
})

test('renders error state', () => {
	window.scrollTo = jest.fn()
	const { getByText, getByRole } = render(
		<Table
			numberOfRows={numberOfRows}
			error={'err mesage'}
			isLoading
			rows={rows}
			columns={CONTACT_HEADINGS}
		/>,
	)
	const errorMessage = getByText(/A aparut o eroare!/i)
	expect(errorMessage).toBeInTheDocument()
	const refreshButton = getByRole('button', { name: /Reincarca/i })
	expect(refreshButton).toBeInTheDocument()
})
