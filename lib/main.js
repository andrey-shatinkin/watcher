// simpl-watch : watchit

var exec = require( 'child_process' ).exec,
	 path = require('path'),
	 fs = require('fs'),
	 chokidar = require('chokidar'),
	 colors = require('colors');

colors.setTheme({
  silly: 'rainbow',
  input: 'grey',
  verbose: 'cyan',
  prompt: 'grey',
  info: 'green',
  data: 'grey',
  help: 'cyan',
  warn: 'yellow',
  debug: 'blue',
  error: 'red'
});
		
process.argv.forEach(function (val, index, array) {
  console.log(index + ': ' + val);
});


// ------------------------------- Read package.json //

var configFilePath = path.normalize( __dirname + '/../watcher.json');

/*
configFile = fs.readFile( configFile, 'utf8', function ( err, data ) {
	if ( err ) {
		console.log('ERROR: '.red, err);
		return;
	}
}

*/

var configFile = fs.readFileSync( configFilePath, 'utf8', function ( err, data ) {
	if ( err ) {
		console.log('ERROR: '.red, err);
		return;
	}
});

var config = JSON.parse(data);
console.log('config obj'.blue, config);



	// ------------------------------- Read package.json : End //

	// ------------------------------- watch files //

	var watcher = chokidar.watch( dirToWatch, { persistent: true } );

	watcher
		.on('add', function(path) {
			console.log('File', path, 'has been added');
			// compile the new file to the compiled files list
			cmd += ' ' + path;
			exec(cmd, function( err, stdout, stderr ) {
				console.log(err, stdout, stderr);
			});
		})
		.on('change', function(path) {
			console.log('File', path, 'has been changed');
			// compile the changed file

			// add the changed file name to command for compilation
			cmd += ' ' + path;
			exec(cmd, function( err, stdout, stderr ) {
				console.log(err, stdout, stderr);
			});
		})
		.on('unlink', function(path) {
			console.log('File', path, 'has been removed');
			// delete corresponding compiled file

		})
		.on('error', function(error) {console.error('Error happened ', error);})


