import Layout from '@/components/Layout'
import client, { urlFor } from '@/lib/sanity'
import { Post } from '@/Types'
import { PortableText } from '@portabletext/react'
import { Slug } from '@sanity/types'
import Image from 'next/image'

export default function Posts({ post }: { post: Post }) {
	const slugify = (text?: string) => {
		if (!text) return ''
		return text
			.toString()
			.toLowerCase()
			.replace(/\s+/g, '-') // Replace spaces with -
			.replace(/[^\w\-]+/g, '') // Remove all non-word chars
			.replace(/\-\-+/g, '-') // Replace multiple - with single -
			.replace(/^-+/, '') // Trim - from start of text
			.replace(/-+$/, '') // Trim - from end of text
	}
	return post ? (
		<Layout>
			<Image
				src={post ? urlFor(post.mainImage.asset).url() : ''}
				alt={post ? post.mainImage.alt : ''}
				width={800}
				height={600}
				className='mb-10 rounded-2xl shadow-md '
			/>
			<article className='prose prose-headings:font-medium prose-headings:text-primary prose-blockquote:text-primary lg:prose-xl'>
				<h1 className='font-semibold text-primary md:text-5xl'>{post.title}</h1>
				<PortableText
					value={post.body}
					components={{
						types: {
							image: ({ value }) => {
								return (
									<Image
										src={urlFor(value.asset).url()}
										alt={value.alt ? value.alt : 'image'}
										width={500}
										height={300}
										className='mb-10 shadow-md '
									/>
								)
							},
						},
						block: {
							h2: ({ children }) => (
								<h2
									id={slugify(children?.toString())}
									className='text-2xl font-semibold text-primary'
								>
									{children}
								</h2>
							),
						},
						marks: {
							strong: ({ children }) => (
								<em className='font-semibold not-italic'>{children}</em>
							),
						},
					}}
				/>
			</article>
		</Layout>
	) : (
		<Layout>
			<h1 className='text-2xl font-semibold text-primary'>Loading...</h1>
		</Layout>
	)
}

export async function getStaticProps({ params }: { params: { slug: Slug } }) {
	const post = await client.fetch(
		`*[_type == "post" && slug.current == $slug][0]`,
		{
			slug: params.slug,
		}
	)
	return {
		props: {
			post,
		},
		revalidate: 10,
	}
}

export async function getStaticPaths() {
	const posts = await client.fetch(`*[_type == "post"]`)

	return {
		paths: posts.map((post: Post) => ({
			params: { slug: post.slug.current },
		})),
		fallback: true,
	}
}
