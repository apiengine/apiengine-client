define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'models/api',
  'text!templates/home/register.html',
  'modal',
  'text!templates/modals/newapi.html'
], function($, _, Backbone, Session, Api, loginTemplate, Modal, registert){
  var ExamplePage = Backbone.View.extend({
    el: 'body',
    initialize: function () {
      var that = this;
      // Bind to the Session auth attribute so we
      // make our view act recordingly when auth changes
      Session.on('change:errors', function (errors) {
        //  that.render();
      });
    },
    render: function () {
     // mixpanel.track('Opened API modal');

      this.modal = Modal.create({
        content: registert
      });
      $('.modal input[name="name"]').focus();
    },
    events: {

      'submit form.newapi': 'newapi'
    },
      newapi: function (ev) {
       // Disable the button
      var that = this;
      $('[type=submit]', ev.currentTarget).val('Registering').attr('disabled', 'disabled');
      var api = new Api({username: Session.get('login')});
      var creds = $(ev.currentTarget).serializeObject();
      if(creds.private === 'on') {
        creds.private = true;
      } else {
        creds.private = false;
      }
      api.save(creds, {
        success: function (data) {
            Backbone.router.navigate(data.get('user') + '/' + data.get('name') + '/version/' + data.get('versions')[0], true);
          that.modal.hide();
     // mixpanel.track('Created a new API');

        },
        error: function (model, res) {
    //  mixpanel.track('New API Form errors');

          var res = JSON.parse(res.responseText);
          console.log(arguments);
          $('.modal-form-errors', that.modal.el).append($('<li>').text(res.error));
        $('[type=submit]', that.modal.el).removeAttr('disabled');

        }
      });
      return false;     
    }
  });
  return ExamplePage;
});
