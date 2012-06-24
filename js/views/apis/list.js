define([
  'jquery',
  'underscore',
  'backbone',
  'models/session',
  'text!templates/apis/list.html',
  'text!templates/apis/list-item.html',
  'collections/apis'
], function($, _, Backbone, Session, apisListTemplate, apisListItemTemplate, ApisCollection){
  var UsersPage = Backbone.View.extend({
    el: '.private-container',
    initialize: function () {
      var that = this;
      
    },
    render: function () {
      var that = this;
      this.$el.html(apisListTemplate);
      var users = new ApisCollection();
      users.fetch({
        success: function (collection) {
          var listHTML = '';
          _.each(collection.models, function (api) {
            listHTML += _.template(apisListItemTemplate, {_:_, api: api});
          });
          that.$el.find('.api-list').html(listHTML);
        }
      });
    }
  });
  return UsersPage;
});
