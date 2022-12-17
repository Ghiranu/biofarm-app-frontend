import './Footer.scss'

const Footer: React.FC = () => {
	return (
		<footer className="footer">
			Version {process.env.REACT_APP_VERSION}
		</footer>
	)
}
export default Footer
