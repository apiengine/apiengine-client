define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'models/session',
  'text!templates/apis/list.html',
  'collections/apis',
  'models/api'
], function($, _, Backbone, bootstrap, Session, apisListTemplate, ApisCollection, ApiModel){
  var ApisPage = Backbone.View.extend({
    el: '.private-container',
    initialize: function () {
      var that = this;
      
    },
    events: {
      'click .js-new-api-button': 'editApi',
      'submit .js-new-api-form': 'saveApi'
    },
    editApi: function (ev) {
      $('#js-new-api-modal').modal('show');
      return false;
    },
    saveApi: function (ev) {
      var apiData = $(ev.currentTarget).serializeObject();
      console.log(apiData, 'headache');
      var apiModel = new ApiModel();
      apiModel.set({username: Session.get('login')});
      if(apiData.private === 'true') { 
        apiData.private = true;
      } else {
        apiData.private = false;
      }
      apiModel.save(apiData, {
        success: function (api) {
          console.log('saved', api);
        }
      });
      return false;
    },
    render: function () {
      var that = this;
      var apis = new ApisCollection();
      console.log(this.options.username, 'asdasdasd');
      currentUser = false;
      if(Session.get('login') === that.options.username ) { 
        currentUser = true;
      }

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
