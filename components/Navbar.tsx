import client from '@/lib/sanity'
import { MenuItem } from '@/Types'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Navbar = () => {
	const [links, setLinks] = useState<MenuItem[]>([])
	const [isLoaded, setIsLoaded] = useState<boolean>(false)
	const [isNavOpen, setIsNavOpen] = useState<boolean>(false)
	const fetchLinks = async () => {
		const links = await client.fetch(
			'*[_type == "menu" && identifier == "main"][0]'
		)
		return links.items
	}

	useEffect(() => {
		fetchLinks().then((links: MenuItem[]) => {
			setLinks(links)
			setIsLoaded(true)
		})
	}, [])

	return (
		<header className='mb-12 flex flex-wrap items-center justify-between bg-primary px-10 py-4 text-white shadow-lg transition-all'>
			<div className='mr-6 flex flex-shrink-0 items-center'>
				<Link href='/' className='text-xl font-semibold tracking-tight'>
					<Image
						src='/logo-francescode.webp'
						alt='logo'
						width={50}
						height={50}
					/>
				</Link>
			</div>
			<div className='block lg:hidden'>
				<button
					onClick={() => {
						setIsNavOpen(!isNavOpen)
					}}
					className='border-gray-600 hover:border-gray-800 flex items-center rounded border px-3 py-2'
				>
					<svg
						className='h-3 w-3 fill-current'
						viewBox='0 0 20 20'
						xmlns='http://www.w3.org/2000/svg'
					>
						<title>Menu</title>
						<path d='M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z' />
					</svg>
				</button>
			</div>
			{isLoaded ? (
				<nav
					className={`${
						isNavOpen ? 'block' : 'hidden'
					} w-full lg:flex lg:w-auto lg:items-center`}
				>
					{links.map((link: MenuItem, index) => (
						<Link
							key={index}
							href={`/${link.link ? link.link : ''}`}
							className='group mt-4 mr-4 block lg:mt-0 lg:inline-block'
						>
							{link.title}
							<span className='block h-0.5 max-w-0 bg-white transition-all duration-500 group-hover:max-w-full'></span>
						</Link>
					))}
				</nav>
			) : (
				<nav></nav>
			)}
		</header>
	)
}

export default Navbar
