import { render } from '@testing-library/react'
import Footer from './Footer'

describe('<Footer />', () => {
	const renderComponent = () => render(<Footer />)
	const appVersion = process.env.REACT_APP_VERSION as string

	beforeEach(() => {
		renderComponent()
	})

	test('Should render without crashing', () => {
		expect(renderComponent().container).toBeDefined()
	})

	test('Should render app version', () => {
		expect(renderComponent().container).toHaveTextContent(appVersion)
	})
})
