import Button from '@/components/Button'
import Layout from '@/components/Layout'
import client, { urlFor } from '@/lib/sanity'
import { PageData, Section } from '@/Types'
import { PortableText } from '@portabletext/react'
import Head from 'next/head'
import Image from 'next/image'

interface Props {
	pageData: PageData
	sections: Section[]
}

export default function Home({ pageData, sections }: Props) {
	const hero = sections.find(section => section.identifier === 'home-hero')
	const shortDev = sections.find(
		section => section.identifier === 'home-short-dev'
	)
	const about = sections.find(section => section.identifier === 'home-about')

	return (
		<Layout hasSidebar={false}>
			<Head>
				<title>Home | FrancesCode</title>
				<meta
					name='description'
					content='So you want to learn how to program? On FrancesCode, you will find tips and resources to become a self-taught developer.'
				/>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<meta
					name='ahrefs-site-verification'
					content='11119246fcb0eef2e9a6453e304fbc63def0a9edb1594b086479ee4e11342122'
				></meta>
			</Head>
			{hero && (
				<section className='flex w-full flex-col gap-12 rounded-3xl p-16 shadow-lg'>
					<h1 className='text-3xl font-normal text-primary sm:text-6xl'>
						{hero.title}
					</h1>
					<div className='flex flex-col items-start justify-between gap-2 lg:flex-row'>
						<div className='prose prose-xl'>
							<PortableText value={hero.body} />
						</div>
						<Image
							loading='eager'
							className='rounded-2xl'
							src={urlFor(hero.image.asset).url()}
							width={250}
							height={100}
							alt={hero.image.alt}
						/>
					</div>
					<div className='self-start'>
						<Button text={hero.link.title} link href={hero.link.link} />
					</div>
				</section>
			)}
			{/* <section>//articles section</section> */}
			{shortDev && (
				<aside className='my-40 w-full rounded-3xl py-12 text-center text-2xl font-bold tracking-wide text-primary shadow-lg'>
					<PortableText value={shortDev.body} />
				</aside>
			)}
			{about && (
				<section className='flex w-full flex-col items-center gap-8 border-b-4 border-primary pb-16'>
					<h2 className='text-5xl font-semibold text-primary'>{about.title}</h2>
					<div className='flex flex-col items-start gap-12 sm:flex-row-reverse'>
						<div className='prose prose-xl max-w-2xl rounded-3xl p-8 shadow-lg'>
							<PortableText value={about.body} />
							<Button text={about.link.title} link href={about.link.link} />
						</div>
						<Image
							className='shadowlg rounded-3xl'
							src={urlFor(about.image.asset).url()}
							width={420}
							height={100}
							alt={about.image.alt}
						/>
					</div>
				</section>
			)}
		</Layout>
	)
}

export async function getStaticProps() {
	const pageData = await client.fetch(
		'*[_type == "page" && identifier == "home"][0]'
	)

	const sections = await client.fetch(
		`*[_type == "section" && identifier match "home-*"]`
	)

	return {
		props: {
			pageData,
			sections,
		},
	}
}
