import { render, fireEvent, within } from '@testing-library/react'
import { MAIN_MENU_ITEMS } from 'shared/constants'
import MainMenu from './MainMenu'

test('renders expand menu button', () => {
	const { getByTestId, getByLabelText } = render(<MainMenu />)
	const expandIcon = getByTestId('ChevronRightIcon')
	expect(expandIcon).toBeInTheDocument()
	const expandButton = getByLabelText('open drawer')
	expect(expandButton).toBeInTheDocument()
	fireEvent.click(expandButton)

	const collapseIcon = getByTestId('ChevronLeftIcon')
	expect(collapseIcon).toBeInTheDocument()
})

test('clicking expand button will show collapse button', () => {
	const { getByTestId, getByLabelText } = render(<MainMenu />)
	const expandButton = getByLabelText('open drawer')

	fireEvent.click(expandButton)

	const collapseIcon = getByTestId('ChevronLeftIcon')
	expect(collapseIcon).toBeInTheDocument()
})

test('clicking expand button will show menu logo', () => {
	const { getByLabelText, getByRole } = render(<MainMenu />)
	const expandButton = getByLabelText('open drawer')
	const logo = getByRole('img')

	fireEvent.click(expandButton)

	expect(logo).toBeInTheDocument()
})

test('clicking expand button will show the list menu', () => {
	const { getByLabelText, getByRole } = render(<MainMenu />)
	const expandButton = getByLabelText('open drawer')
	const listMenu = getByRole('list')

	fireEvent.click(expandButton)

	expect(listMenu).toBeInTheDocument()
})

test('should render all list items', () => {
	const { getByLabelText, getByRole } = render(<MainMenu />)
	const expandButton = getByLabelText('open drawer')

	fireEvent.click(expandButton)

	const listMenu = getByRole('list')
	const { getAllByRole } = within(listMenu)
	const items = getAllByRole('listitem')

	const menuItemNames = items.map((item) => item.textContent)
	const expectedMenuItemNames = MAIN_MENU_ITEMS.map((item) => item.text)

	expect(items.length).toBe(expectedMenuItemNames.length)
	expect(menuItemNames).toEqual(expectedMenuItemNames)
})
