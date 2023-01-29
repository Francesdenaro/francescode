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
				<link rel='icon' href='/logo-blu.webp' />
			</Head>
			<div className='flex min-h-screen flex-col'>
				<Navbar />
				<main className='mx-auto mb-auto flex h-auto w-full items-stretch justify-center gap-10 p-4 pb-16 xl:w-content'>
					<div
						className={`mb-auto flex ${
							hasSidebar ? 'w-full max-w-4xl' : 'w-content'
						} max-w-8xl flex-col items-start gap-8 ${className}`}
					>
						{children}
					</div>
					{hasSidebar && <Sidebar />}
				</main>
				<Footer />
			</div>
		</>
	)
}
export default Layout
