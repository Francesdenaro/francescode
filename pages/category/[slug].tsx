import Layout from '@/components/Layout'
import client from '@/lib/sanity'
import { Category, Post } from '@/Types'

interface Props {
	category: Category
	posts: Post[]
}

export default function CategoryPage({ category, posts }: Props) {
	return (
		<Layout>
			<h1>Category</h1>
		</Layout>
	)
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
	const category = await client.fetch(
		`*[_type == "category" && slug == $slug][0]`,
		{ slug: params.slug }
	)

	const posts = await client.fetch(`*[_type == "post" && references(^._id)]`)

	return {
		props: { category, posts },
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
