define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'text!templates/help/page.html',
], function($, _, Backbone, Session, pageTemplate){
  var HelpPage = Backbone.View.extend({
    el: '.page',
    initialize: function () {
      var that = this;
    },
    render: function () {
      this.$el.html(pageTemplate);
    }
  });
  return HelpPage;
});
