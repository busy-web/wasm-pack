
const express = require('express');
const livereload = require('livereload');
//const connLivereload = require('connect-livereload');
const path = require('path');
const fs = require('fs');

//module.exports = function(opts) {
	let opts = process.env || {};
	/**
	* create new express server
	*/
	const app = module.exports = express();

	//app.use(connLivereload({ port: 35729, include: ['dist/*'] }));

	/**
	* dir that express will serve files from
	*
	*/
	const root = `${__dirname}/dist/`;

	/**
	* calculates the size of a file to return for the request
	*
	*/
	function fileSize(filename) {
		const fd = fs.openSync(path.join(root, filename), 'r+');
		const stats = fs.fstatSync(fd);
		fs.closeSync(fd);
		return stats['size'];
	}

	app.get('/', function (req, res, next) {
		const options = { root, headers: { 'x-timestamp': Date.now(), 'x-sent': true, } };
		res.sendFile('index.html', options, function (err) {
			if (err) {
				next(err);
			}
		});
	});

	app.get('/:name', function (req, res, next) {
		const fileName = req.params.name;

		const options = { 
			root, 
			headers: { 
				'x-timestamp': Date.now(), 
				'x-sent': true, 
				'Connection': 'close',
			} 
		};

		const ext = path.extname(fileName);
		if (ext.toLowerCase() === '.wasm') {
			options.headers['Content-Type'] = `application/wasm`;
			
			const size = fileSize(fileName);
			options.headers['Content-Length'] = size;
		}

		res.sendFile(fileName, options, function (err) {
			if (err) {
				next(err);
				res.sendStatus(404);
			}
		});
	});

	app.listen(opts.port || 5200);

	const server = livereload.createServer({ });

	server.watch(['dist/*/**.html', 'dist/**/*.js', 'dist/**/*.wasm']);
//};
