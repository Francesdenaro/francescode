import { MenuItem } from '@/Types'
import Navbar from './Navbar'

interface LayoutProps {
	children: React.ReactNode
	navbarLinks: MenuItem[]
}

const Layout = ({ children, navbarLinks }: LayoutProps) => {
	return (
		<>
			<Navbar links={navbarLinks} />
			{children}
		</>
	)
}
export default Layout
