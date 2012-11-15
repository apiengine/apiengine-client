define([
  'jquery',
  'underscore',
  'backbone',
  'mustache',
  'router',
  'vm',
  'models/session',
  'text!templates/settings/profile.html',
  'models/profile'
], function($, _, Backbone, Mustache, Router, Vm, Session, settingTemplate, ProfileModel){
  var SettingPage = Backbone.View.extend({
    el: '.settings-page-container',
    initialize: function () {
    },  
    events: {
      'submit .profile-form': 'updateProfile'
    },
    updateProfile: function (ev) {
      $('[type="submit"]').attr('disabled', 'disabled');
      var profileDetails = $(ev.currentTarget).serializeObject();
      var profileModel = new ProfileModel();
      profileDetails.id = Session.get('user').login;
      profileDetails.publicize = true;
      profileModel.save(profileDetails, {
        success: function () {
          console.log('profile', arguments);
          $('[type="submit"]').removeAttr('disabled');
        },
        error: function () {
          $('[type="submit"]').removeAttr('disabled');
        }
      })
      return false;
    },
    render: function (options) {
      var that = this;
      console.log(Session, 'session');
      var profileModel = new ProfileModel({id: Session.get('user').login});
      profileModel.fetch({
        success: function (user) {
          console.log(user, 'asdasd');
          that.$el.html(Mustache.render(settingTemplate,{user:user}));

        }
      })
      $('.settings-menu a').removeClass('active');
      $('.settings-menu .profile').addClass('active');
    }
  });
  return SettingPage;
});
