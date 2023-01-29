import client from '@/lib/sanity'
import { useStateMachine } from 'little-state-machine'
import { useEffect, useState } from 'react'
import Select from '@/components/Select'
import { setCategoryFilter, setTagFilter } from '@/lib/lsm'
interface Props {
	showTags?: boolean
	showCategories?: boolean
	refetch: () => void
}

export default function Filters({
	showTags = false,
	showCategories = false,
	refetch,
}: Props) {
	const { actions, state } = useStateMachine({
		setCategoryFilter,
		setTagFilter,
	})

	const [categories, setCategories] = useState([])
	const [tags, setTags] = useState([])

	const handleChange = (item: string, type: string) => {
		if (type === 'category') {
			actions.setCategoryFilter(item)
		} else if (type === 'tag') {
			actions.setTagFilter(item)
		}
		refetch()
	}

	const fetchCategories = async () => {
		const categories = await client.fetch(
			`*[_type == "category"] | order(title asc) {
				_id,
				"title": title
			}`
		)
		return categories
	}

	const fetchTags = async () => {
		const tags = await client.fetch(
			`*[_type == "tag"] | order(title asc) {
				_id,
				"title": title
			}`
		)
		return tags
	}

	useEffect(() => {
		fetchCategories().then(categories => {
			const catOptions = categories.map(
				(cat: { _id: string; title: string }) => ({
					value: cat._id,
					label: cat.title,
				})
			)
			setCategories(catOptions)
		})

		fetchTags().then(tags => {
			const tagOptions = tags.map((tag: { _id: string; title: string }) => ({
				value: tag._id,
				label: tag.title,
			}))
			setTags(tagOptions)
		})
		actions.setCategoryFilter('')
		actions.setTagFilter('')
	}, [])

	return (
		<div className='flex flex-col gap-8 sm:flex-row'>
			{showCategories && (
				<label className='flex w-80 flex-col gap-2'>
					<Select
						handleChange={handleChange}
						label='Category'
						items={categories}
					/>
				</label>
			)}
			{showTags && (
				<label className='flex w-80 flex-col gap-2'>
					<Select handleChange={handleChange} label='Tag' items={tags} />
				</label>
			)}
		</div>
	)
}
