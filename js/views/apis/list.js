define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'models/session',
  'text!templates/apis/list.html',
  'collections/apis'
], function($, _, Backbone, bootstrap, Session, apisListTemplate, ApisCollection, UserModel){
  var ApisPage = Backbone.View.extend({
    el: '.private-container',
    initialize: function () {
      var that = this;
      
    },
    render: function () {
      var that = this;
      var apis = new ApisCollection();
      console.log(this.options.username, 'asdasdasd');


      if(that.options.username) {
        apis.username = that.options.username;
      };
      apis.fetch({
        success: function (collection) {
          that.$el.html(_.template(apisListTemplate, {_:_, is_public: that.options.is_public, apis: collection.models, username: Session.get('login'), location: that.options.location}));
          $('.js-api-filter').button();
        }
      });

      
    }
  });
  return ApisPage;
});
