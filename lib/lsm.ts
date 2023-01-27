export function setCategoryFilter(state: any, category: any) {
	return {
		...state,
		filters: {
			...state.filters,
			category,
		},
	}
}
export function setTagFilter(state: any, tags: any) {
	return {
		...state,
		filters: {
			...state.filters,
			tags,
		},
	}
}
