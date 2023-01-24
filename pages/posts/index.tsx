import Layout from '@/components/Layout'
import client from '@/lib/sanity'
import { Post } from '@/Types'
import Head from 'next/head'
import React, { useState } from 'react'
import Button from '@/components/Button'
import PostCard from '@/components/PostCard'

export default function Posts({ posts }: { posts: Post[] }) {
	const [loadedPosts, setLoadedPosts] = useState<Post[]>(posts)
	const [lastPostDate, setLastPostDate] = useState<string>(
		posts[posts.length - 1]?.publishedAt
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
						<React.Fragment key={post.slug.toString()}>
							<PostCard post={post} />
						</React.Fragment>
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
