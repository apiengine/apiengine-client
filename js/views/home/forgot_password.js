define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'text!templates/home/password_reset.html',
  'text!templates/home/forgot_password.html'
], function($, _, Backbone, Session, passwordResetTemplate, loginTemplate){
  var ForgotPage = Backbone.View.extend({
    el: '.page',
    initialize: function () {
      var that = this;
      // Bind to the Session auth attribute so we
      // make our view act recordingly when auth changes
    
    },
    render: function (options) {
      console.log(this.options);
      if(typeof this.options.token !== 'undefined') {
        this.$el.html(_.template(passwordResetTemplate, {errors: Session.get('errors'), _: _})); 

      } else {
        this.$el.html(_.template(loginTemplate, {errors: Session.get('errors'), _: _})); 

      }

    },
    events: {

      'submit form.forgot': 'forgotPassword', // On form submission
      'submit form.reset_password': 'resetPassword' // On form submission
    },
    forgotPassword: function (ev) {
      // Disable the button
      $('[type=submit]', ev.currentTarget).val('Logging in').attr('disabled', 'disabled');
      // Serialize the form into an object using a jQuery plgin
      var ForgotToken = Backbone.Model.extend({
        urlRoot: '/passwordreset'
      });
      var forgotToken = new ForgotToken();
      forgotToken.set({email: 'thomasalwyndavis@gmail.com'});
      forgotToken.save({}, {
        success: function () {
          console.log(arguments);
        }
      });
      return false;
    },
    resetPassword: function (ev) {
      // Disable the button
      $('[type=submit]', ev.currentTarget).val('Logging in').attr('disabled', 'disabled');
      // Serialize the form into an object using a jQuery plgin
      var ForgotToken = Backbone.Model.extend({
        urlRoot: '/passwordreset/' + this.options.token
      });
      var creds = $(ev.currentTarget).serializeObject();

      var forgotToken = new ForgotToken();
      forgotToken.save(creds, {
        success: function () {
          console.log(arguments);
        }
      });
      
      return false;
    }
  });
  return ForgotPage;
});
