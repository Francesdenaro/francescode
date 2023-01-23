import moment from 'moment'
import Layout from '@/components/Layout'
import client, { urlFor } from '@/lib/sanity'
import { Category, Post } from '@/Types'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import React, { useState } from 'react'
import Button from '@/components/Button'

export default function Posts({
	posts,
	categories,
}: {
	posts: Post[]
	categories: Category[]
}) {
	const [loadedPosts, setLoadedPosts] = useState<Post[]>(posts)
	const [lastPostDate, setLastPostDate] = useState<string>(
		posts[posts.length - 1].publishedAt
	)

	const loadMorePosts = async () => {
		if (lastPostDate === '') return
		const nextPosts = await client.fetch(
			`*[_type == "post" && publishedAt < $lastPostDate] | order(publishedAt desc) {
				"slug": slug.current,
				title,
				excerpt,
				"categories": categories[]->{title, "slug": slug.current},
				mainImage,
				publishedAt,
				author->{name}
			}[0...2]`,
			{ lastPostDate }
		)

		if (!nextPosts.length) {
			setLastPostDate('')
			return
		} else {
			setLastPostDate(nextPosts[nextPosts.length - 1].publishedAt)
			setLoadedPosts(prev => [...prev, ...nextPosts])
		}
	}

	console.log(loadedPosts, posts)
	return (
		<>
			<Head>
				<title>All Posts | FrancesCode</title>
				<meta name='description' content='All FrancesCode ' />
			</Head>
			<Layout hasSidebar={false}>
				<h1 className='mb-10 text-3xl text-primary'>FrancesCode Posts</h1>
				<ul className='grid grid-cols-1 px-4 xs:px-16 sm:px-28 md:grid-cols-2 md:gap-8 md:px-10 lg:grid-cols-3 lg:px-0 xl:gap-16'>
					{loadedPosts.map(post => (
						<li
							key={post.title}
							className='overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:shadow-hard hover:shadow-primary'
						>
							<article className='flex flex-col items-start '>
								{post.mainImage && (
									<Link className='overflow-hidden' href={`/${post.slug}`}>
										<Image
											width={500}
											height={100}
											alt={post.mainImage.alt}
											src={urlFor(post.mainImage.asset).url()}
											className='transition-all duration-300 hover:scale-105'
										/>
									</Link>
								)}
								<div className='flex flex-col py-4 px-6'>
									<div className='py-2 text-xs lowercase text-gray'>
										🗓 {moment(post.publishedAt).format('DD MMMM YYYY')}
									</div>
									<span>
										{post.categories.map((category, index) => (
											<React.Fragment key={category.title}>
												<Link
													className='text-sm uppercase text-primary hover:underline'
													href={`/category/${category.slug}`}
												>
													{category.title}
												</Link>
												{index !== post.categories.length - 1 && (
													<span className='text-primary'>{' / '}</span>
												)}
											</React.Fragment>
										))}
									</span>
									<h2 className='text-2xl font-semibold text-primary'>
										<Link href={`/${post.slug}`}>{post.title}</Link>
									</h2>
									<p className='text-gray-700 py-5'>{post.excerpt}</p>
								</div>
							</article>
						</li>
					))}
					<li className='flex flex-col items-center justify-center'>
						{lastPostDate ? (
							<Button onClick={() => loadMorePosts()} text='Load more' />
						) : (
							<p className='text-xl'>That&apos;s it, no more posts 🙂</p>
						)}
					</li>
				</ul>
			</Layout>
		</>
	)
}

export async function getStaticProps() {
	const posts = await client.fetch(
		`*[_type == "post"] | order(publishedAt desc) [0...2] {
			"slug": slug.current,
			title,
			excerpt,
			"categories": categories[]->{title, "slug": slug.current},
			mainImage,
			publishedAt,
			author->{name}
		}`
	)

	const categories = await client.fetch(`*[_type == "category"]`)

	return {
		props: {
			posts,
			categories,
		},
		revalidate: 10,
	}
}
