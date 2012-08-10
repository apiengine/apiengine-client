define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'text!templates/home/forgot_password.html',
], function($, _, Backbone, Session, loginTemplate){
  var ForgotPage = Backbone.View.extend({
    el: '.page',
    initialize: function () {
      var that = this;
      // Bind to the Session auth attribute so we
      // make our view act recordingly when auth changes
    
    },
    render: function () {
        this.$el.html(_.template(loginTemplate, {errors: Session.get('errors'), _: _})); 

    },
    events: {

      'submit form.forgot': 'forgotPassword', // On form submission
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
    }
  });
  return ForgotPage;
});
