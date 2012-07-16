define([
  'jquery',
  'underscore',
  'backbone',
  'bootstrap',
  'router',
  'models/session',
  'text!templates/profile/page.html',
  'models/api',
  'views/apis/list',
  'models/user'

], function($, _, Backbone, bootstrap, Router, Session, newApiTemplate, ApiModel, ApisList, UserModel){
  var NewApiPage = Backbone.View.extend({
    el: '.page',
    initialize: function () {
      var that = this;
      
    },  
    events: {
      'submit form.edit-api': 'editApi'
    },
    editApi: function (ev) {
      $('[type=submit]', ev.currentTarget).text('Creating API').attr('disabled', 'disabled');
      // Serialize the form into an object using a jQuery plgin
      var apiData = $(ev.currentTarget).serializeObject();
      var api = new ApiModel;
      console.log(apiData);
      api.save(apiData, {
        success: function (model) {
          console.log(model);
          window.location = '#/apis/' + model.id;
        }
      });
      return false;
    },
    events: {
      'click .js-edit-profile': 'editProfile'
    },
    editProfile: function (ev) {
      $(ev.currentTarget).attr('disabled', 'disabled');
      $('#js-edit-profile-form').modal({})
    },  
    render: function () {
      var that = this;
      var userModel = new UserModel({id: this.options.username});
      userModel.fetch({
        success: function (user) {
          that.$el.html(_.template(newApiTemplate, {user: user}));

      
          var apisList = new ApisList({username: that.options.username, el: '.private-container'});
          apisList.render();
        }
      });
    }
  });
  return NewApiPage;
});
