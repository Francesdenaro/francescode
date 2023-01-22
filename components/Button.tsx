import Link from 'next/link'

interface Props {
	text: string
	link?: boolean
	href?: string
	onClick?: (event: React.MouseEvent) => void
}

const Button = ({ text, link = false, href = '', onClick }: Props) => {
	const classes =
		'inline-flex no-underline uppercase text-lg tracking-wide text-white bg-primary items-center rounded border border-primary px-3 py-2 hover:bg-white hover:text-primary transition-all hover:shadow-hard'

	return link ? (
		<Link className={classes} href={href}>
			{text}
		</Link>
	) : (
		<button onClick={onClick} className={classes}>
			{text}
		</button>
	)
}
export default Button
