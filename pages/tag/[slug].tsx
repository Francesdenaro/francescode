import Layout from '@/components/Layout'
import client from '@/lib/sanity'
import { Post, Tag } from '@/Types'

interface Props {
	tag: Tag
	posts: Post[]
}

export default function TagPage({ tag, posts }: Props) {
	return (
		<Layout>
			<h1>Category</h1>
		</Layout>
	)
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
	const category = await client.fetch(`*[_type == "tag" && slug == $slug][0]`, {
		slug: params.slug,
	})

	const posts = await client.fetch(`*[_type == "post" && references(^._id)]`)

	return {
		props: { category, posts },
	}
}

export async function getStaticPaths() {
	const categories = await client.fetch(`*[_type == "tag"]`)

	return {
		paths: categories.map((tag: Tag) => ({
			params: { slug: tag.slug.current },
		})),
		fallback: true,
	}
}
