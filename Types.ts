export interface MenuItem {
	title: string
	link: string
}

export interface Section {
	title: string
	link: {
		title: string
		link: string
	}
	body: {
		children: {
			text: string
		}[]
	}
}
export interface PageData {
	title: string
	metaTitle: string
	metaDescription: string
	sections: Section[]
}
