define([
  'jquery',
  'underscore',
  'backbone',
  'mustache',
  'models/session',
  'text!templates/browse/page.html',
  'collections/apis',
  'text!templates/browse/list.html',
  'text!templates/apis/list-item.html',
  'models/follower'
], function($, _, Backbone, Mustache, Session, browseTemplate, Apis, apiListTemplate, apisListItemTemplate, FollowerModel){
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
    render: function () {
      $('body').removeClass('grey');

      $('.top-bar-menu li a.active').removeClass('active');
      $('.top-bar-menu li a.explore-button').addClass('active');
      this.$el.html(_.template(browseTemplate, {}));
      var apis = new Apis();

      apis.fetch({
        success: function (apis) {
           var apisl = _.each(apis.models, function (model, key){
            if(model.get('user') === Session.get('login')) {
              model.set({owner: true});
            }
            return model;
          });
          $('.api-list-container').html(Mustache.render(apiListTemplate, {authed: Session.get('auth'), apis: apisl, _:_}, {listtemplate: apisListItemTemplate}));
        }
      })
    }
  });
  return BrowseView;
});
