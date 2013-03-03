define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'text!templates/home/login.html',
  'mustache',
  'modal',
  'text!templates/modals/login.html',
  'text!templates/common/error-box.html'
], function($, _, Backbone, Session, loginTemplate, Mustache, Modal, logint, errorT){
  var ExamplePage = Backbone.View.extend({
    el: 'body',
    initialize: function () {
      var that = this;
      // Bind to the Session auth attribute so we
      // make our view act recordingly when auth changes
      Session.on('change:auth', function (session) {
        //  that.render();

        if(session.get('auth')) {
          that.modal.hide();
          Backbone.router.navigate(session.get('login'), true);

        } else {
        $('[type=submit]', that.modal.el).removeAttr('disabled');
          $('.modal-form-errors', that.modal.el).html('')
      //    mixpanel.track('Login form errors');

          _.each(session.get('errors'), function(error){
          $('.modal-form-errors', that.modal.el).append($('<li>').html(_.template(errorT, {message: error})));

          });
        }
      });

    },
    render: function () {
      this.modal = Modal.create({
        content: logint
      });
      $('.modal input')[0].focus();
    },
    events: {

      'submit form.login': 'login', // On form submission
    },
    login: function (ev) {
      // Disable the button
      $('[type=submit]', ev.currentTarget).val('Logging in').attr('disabled', 'disabled');
      // Serialize the form into an object using a jQuery plgin
      var creds = $(ev.currentTarget).serializeObject();
      Session.set({auth: null}, {silent: true});
      Session.login(creds);
      return false;
    }
  });
  return ExamplePage;
});
