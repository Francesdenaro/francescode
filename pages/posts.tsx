import Layout from '@/components/Layout'
import client from '@/lib/sanity'
import { Post } from '@/Types'
import Head from 'next/head'
import React, { useState } from 'react'
import Button from '@/components/Button'
import PostCard from '@/components/PostCard'
import Filters from '@/components/Filters'
import { useStateMachine } from 'little-state-machine'
import Link from 'next/link'

export default function Posts({ posts }: { posts: Post[] }) {
	const { state } = useStateMachine()
	const [loadedPosts, setLoadedPosts] = useState<Post[]>(posts)
	const [lastPostDate, setLastPostDate] = useState<string>(
		posts ? posts[posts.length - 1].publishedAt : ''
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
				"tags": tags[]->{title},
				author->{name}
			}[0...10]`,
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

	const refetch = async () => {
		const { category, tags } = state.filters
		const fields = `| order(publishedAt desc) {
			"slug": slug.current,
			title,
			excerpt,
			"categories": categories[]->{title, "slug": slug.current},
			mainImage,
			publishedAt,
			"tags": tags[]->{title},
			author->{name}
		}[0...10]`
		let posts: Post[] = []

		console.log('category', category)

		if (category && !tags) {
			posts = await client.fetch(
				`*[_type == "post" && "$category" in categories[]->_id] ${fields}`,
				{ category: category.value }
			)
			setLoadedPosts(posts)
			setLastPostDate(posts[posts.length - 1].publishedAt)
		} else if (!category && tags) {
			posts = await client.fetch(
				`*[_type == "post" && $tags in tags[]->_id] ${fields}`,
				{ tags }
			)
			setLoadedPosts(posts)
			setLastPostDate(posts[posts.length - 1].publishedAt)
		} else if (category && tags) {
			console.log('category and tags', category, tags)
			posts = await client.fetch(
				`*[_type == "post" ${
					category && '&& "$category" in categories[]->_id'
				} ${tags && '&& $tags in tags[]->_id'}] ${fields}`,
				{ category: category.value, tags }
			)
		}
		if (!posts.length) {
			setLoadedPosts([])
			setLastPostDate('')
			return
		}
		setLoadedPosts(posts)
		setLastPostDate(posts[posts.length - 1].publishedAt)
	}
	return (
		<>
			<Head>
				<title>All Posts | FrancesCode</title>
				<meta
					name='description'
					content='On this page, you will find all the blog posts you can read on FrancesCode.com. Take a look and find the most interesting for you!'
				/>
			</Head>
			<Layout hasSidebar={false}>
				<h1 className='text-3xl text-primary'>FrancesCode Posts</h1>
				<details className='w-full'>
					<summary className='w-full rounded-lg border-2 border-primary p-4 text-primary shadow'>
						Filters
					</summary>
					<div className='mt-2 p-4 shadow'>
						<Filters showTags showCategories refetch={refetch} />
					</div>
				</details>
				<section
					aria-label='Blog post list'
					className='grid grid-cols-1 gap-4 px-4 xs:px-16 sm:px-28 md:grid-cols-2 md:gap-8 md:px-10 lg:grid-cols-3 lg:px-0 xl:gap-16'
				>
					{loadedPosts &&
						loadedPosts.map(post => (
							<React.Fragment key={post.slug.toString()}>
								<PostCard post={post} />
							</React.Fragment>
						))}
					<div className='flex flex-col items-center justify-center'>
						{lastPostDate ? (
							<Link
								href='#'
								onClick={e => {
									e.preventDefault()
									loadMorePosts()
								}}
							>
								Load more
							</Link>
						) : (
							<p className='text-xl'>That&apos;s it, no more posts 🙂</p>
						)}
					</div>
				</section>
			</Layout>
		</>
	)
}

export async function getStaticProps() {
	const posts = await client.fetch(
		`*[_type == "post"] | order(publishedAt desc) [0...10] {
			"slug": slug.current,
			title,
			excerpt,
			"categories": categories[]->{title, "slug": slug.current},
			mainImage,
			publishedAt,
			"tags:": tags[]->{title},
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
