import Link from 'next/link'

export default function Footer() {
	return (
		<footer className='flex flex-col items-center divide-y bg-primary text-center text-white'>
			<div className='flex w-full items-start gap-4 py-4 px-6 xl:w-content'>
				<nav className='flex flex-col items-start gap-2'>
					<span className='text-2xl'>Pages</span>
					<ul className='flex w-40 flex-col divide-y'>
						<li className='py-1 pl-2 text-left'>
							<Link href='/'>Home</Link>
						</li>
						<li className='py-1 pl-2 text-left'>
							<Link href='/posts'>Posts</Link>
						</li>
						<li className='py-1 pl-2 text-left'>
							<Link href='/about'>About me</Link>
						</li>
					</ul>
				</nav>
			</div>
			<div className='w-full py-2 text-sm'>
				&copy; {new Date().getFullYear()} FrancesCode. All rights reserved.
			</div>
		</footer>
	)
}
