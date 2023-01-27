import 'little-state-machine'

declare module 'little-state-machine' {
	interface GlobalState {
		filters: {
			category: { label: string; value: string } | null
			tags: { label: string; value: string }[] | null
		}
	}
}
