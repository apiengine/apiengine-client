define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'text!templates/legal/privacy.md',
], function($, _, Backbone, Session, privacyMd){
  var LegalPage = Backbone.View.extend({
    el: '.page',
    initialize: function () {
      var that = this;
      // Bind to the Session auth attribute so we
      // make our view act recordingly when auth changes
    },
    render: function () {
      
      $('.top-bar-menu li a.active').removeClass('active');
      $('.top-bar-menu li a.features-button').addClass('active');
      this.$el.html(featuresTemplate);
    }
  });
  return LegalPage;
});
