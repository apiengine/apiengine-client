define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'text!templates/footer/footer.html',
], function($, _, Backbone, Session, footerTemplate){
  var FooterView = Backbone.View.extend({
    el: '.footer',
    initialize: function () {
      var that = this;
      // Bind to the Session auth attribute so we
      // make our view act recordingly when auth changes
    },
    render: function () {
      var that = this;
      setTimeout(function () {

      that.$el.hide().fadeIn(250);
      that.$el.html(footerTemplate);
     }, 1000)
    }
  });
  return FooterView;
});
