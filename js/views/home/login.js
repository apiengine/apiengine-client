define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'text!templates/home/login.html',
  'mustache'
], function($, _, Backbone, Session, loginTemplate, Mustache){
  console.log(Mustache);
  var ExamplePage = Backbone.View.extend({
    el: 'body',
    initialize: function () {
      var that = this;
      // Bind to the Session auth attribute so we
      // make our view act recordingly when auth changes
      Session.on('change:auth', function (session) {
        //  that.render();
        if(session.get('auth')) {
          $.fallr('hide', function(){ console.log('message box hides'); });
          Backbone.router.navigate(session.get('login'), true);

        }
      });
    
    },
    render: function () {
      console.log('a', Session.get('auth'))
      // Simply choose which template to choose depending on
      // our Session models auth attribute
    //  if(Session.get('auth')){
    //    window.location = '#/' + Session.get('login');;
    //  } else {
    //    this.$el.html(Mustache.render(loginTemplate, {errors: Session.get('errors'), _: _})); 
     // }
      $.fallr('set', {duration: 0, useOverlay: false,
        easingDuration: 0,
        overlayDuration: 50,
        buttons: {},
    closeKey        : true,
    closeOverlay    : true
      });
      $.fallr('show', {content: loginTemplate,duration: 0, useOverlay: true,
        easingDuration: 0, position: 'center',
        overlayDuration: 50}, function(){ console.log('message box appears'); });
    },
    events: {

      'submit form.login': 'login', // On form submission
    },
    login: function (ev) {
      // Disable the button
      $('[type=submit]', ev.currentTarget).val('Logging in').attr('disabled', 'disabled');
      // Serialize the form into an object using a jQuery plgin
      var creds = $(ev.currentTarget).serializeObject();
      Session.set({auth: false}, {silent: true});
      Session.login(creds);
      return false;
    }
  });
  return ExamplePage;
});
