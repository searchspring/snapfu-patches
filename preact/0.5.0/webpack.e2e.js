const path = require('path');

module.exports = {
	mode: 'production',
	entry: './package.json',
	devServer: {
		server: 'https',
		port: 3333,
		hot: false,
		allowedHosts: 'all',
		headers: {
			'Access-Control-Allow-Origin': '*',
		},
		static: [{
			directory: path.join(__dirname, 'public'),
			publicPath: ['/'],
			watch: false,
		},{
			directory: path.join(__dirname, 'dist'),
			publicPath: ['/'],
			watch: false,
		}],
		client: {
			overlay: false,
		},
	},
};