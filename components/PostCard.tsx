import { urlFor } from '@/lib/sanity'
import Link from 'next/link'
import Image from 'next/image'
import moment from 'moment'
import React from 'react'
import { Post } from '@/Types'

export default function PostCard({ post }: { post: Post }) {
	return (
		<li
			key={post.title}
			className='overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:shadow-hard hover:shadow-primary'
		>
			<article className='flex flex-col items-start '>
				{post.mainImage && (
					<Link className='overflow-hidden' href={`/posts/${post.slug}`}>
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
						<Link href={`/posts/${post.slug}`}>{post.title}</Link>
					</h2>
					<p className='text-gray-700 py-5'>{post.excerpt}</p>
				</div>
			</article>
		</li>
	)
}
