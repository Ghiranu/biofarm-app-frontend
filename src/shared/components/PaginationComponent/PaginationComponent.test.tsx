import { render } from '@testing-library/react'
import Pagination from './PaginationComponent'

const setPage = () => {}

test('renders a 4 pages pagination component', () => {
	const { getAllByRole } = render(
		<Pagination setPage={setPage} numberOfPages={4} currentPage={1} />,
	)
	const buttons = getAllByRole('button')
	expect(buttons.length).toBe(6)
})
