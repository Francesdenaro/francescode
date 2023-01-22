import Link from 'next/link'

export default function Sidebar() {
	return (
		<aside className='hidden w-96 flex-col justify-between bg-primary sm:flex'>
			<div className='flex flex-col items-center py-6'>
				<p className='mt-2 text-sm text-white'>FrancesCode</p>
			</div>
			<div className='flex flex-col items-center'>
				<div className='flex flex-col items-center'>
					<Link href='/'></Link>
					<Link href='/about'></Link>
					<Link className='flex items-center py-2 px-4' href='/'></Link>
				</div>
			</div>
		</aside>
	)
}
