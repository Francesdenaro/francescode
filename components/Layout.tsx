import Footer from './Footer'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

interface LayoutProps {
	children: React.ReactNode
	className?: string
	hasSidebar?: boolean
}

const Layout = ({
	children,
	className = '',
	hasSidebar = true,
}: LayoutProps) => {
	return (
		<div className='flex min-h-screen flex-col'>
			<Navbar />
			<div className='mx-auto flex h-auto w-content items-stretch justify-center gap-10'>
				<main
					className={`mb-auto flex max-w-8xl flex-col items-center ${className}`}
				>
					{children}
				</main>
				{hasSidebar && <Sidebar />}
			</div>
			<Footer />
		</div>
	)
}
export default Layout
