	// require.js path aliases
require.config({
  paths: {
    // Major libraries
    jquery: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/1.8.2/jquery.min',
    underscore: 'libs/underscore/underscore', // https://github.com/amdjs
    backbone: 'libs/backbone/backbone', // https://github.com/amdjs
    prettyprint: 'libs/prettyprint/prettyprint',
    qtip: 'libs/qtip2/jquery.qtip.min',
    marked: 'libs/marked/marked',
    mustache: 'https://cdnjs.cloudflare.com/ajax/libs/mustache.js/0.7.0/mustache.min',
    // APIe
    modal: 'libs/modal/modal',
    form: 'libs/form/form',
    // Require.js plugins
    text: 'libs/require/text',
    // jquery plugins
    autogrow : 'libs/autogrow/autogrow',
    // External services
    //addthis : "https://s7.addthis.com/js/300/addthis_widget.js#pubid=ra-51176d76142335d0",

    // Just a short cut so we can put our html outside the js dir
    // When you have HTML/CSS designers this aids in keeping them out of the js directory
    templates: '../templates',
    legal: '../legal'
  }

});


// Actually kick off the application

require([
  'views/app',
  'vm',
  'router',
  'clicky',
  'libs/proxino/proxino'
], function(AppView, Vm, Router, norefclicky, norefProxino){


  try{ clicky.init(66633495); }catch(e){}

  Proxino.key = "QI-BctdhtytsUUJERc5HfA";
  Proxino.track_errors();

  var appView = Vm.create({}, 'AppView', AppView);

  Router.initialize({appView : appView});
  appView.render(); // render() calls Backbone.history when its ready to start

});

