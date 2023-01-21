import { TypedObject } from '@sanity/types'

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
