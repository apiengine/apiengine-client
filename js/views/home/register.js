define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'text!templates/home/register.html',
], function($, _, Backbone, Session, loginTemplate){
  var ExamplePage = Backbone.View.extend({
    el: 'body',
    initialize: function () {
      var that = this;
      // Bind to the Session auth attribute so we
      // make our view act recordingly when auth changes
      Session.on('change:auth', function (session) {
        $.fallr('hide', function(){ console.log('message box hides'); });
         // that.render();
      });
      Session.on('change:errors', function (errors) {
        //  that.render();
      });
    },
    render: function () {
      // Simply choose which template to choose depending on
      // our Session models auth attribute
   //   if(Session.get('auth')){
    //    Backbone.router.navigate(Session.get('login'), true);
    //  } else {
    //    this.$el.html(_.template(loginTemplate, {errors: Session.get('errors'), _: _})); 
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
      user.save(creds, {
        success: function (data) {
          if(data.get('errors')) {
            //alert(data.get('errors'));
          //  that.render();
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
