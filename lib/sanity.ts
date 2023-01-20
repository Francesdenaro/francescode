import { createClient } from 'next-sanity'

const client = createClient({
	projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
	dataset: 'production',
	apiVersion: '2022-03-25',
	useCdn: false,
})

export default client
