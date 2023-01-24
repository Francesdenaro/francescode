import client from '@/lib/sanity'
import { useEffect, useState } from 'react'
import Select from 'react-select'

export default function Filters() {
	const [categories, setCategories] = useState([])
	const [tags, setTags] = useState([])

	const fetchCategories = async () => {
		const categories = await client.fetch(
			`*[_type == "category"] | order(title asc) {
				"title": title
			}`
		)
		return categories
	}

	const fetchTags = async () => {
		const tags = await client.fetch(
			`*[_type == "tag"] | order(title asc) {
				"title": title
			}`
		)
		return tags
	}

	useEffect(() => {
		fetchCategories().then(categories => setCategories(categories))
		fetchTags().then(tags => setTags(tags))
	}, [])

	return (
		<div>
			<label className='flex flex-col gap-2'>
				Category
				<Select name='category' isClearable isSearchable />
			</label>
			<label className='flex flex-col gap-2'>
				Tag
				<Select name='tag' />
			</label>
		</div>
	)
}
