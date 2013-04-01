var request = require('superagent');
var fs = require('fs-extra');
var http = require('http-get');
var rjs = require('requirejs');
var knox = require('knox');
var glob = require("glob")

console.log(process.argv);

var cloudfront = 'https://d3oqwi49u9bqjg.cloudfront.net';

if(process.argv[2] === 'stage') {
  cloudfront = 'https://d51ivijxlr7mx.cloudfront.net';
} else if (process.argv[2] === 'vagrant') {
  cloudfront = 'https://vagrant-client.apiengine.io:40443';
}


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
    dir: outputFolder + '/js',
    mainConfigFile: rootPath + '/js/main.js',
    removeCombined: true,
    findNestedDependencies: false,
    paths: {
      'jquery': 'empty:',
      'mustache': 'empty:',
      'underscore': 'empty:',
      'addthis': 'empty:'
    },
    modules: [
      {
        name: 'main'
      },
      {
        name: 'views/home/page',
        exclude: ['main']
      },
      {
        name: 'views/home/pricing',
        exclude: ['main']
      },
      {
        name: 'views/help/page',
        exclude: ['main']
      },
      {
        name: 'views/home/features',
        exclude: ['main']
      },
      {
        name: 'views/legal/page',
        exclude: ['main']
      }
    ]
});
var index = fs.readFileSync(rootPath + '/index.html', 'ascii');
index = index.replace('css/styles.css', cloudfront + '/version/' + version + '/css/styles.css');
index = index.replace('<base href="/repos/apiengine-client/" />', '');
index = index.replace(' data-main="js/main"', ' data-main="' + cloudfront + '/version/' + version + '/js/main"');
fs.writeFileSync('output/index.html', index);
  rjs.optimize({
    cssIn: rootPath + '/css/styles.css',
    out: outputFolder + '/css/styles.css'
});

var path = require('path');

function cssIncImages(cssFile) {
  var imgRegex = /url\s?\(['"]?(\.\.\/img.*?)\?embed(?=['"]?\))/gi;
  var css = fs.readFileSync(cssFile, 'utf-8');
  while (match = imgRegex.exec(css)) {
    var imgPath = path.join(path.dirname(cssFile), match[1]);
    try {
      var img = fs.readFileSync(imgPath, 'base64');
      var ext = imgPath.substr(imgPath.lastIndexOf('.') + 1);
      css = css.replace(match[1] + '?embed', 'data:image/' + ext + ';base64,' + img);
    } catch (err) {
      console.log('Image not found (%s).', imgPath);
    }
  }
   fs.writeFileSync(cssFile, css, 'utf-8'); // you can overwrite the original file with this line
  return css;
}

  fs.copy(rootPath + '/googleaa49fe030680ef6c.html', 'output/googleaa49fe030680ef6c.html', function (){
  fs.copy(rootPath + '/site.xml', 'output/site.xml', function (){
  fs.copy(rootPath + '/.htaccess', 'output/.htaccess', function (){
  fs.copy(rootPath + '/favicon.ico', 'output/favicon.ico', function (){
    fs.copy(rootPath + '/css/img', outputFolder +'/css/img', function () {
    fs.copy(rootPath + '/img', outputFolder +'/img', function () {
      fs.copy(rootPath + '/css/fonts', outputFolder +'/css/fonts', function () {

cssIncImages(outputFolder + '/css/styles.css');
      fs.copy('output', 'relic', function () {

        var endTime = (Date.now() - startTime) / 1000;
});
      });
      });
      });
    });
    });
  });
  });
