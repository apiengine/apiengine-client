define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'text!templates/browse/page.html',
  'collections/apis',
  'text!templates/browse/list.html'
], function($, _, Backbone, Session, browseTemplate, Apis, apiListTemplate){
  var BrowseView = Backbone.View.extend({
    el: '.page',
    initialize: function () {

    },
    render: function () {
      this.$el.html(_.template(browseTemplate, {}));
      var apis = new Apis();
      apis.fetch({
        success: function (apis) {
          $('.api-list').html(_.template(apiListTemplate, {apis: apis.models, _:_}));
        }
      })
    }
  });
  return BrowseView;
});
