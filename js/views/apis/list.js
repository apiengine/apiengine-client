define([
  'jquery',
  'underscore',
  'backbone',
  'mustache',
  'addthis',
  'models/session',
  'text!templates/apis/list.html',
  'text!templates/apis/list-item.html',
  'collections/apis',
  'models/api',
  'models/follower'
], function($, _, Backbone, Mustache, unused, Session, apisListTemplate, apisListItemTemplate, ApisCollection, ApiModel, FollowerModel){
  var ApisPage = Backbone.View.extend({
    el: '.private-container',
    initialize: function () {
      var that = this;

      $('body').on('hover', '.js-following', function (ev) {
        var button = $(ev.currentTarget);
        if(ev.type === 'mouseenter') {
          $(button).removeClass('btn-green').addClass('btn-red').text('UNSUBSCRIBE');
        }
        if(ev.type === 'mouseleave') {
          $(button).removeClass('btn-red').addClass('btn-green').text('FOLLOWING');

        }
      });
    },
    events: {
      'click .js-new-api-button': 'editApi',
      'submit .js-new-api-form': 'saveApi',
      'click .js-follow': 'followApi',
      'click .js-following': 'unfollowApi'
    },
    unfollowApi: function (ev) {
        var button = $(ev.currentTarget);

      var apiEl = $(ev.currentTarget).parents('.api-list-item');
      var api = apiEl.attr('data-api-id');
      var user = apiEl.attr('data-user-id');
      var followerModel = new FollowerModel;
      followerModel.user = user;
      followerModel.api = api;
      followerModel.id = 'fake';
      followerModel.destroy({
        success: function () {
          $(button).removeClass('btn-green btn-red js-following').addClass('btn-blue js-follow').text('FOLLOW');
          $(button).prev().text($(button).prev().text()*1 -1);
        }
      })
    },
    followApi: function (ev) {
        var button = $(ev.currentTarget);
      var apiEl = $(ev.currentTarget).parents('.api-list-item');
      var api = apiEl.attr('data-api-id');
      var user = apiEl.attr('data-user-id');
      var followerModel = new FollowerModel;
      followerModel.user = user;
      followerModel.api = api;
      followerModel.save({}, {
        success: function () {
          $(button).prev().text($(button).prev().text()*1 +1);

          $(button).removeClass('btn-blue js-follow').addClass('btn-green js-following').text('FOLLOWING');
        }
      })
      return false;
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

      $('#js-new-api-modal').modal('hide');

          window.location = '#/' + api.get('user') + '/' + api.get('name') + '/version/1';
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
      console.log(Session.get('login'), that.options.username);
      if(Session.get('login') === that.options.username && typeof Session.get('login') !== 'undefined') {
        currentUser = true;
      }
      console.log(currentUser);
      if(that.options.username) {
        apis.username = that.options.username;
      };
      apis.fetch({
        success: function (collection) {
          that.$el.html(Mustache.render(apisListTemplate, {authed: Session.get('auth'), currentUser: that.options.currentUser, _:_, is_public: that.options.is_public, apis: collection.models, username: Session.get('login'), location: that.options.location}, {listtemplate: apisListItemTemplate}));

          // activate the share buttons
          _.each(collection.models, function(model) {
	          addthis.button('#' + model.get('user') + '-' + model.get('name'), {
	          	services_compact : "facebook,twitter,digg,pinterest,email",
	          	ui_click : true
	          }, {
	          	url: Backbone.router.getBaseUrl() + model.get('user') + '/' + model.get('name'),
	          	title: model.get('name') + ' on API Engine'
	          });
	      });
        }
      });


    }
  });
  return ApisPage;
});
