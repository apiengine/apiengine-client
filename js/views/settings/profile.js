define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'vm',
  'models/session',
  'text!templates/settings/profile.html',
  'models/profile'
], function($, _, Backbone, Router, Vm, Session, settingTemplate, ProfileModel){
  var SettingPage = Backbone.View.extend({
    el: '.settings-page-container',
    initialize: function () {
    },  
    events: {
      'submit .profile-form': 'updateProfile'
    },
    updateProfile: function (ev) {
      var profileDetails = $(ev.currentTarget).serializeObject();
      var profileModel = new ProfileModel();
      profileDetails.id = Session.get('user').login;
      profileModel.save(profileDetails, {
        success: function () {
          console.log('profile', arguments);
        }
      })
      return false;
    },
    render: function (options) {
      console.log(Session, 'session');
      $('.settings-menu a').removeClass('active');
      $('.settings-menu .profile').addClass('active');
      this.$el.html(settingTemplate);
    }
  });
  return SettingPage;
});
