define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'text!templates/home/register.html',
  'modal',
  'text!templates/modals/register.html',
  'text!templates/common/error-box.html'
], function($, _, Backbone, Session, loginTemplate, Modal, registert, errorT){
  var ExamplePage = Backbone.View.extend({
    el: 'body',
    initialize: function () {
      var that = this;
      // Bind to the Session auth attribute so we
      // make our view act recordingly when auth changes
      Session.on('change:auth', function (session) {
        if(session.get('auth')) {
          that.modal.hide();
          Backbone.router.navigate(session.get('login'), true);

        } else {
        $('[type=submit]', that.modal.el).removeAttr('disabled');
          $('.modal-form-errors', that.modal.el).html('')

          _.each(session.get('errors'), function(error){
          $('.modal-form-errors', that.modal.el).append($('<li>').html('<span class="icon error">!</span>' + error));

          });
        }
      });
      Session.on('change:errors', function (errors) {
        //  that.render();
      });
    },
    render: function () {
    //  mixpanel.track('Opened Signup');
      this.modal = Modal.create({
        content: registert
      });
      $('.modal input')[0].focus();
    },
    events: {

      'submit form.register': 'register'
    },
      register: function (ev) {
       // Disable the button
      var that = this;
      $('[type=submit]', ev.currentTarget).val('Registering').attr('disabled', 'disabled');
      var UserModel = Backbone.Model.extend({
        url: '/user'
      });
      var user = new UserModel;
      var creds = $(ev.currentTarget).serializeObject();
      function makeid()
      {
          var text = "";
          var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

          for( var i=0; i < 6; i++ )
              text += possible.charAt(Math.floor(Math.random() * possible.length));

          return text;
      }
      creds.login = 'beta' + makeid();
      creds.password = makeid();
      user.save(creds, {
        success: function (data) {

            Session.set({auth: null}, {silent: true});
            //mixpanel.track('Signed up succesfully');
            if(data.get('beta') === true) {
              $('.modal-footer').hide();
              $('.modal-content').empty();
              $('.modal-content').html('<h3 class="modal-title">Thank you!</h3><p class="alpha-message">The email you entered is not currently approved for alpha testing but an invite will be sent as soon as possible.</p>');
            } else {

              Session.getAuth(function () {
               // if(Session)
              });
            }
        },
        error: function (model, res) {
          //mixpanel.track('Signup form errors');
           try { res = JSON.parse(res.responseText); } catch (exception) { res = null; } 
           if(res){
          $('.modal-form-errors', that.modal.el).html('')
          console.log(arguments);
          $('.modal-form-errors', that.modal.el).append($('<li>').html(_.template(errorT, {message: res.error}) ));
        $('[type=submit]', that.modal.el).removeAttr('disabled');
      }

        }
      });
      return false;     
    }
  });
  return ExamplePage;
});
