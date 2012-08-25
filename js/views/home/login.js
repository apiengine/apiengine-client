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
    el: '.page',
    initialize: function () {
      var that = this;
      // Bind to the Session auth attribute so we
      // make our view act recordingly when auth changes
      Session.on('change:auth', function (session) {
          that.render();
      });
    
    },
    render: function () {
      console.log('a', Session.get('auth'))
      // Simply choose which template to choose depending on
      // our Session models auth attribute
      if(Session.get('auth')){
        window.location = '#/' + Session.get('login');;
      } else {
        this.$el.html(Mustache.render(loginTemplate, {errors: Session.get('errors'), _: _})); 
      }

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
