var request = require('superagent');
var fs = require('fs-extra');
var http = require('http-get');
var rjs = require('requirejs');
var knox = require('knox');
var glob = require("glob")



var version = Date.now();
var outputFolder = 'output/version/' + version
console.log('Building client');
var startTime = Date.now();

fs.removeSync('output');
fs.mkdirSync('output');
fs.mkdirSync('output/version');
fs.mkdirSync(outputFolder);
var rootPath = '..';
	rjs.optimize({
    name: 'almond',
    include: ['main'],
    out: outputFolder + '/js/main.js',
    findNestedDependencies: true,
    mainConfigFile: rootPath + '/js/main.js',
    wrap: true
});
var index = fs.readFileSync(rootPath + '/index.html', 'ascii');
index = index.replace('js/libs/require/require.js', 'version/' + version + '/js/main.js');
index = index.replace('css/styles.css', 'version/' + version + '/css/styles.css');
index = index.replace(' data-main="js/main"', '');
fs.writeFileSync('output/index.html', index);
	rjs.optimize({
    cssIn: rootPath + '/css/styles.css',
    out: outputFolder + '/css/styles.css'
});
	fs.copy(rootPath + '/googleaa49fe030680ef6c.html', 'output/googleaa49fe030680ef6c.html', function (){
 	fs.copy(rootPath + '/favicon.ico', 'output/favicon.ico', function (){
	 	fs.copy(rootPath + '/img', outputFolder +'/img', function () {
			fs.copy(rootPath + '/css/Aller_Std_Rg.ttf', outputFolder +'/css/Aller_Std_Rg.ttf', function () {
				var endTime = (Date.now() - startTime) / 1000;

	 		});
		});
 	});
	});

