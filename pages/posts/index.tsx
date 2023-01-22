import moment from 'moment'
import Layout from '@/components/Layout'
import client, { urlFor } from '@/lib/sanity'
import { Category, Post } from '@/Types'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'

export default function Posts({
	posts,
	categories,
}: {
	posts: Post[]
	categories: Category[]
}) {
	return (
		<>
			<Head>
				<title>All Posts | FrancesCode</title>
				<meta name='description' content='All FrancesCode ' />
			</Head>
			<Layout>
				<h1 className='mb-10 text-3xl text-primary'>FrancesCode Posts</h1>
				<ul className='divide-y divide-light-gray'>
					{posts.map(post => {
						const postCategories =
							post.categories &&
							categories.filter(category =>
								post.categories.filter(cat => cat._ref === category._id)
							)
						return (
							<li key={post.title} className='py-4'>
								<article className='flex items-start'>
									{post.mainImage && (
										<Link
											className='contents overflow-hidden'
											href={post.slug.current}
										>
											<Image
												width={400}
												height={100}
												alt={post.mainImage.alt}
												src={urlFor(post.mainImage.asset).url()}
												className='rounded-lg p-6 transition-all duration-300
												hover:scale-105'
											/>
										</Link>
									)}
									<div className='flex flex-col'>
										<span>
											{postCategories &&
												postCategories.map((category, index) => {
													return (
														<>
															<Link
																className='text-sm uppercase text-primary hover:underline'
																href={`/category/${category.slug.current}`}
															>
																{category.title}
															</Link>
															{index !== postCategories.length - 1 && (
																<span className='text-primary'>{' / '}</span>
															)}
														</>
													)
												})}
										</span>
										<h2 className='text-2xl font-semibold text-primary'>
											<Link href={`/${post.slug}`}>{post.title}</Link>
										</h2>
										<p className='text-gray-700 border-b border-light-gray py-5'>
											{post.excerpt}
										</p>
										<div className='self-end py-2 text-sm uppercase text-gray'>
											{moment(post.publishedAt).format('DD MMMM YYYY')}
										</div>
									</div>
								</article>
							</li>
						)
					})}
				</ul>
			</Layout>
		</>
	)
}

export async function getStaticProps() {
	const posts = await client.fetch(
		`*[_type == "post"] | order(publishedAt desc)`
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
