define([
  'jquery',
  'underscore',
  'backbone',
  'mustache',
  'models/session',
  'text!templates/browse/page.html',
  'collections/apis',
  'text!templates/browse/list.html'
], function($, _, Backbone, Mustache, Session, browseTemplate, Apis, apiListTemplate){
  var BrowseView = Backbone.View.extend({
    el: '.page',
    initialize: function () {

    },
    render: function () {
      $('body').removeClass('grey');

      $('.top-bar-menu li a.active').removeClass('active');
      $('.top-bar-menu li a.explore-button').addClass('active');
      this.$el.html(_.template(browseTemplate, {}));
      var apis = new Apis();
      apis.fetch({
        success: function (apis) {
          $('.api-list-container').html(Mustache.render(apiListTemplate, {apis: apis.models, _:_}));
        }
      })
    }
  });
  return BrowseView;
});
