define([
  'jquery',
  'underscore',
  'backbone',
  'mustache',
  'models/session',
  'text!templates/browse/page.html',
  'collections/apis',
  'text!templates/browse/list.html',
  'models/follower'
], function($, _, Backbone, Mustache, Session, browseTemplate, Apis, apiListTemplate, FollowerModel){
  var BrowseView = Backbone.View.extend({
    el: '.page',
    initialize: function () {
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
      'click .js-follow.btn-blue': 'followApi',
      'click .js-following.btn-red': 'unfollow'
    },
    unfollow: function (ev) {
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
          $(button).removeClass('btn-green btn-blue').addClass('btn-blue').text('FOLLOW');
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
          $(button).removeClass('btn-blue').addClass('btn-green').text('FOLLOWING');
        }
      })
      return false;
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
