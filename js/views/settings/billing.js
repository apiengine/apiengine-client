define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'vm',
  'models/session',
  'text!templates/settings/billing.html'
], function($, _, Backbone, Router, Vm, Session, settingTemplate){
  var SettingPage = Backbone.View.extend({
    el: '.settings-page-container',
    initialize: function () {
    },  
    events: {
    },
    render: function (options) {
      $('.settings-menu a').removeClass('active');
      $('.settings-menu .billing').addClass('active');
      this.$el.html(settingTemplate);
    }
  });
  return SettingPage;
});
