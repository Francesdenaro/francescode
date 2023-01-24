import Button from '@/components/Button'
import Layout from '@/components/Layout'
import PostCard from '@/components/PostCard'
import client from '@/lib/sanity'
import { Category, Post } from '@/Types'
import Head from 'next/head'
import React, { useState } from 'react'

interface Props {
	posts: Post[]
	slug: string
}

export default function CategoryPage({ posts, slug }: Props) {
	const [loadedPosts, setLoadedPosts] = useState<Post[]>(posts)
	const [lastPostDate, setLastPostDate] = useState<string>(
		posts[posts.length - 1]?.publishedAt
	)

	const loadMorePosts = async () => {
		if (lastPostDate === '') return
		const nextPosts = await client.fetch(
			`*[_type == "post" && categories[]->slug.current match $slug && publishedAt < $lastPostDate] | order(publishedAt desc) {
				"slug": slug.current,
				title,
				excerpt,
				"categories": categories[]->{title, "slug": slug.current},
				mainImage,
				publishedAt,
				author->{name}
			}[0...2]`,
			{ lastPostDate, slug }
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

export async function getStaticProps({ params }: { params: { slug: string } }) {
	const posts = await client.fetch(
		`*[_type == "post" && categories[]->slug.current match $slug] | order(publishedAt desc) [0...2] {
			"slug": slug.current,
			title,
			excerpt,
			"categories": categories[]->{title, "slug": slug.current},
			mainImage,
			publishedAt,
			author->{name}
		}`,
		{
			slug: params.slug,
		}
	)
	console.log(posts)

	return {
		props: { posts, slug: params.slug },
	}
}

export async function getStaticPaths() {
	const categories = await client.fetch(`*[_type == "category"]`)

	return {
		paths: categories.map((category: Category) => ({
			params: { slug: category.slug.current },
		})),
		fallback: true,
	}
}
