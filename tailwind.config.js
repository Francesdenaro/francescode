const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		colors: {
			transparent: 'transparent',
			current: 'currentColor',
			black: '#000',
			white: '#fff',
			primary: '#1d73be',
			'primary-light': '#1d73be',
			'light-gray': '#e9e9e9',
			gray: '#ababab',
		},
		fontFamily: {
			sans: ['Fira Sans', 'serif'],
		},
		extend: {
			boxShadow: {
				hard: '7px 7px 0 0',
			},
			maxWidth: {
				'8xl': '88rem',
			},
			width: {
				content: '1280px',
			},
		},
	},
	plugins: [require('@tailwindcss/typography')],
}
