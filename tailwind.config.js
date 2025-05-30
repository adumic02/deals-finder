/** @type {import('tailwindcss').Config} */
const { nextui } = require('@nextui-org/react');

module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./components/**/*.{js,ts,jsx,tsx,mdx}',
		'./app/**/*.{js,ts,jsx,tsx,mdx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
	],
	plugins: [
		nextui({
			themes: {
				dark: {
					colors: {
						background: '#0B0C10',
						foreground: '#FFF',
						primary: {
							DEFAULT: '#66FCF1',
							600: '#66FCF1',
						},

						success: {
							200: '#4A9F16',
							400: '#82DD2C',
							600: '#C4F47F',
						},

						warning: {
							600: '#D6EA5D',
							400: '#FFE66F',
							200: '#DB8C0A',
						},

						danger: {
							600: '#fe6b3e',
							400: '#B62C1F',
							200: '#790B11',
						},
					},
				},
			},
		}),
	],
	safelist: [
		'bg-primary',
		'bg-success-200',
		'bg-success-400',
		'bg-success-600',
		'bg-warning-200',
		'bg-warning-400',
		'bg-warning-600',
		'bg-danger-200',
		'bg-danger-400',
		'bg-danger-600',
	],
};
