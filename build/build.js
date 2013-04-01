var request = require('superagent');
var fs = require('fs-extra');
var http = require('http-get');
var rjs = require('requirejs');
var knox = require('knox');
var glob = require("glob")
var clc = require('cli-color');

// CONFIG 

var cloudfront_production = 'https://d50sg51l36z7c.cloudfront.net';
var cloudfront_stage = 'https://d51ivijxlr7mx.cloudfront.net';
var cloudfront_vagrant = 'https://vagrant-client.apiengine.io:40443';

var server_production = 'https://x.apiengine.io';
var server_staging = 'https://s.apiengine.io';

// Logging helpers

var types = {
  default: clc.black,
  error: clc.red.bold,
  warn: clc.yellow,
  heading: clc.blue.bold.underline,
  label: clc.blue.bold,
  action: clc.xterm(8).italic
};

var log = function (message, _type) {
  var type = _type || types.default;
  console.log(type(message) + '\n');
}

// Start build
var program = require('commander');

program
  .version('0.0.1')
  .option('-e, --environment [environment]', 'Which enviroment, development, vagrant, stage or production? Changes where assets are pulled from', 'develop')
  .option('-s, --server [server]', 'Is there a custom server url for this build? (https://*) Changes what API server you use')
  .parse(process.argv);



log('Api Engine Client Builder', types.heading)

var server = null;
var cloudfront = null;

if(program.environment === 'stage') {
  cloudfront = cloudfront_stage;
  log('Staging enviroment selected', types.label)
  server = server_staging;

} else if (program.environment === 'production' ) {
  log('Production enviroment selected', types.label)
  cloudfront = cloudfront_production;
  server = server_production;

} else if(program.environment === 'vagrant') {
  var cloudfront = cloudfront_vagrant;
  server = server_staging;
  log('Vagrant enviroment selected', types.label)

} else {
  server = server_staging;
  log('Development enviroment selected', types.label)
}

if(program.server) {
  log('Custom server url selected', types.label)

  server = program.server;
}


var version = Date.now();
var outputFolder = 'output/version/' + version
log('Starting build');
var startTime = Date.now();

log('Create output folders', types.action);

fs.removeSync('output');
fs.mkdirSync('output');
fs.mkdirSync('output/version');
fs.mkdirSync(outputFolder);


var rootPath = '..';
log('Running require.js optimizer', types.action)

  rjs.optimize({
    dir: outputFolder + '/js',
    mainConfigFile: rootPath + '/js/main.js',
    removeCombined: true,
    findNestedDependencies: false,
    paths: {
      'jquery': 'empty:',
      'mustache': 'empty:',
      'backbone': 'empty:',
      'underscore': 'empty:'
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
log('Optimization finished', types.action)
log('Editing index.html to contain new enviroment variables', types.action)

var index = fs.readFileSync(rootPath + '/index.html', 'ascii');
index = index.replace('<base href="/repos/apiengine-client/" />', '');
if(cloudfront) {
  index = index.replace('css/styles.css', cloudfront + '/version/' + version + '/css/styles.css');
  index = index.replace(' data-main="js/main"', ' data-main="' + cloudfront + '/version/' + version + '/js/main"');
} else {
  index = index.replace('css/styles.css', 'version/' + version + '/css/styles.css');
  index = index.replace(' data-main="js/main"', ' data-main="version/' + version + '/js/main"');

}

index = index.replace('<meta data-server-url="https://s.apiengine.io" />', '<meta data-server-url="'+server+'" />')


log('Optimization css with require.js', types.action)

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
log('Copying accross more needed files', types.action)

  fs.copy(rootPath + '/googleaa49fe030680ef6c.html', 'output/googleaa49fe030680ef6c.html', function (){
  fs.copy(rootPath + '/site.xml', 'output/site.xml', function (){
  fs.copy(rootPath + '/.htaccess', 'output/.htaccess', function (){
  fs.copy(rootPath + '/favicon.ico', 'output/favicon.ico', function (){
    fs.copy(rootPath + '/css/img', outputFolder +'/css/img', function () {
    fs.copy(rootPath + '/img', outputFolder +'/img', function () {
      fs.copy(rootPath + '/css/fonts', outputFolder +'/css/fonts', function () {
log('Embedding images into CSS', types.action)
        
cssIncImages(outputFolder + '/css/styles.css');
      fs.copy('output', 'relic', function () {
        var endTime = (Date.now() - startTime) / 1000;
log('Build finished!', types.heading)
log('Finished in ' + endTime + ' seconds', types.label)
        
});
      });
      });
      });
    });
    });
  });
  });

