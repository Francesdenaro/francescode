import Head from 'next/head'
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
		<>
			<Head>
				<link rel='icon' href='/logo.png' />
			</Head>
			<div className='flex min-h-screen flex-col'>
				<Navbar />
				<div className='mx-auto mb-auto flex h-auto w-content items-stretch justify-center gap-10'>
					<main
						className={`mb-auto flex ${
							hasSidebar ? 'w-full max-w-4xl' : 'w-content'
						} max-w-8xl flex-col items-start ${className}`}
					>
						{children}
					</main>
					{hasSidebar && <Sidebar />}
				</div>
				<Footer />
			</div>
		</>
	)
}
export default Layout
