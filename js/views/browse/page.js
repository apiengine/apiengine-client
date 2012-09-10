define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'text!templates/browse/page.html'
], function($, _, Backbone, Session, browseTemplate){
  var BrowseView = Backbone.View.extend({
    el: '.page',
    initialize: function () {

    },
    render: function () {
      this.$el.html(_.template(browseTemplate, {}));
    }
  });
  return BrowseView;
});
