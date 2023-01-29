import Button from '@/components/Button'
import Filters from '@/components/Filters'
import Layout from '@/components/Layout'
import PostCard from '@/components/PostCard'
import client from '@/lib/sanity'
import { Author, Category, Post } from '@/Types'
import { useStateMachine } from 'little-state-machine'
import Head from 'next/head'
import React, { useState } from 'react'

interface Props {
	posts: Post[]
	slug: string
	author: Author
}

export default function AuthorPage({ posts, slug, author }: Props) {
	const [loadedPosts, setLoadedPosts] = useState<Post[]>(posts)
	const [lastPostDate, setLastPostDate] = useState<string>(
		posts ? posts[posts.length - 1].publishedAt : ''
	)

	const { state } = useStateMachine()

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
			}[0...10]`,
			{ lastPostDate, slug }
		)

		if (!nextPosts?.length) {
			setLastPostDate('')
			return
		} else {
			setLastPostDate(nextPosts[nextPosts?.length - 1].publishedAt)
			setLoadedPosts(prev => [...prev, ...nextPosts])
		}
	}

	return (
		<>
			<Head>
				<title>{author?.name}&apos;s Posts | FrancesCode</title>
				<meta name='description' content={`In this page you will find all the posts published by ${author?.name}`} />
			</Head>
			<Layout hasSidebar={false}>
				<h1 className='text-3xl text-primary'>All posts published by <em className='not-italic font-bold'>{author?.name}</em></h1>
				<Filters showTags refetch={refetch}/>
				<ul className='grid grid-cols-1 px-4 xs:px-16 sm:px-28 md:grid-cols-2 md:gap-8 md:px-10 lg:grid-cols-3 lg:px-0 xl:gap-16'>
					{loadedPosts &&
						loadedPosts.map(post => (
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
		`*[_type == "post" && author->slug.current match $slug] | order(publishedAt desc) [0...10] {
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

	const author = await client.fetch(
		`*[_type == "author" && slug.current == $slug][0] {
				name,
				bio,
			}`,
		{ slug: params.slug }
	)

	return {
		props: { posts, slug: params.slug, author },
	}
}

export async function getStaticPaths() {
	const categories = await client.fetch(`*[_type == "author"]`)

	return {
		paths: categories.map((author: Author) => ({
			params: { slug: author.slug.current },
		})),
		fallback: true,
	}
}
