module.exports = {
	globDirectory: 'public/',
	globPatterns: [
		'**/*.{webmanifest,css,js,png,svg,html}'
	],
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	],
	swDest: 'public/build/service-worker.js'
};
