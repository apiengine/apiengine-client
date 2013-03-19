define([
  'jquery',
  'underscore',
  'backbone',
  'mustache',
  'router',
  'vm',
  'models/session',
  'text!templates/profile/page.html',
  'models/api',
  'views/apis/list',
  'models/user',
  'text!templates/404.html',
  'views/header/newapi',
  'views/settings/page'
], function($, _, Backbone, Mustache, Router, Vm, Session, profileTemplate, ApiModel, ApisList, UserModel, MissingPage, NewApiView, SettingsPage){
  var NewApiPage = Backbone.View.extend({
    el: '.page',
    initialize: function () {
      var that = this;
      this.userModel = new UserModel({id: this.options.username});
      this.userModel.on('change', function(userModel) {
        that.renderProfile();
      });

      // refresh the views when we logout or login so we get contextual info
      Session.on('change:auth', function() {
        that.render();
      });
    },
    events: {
      'submit form.edit-api': 'editApi'
    },
    editApi: function (ev) {
      $('[type=submit]', ev.currentTarget).text('Creating API').attr('disabled', 'disabled');
      // Serialize the form into an object using a jQuery plgin
      var apiData = $(ev.currentTarget).serializeObject();
      var api = new ApiModel;
      api.save(apiData, {
        success: function (model) {
          window.location = '#/apis/' + model.id;
        }
      });
      return false;
    },
    events: {
      'click .js-newapi': 'newapi',
      'click .js-edit-profile': 'editProfile',
      'submit .js-save-profile-form': 'saveProfile'
    },
    editProfile: function (ev) {
      $('#js-edit-profile-form').modal('show');
    },
    saveProfile: function (ev) {
      var that = this;
      this.userModel.set($(ev.currentTarget).serializeObject());
      if(this.userModel.get('publicize') === 'true') {
        this.userModel.set({publicize: true});
      } else {
        this.userModel.set({publicize: false});

      }
      this.userModel.id = this.options.username;
      this.userModel.save({}, {
        success: function(resp){

        }
      });
      return false;
    },
    render: function () {
      $('.top-bar-menu li a.active').removeClass('active');

      $('.top-bar-menu li a.dashboard-button').addClass('active');
      var that = this;
      if($('.profile-box[data-login="'+that.options.username+'"]').length > 0 ) {
        this.renderSettings();
      } else {
        this.userModel.fetch({
          success: function (user) {

          },
          error: function () {
            that.$el.html(MissingPage);
          }
        });
      }
    },
    renderProfile: function () {

      var that = this;
      currentUser = false;
      if(Session.get('login') === that.options.username ) {
        currentUser = true;
      }
      that.$el.html(Mustache.render(profileTemplate, {user: that.userModel, currentUser: currentUser}));
          $('.timeago').timeago();
      this.renderSettings();
    },
    renderSettings: function () {
      var that = this;
      if(typeof this.options.tab === 'undefined') {

        if(Session.get('login') === that.options.username ) {
          currentUser = true;
        }
        var apisList = new ApisList({currentUser: currentUser, username: that.options.username, el: '.private-container'});
        apisList.render();

        $('.tabs-container li').removeClass('active');
        $('.tabs-container .apilist').addClass('active');
      }
      if(this.options.tab === 'settings') {
        var settingsPage = Vm.create(this, 'SettingsPage', SettingsPage, {});
        settingsPage.render({setting: this.options.setting});
      }
    },
    newapi: function () {
      var newApiView = Vm.create(this, 'NewApiView', NewApiView, {});
      newApiView.render();
    }
  });
  return NewApiPage;
});
