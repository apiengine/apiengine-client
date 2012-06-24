define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'text!templates/example/login.html',
  'text!templates/example/logout.html'
], function($, _, Backbone, Session, exampleLoginTemplate, exampleLogoutTemplate){
  var ExamplePage = Backbone.View.extend({
    el: '.private-container',
    initialize: function () {
      var that = this;
      // Bind to the Session auth attribute so we
      // make our view act recordingly when auth changes
      Session.on('change:auth', function (session) {
          that.render();
      });
      Session.on('change:errors', function (errors) {
          that.render();
      });
    },
    render: function () {
      // Simply choose which template to choose depending on
      // our Session models auth attribute
      if(Session.get('auth')){
        this.$el.html(_.template(exampleLogoutTemplate, {username: Session.get('login')}));
      } else {
        this.$el.html(_.template(exampleLoginTemplate, {errors: Session.get('errors'), _: _})); 
      }
    },
    events: {
      'submit form.login': 'login', // On form submission
      'click .logout': 'logout',
      'submit form.register': 'register',
      'submit form.post-track': 'postTrack'

    },
    postTrack: function (ev) {
      var that = this;
      $('[type=submit]', ev.currentTarget).val('Posting').attr('disabled', 'disabled');
      var TrackModel = Backbone.Model.extend({
        url: '/tracks'
      });
      var track = new TrackModel;
      var track_details = $(ev.currentTarget).serializeObject();
      track.save(track_details, {
        success: function (data) {
          console.log(arguments);
        }
      });
      return false;
    },
    login: function (ev) {
      // Disable the button
      $('[type=submit]', ev.currentTarget).val('Logging in').attr('disabled', 'disabled');
      // Serialize the form into an object using a jQuery plgin
      var creds = $(ev.currentTarget).serializeObject();
      Session.login(creds);
      return false;
    },
    logout: function (ev) {
      // Disable the button
      $(ev.currentTarget).text('Logging out').attr('disabled', 'disabled');
      Session.logout();
    },
    register: function (ev) {
       // Disable the button
      var that = this;
      $('[type=submit]', ev.currentTarget).val('Registering').attr('disabled', 'disabled');
      var UserModel = Backbone.Model.extend({
        url: '/user',
        idAttribute: "_id"  
      });
      var user = new UserModel;
      var creds = $(ev.currentTarget).serializeObject();
      user.save(creds, {
        success: function (data) {
          if(data.get('errors')) {
            alert(data.get('errors'));
            that.render();
          } else {
            Session.getAuth(function () {
              
            });
          }
        }
      });
      return false;     
    }
  });
  return ExamplePage;
});
