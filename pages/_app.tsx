import Layout from '@/components/Layout'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import '@fontsource/fira-sans/400.css'
import '@fontsource/fira-sans/500.css'
import '@fontsource/fira-sans/600.css'
import '@fontsource/fira-sans/700.css'
import '@fontsource/fira-sans/800.css'
import {
	StateMachineProvider,
	createStore,
} from 'little-state-machine'

createStore({
	filters: {
		category: null,
		tags: null,
	},
})

export default function App({ Component, pageProps }: AppProps) {
	return (
		<StateMachineProvider>
			<Component {...pageProps} />
		</StateMachineProvider>
	)
}
