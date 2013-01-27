define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'vm',
  'models/session',
  'form',
  'text!templates/settings/notifications.html'
], function($, _, Backbone, Router, Vm, Session, FormFactory, settingTemplate){
  var SettingPage = Backbone.View.extend({
    el: '.settings-page-container',
    initialize: function () {
    },
    events: {
    },
    render: function (options) {
      $('.settings-menu a').removeClass('active');
      $('.settings-menu .notifications').addClass('active');
      this.$el.html(settingTemplate);

      this.form = FormFactory.create($('form.notification-settings'), null, {});
    }
  });
  return SettingPage;
});
