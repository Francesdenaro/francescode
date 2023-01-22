import { Slug, TypedObject } from '@sanity/types'

export interface MenuItem {
	title: string
	link: string
}

export interface Section {
	identifier: string
	title: string
	link: {
		title: string
		link: string
	}
	body: TypedObject

	image: {
		asset: string
		alt: string
	}
}
export interface PageData {
	title: string
	metaTitle: string
	metaDescription: string
	sections: Section[]
}

export interface Category {
	_id: string
	title: string
	slug: Slug
	description: TypedObject
}

export interface Post {
	title: string
	slug: Slug
	excerpt: string
	publishedAt: string
	mainImage: {
		asset: string
		alt: string
	}
	body: TypedObject
	categories: { slug: string; title: string }[]
	author: Author
	featured: boolean
	metaTitle: string
	metaDescription: string
}

export interface Author {
	name: string
	slug: Slug
	image: {
		asset: string
		alt: string
	}
	bio: TypedObject
}

export interface Tag {
	title: string
	slug: Slug
	description?: TypedObject
}
