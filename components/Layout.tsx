import Navbar from './Navbar'

interface LayoutProps {
	children: React.ReactNode
	className?: string
}

const Layout = ({ children, className = '' }: LayoutProps) => {
	return (
		<>
			<Navbar />
			<div
				className={`mx-auto flex max-w-7xl flex-col items-center ${className}`}
			>
				{children}
			</div>
		</>
	)
}
export default Layout
