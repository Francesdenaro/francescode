import Layout from '@/components/Layout'
import client from '@/lib/sanity'
import { Post } from '@/Types'
import { Slug } from '@sanity/types'

export default function Posts() {
	return (
		<Layout>
			<h1>Posts</h1>
		</Layout>
	)
}

export async function getStaticProps({ params }: { params: { slug: Slug } }) {
	const posts = await client.fetch(
		`*[_type == "post" && slug.current == $slug][0]`,
		{
			slug: params.slug,
		}
	)
	return {
		props: {
			posts,
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
