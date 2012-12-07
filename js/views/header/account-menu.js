define([
  'jquery',
  'underscore',
  'backbone',
  'vm',
  'mustache',
  'models/session',
  'text!templates/header/account-menu.html',
  'views/home/login',
  'views/home/register',
  'views/header/newapi',
  'qtip',
  'text!templates/header/account-menu-dropdown.html'
], function($, _, Backbone, Vm, Mustache, Session, mainMenuTemplate, LoginView, RegisterView, NewApiView, qtip, accountDropdown){
  var MainMenuView = Backbone.View.extend({
    el: '.account-menu-container',
    initialize: function () {
      var that = this;

      $('body').on('click', '.js-logout', function () {
        that.logout();
      });
      $('body').on('click', '.js-signup', function (ev) {
        that.signup();

        return false;
      });
      Session.on('change:auth', function (session) {
        that.render();

      });
      Session.on('change:errors', function (errors) {
        that.render();
      });
    },
    render: function () {
      if(typeof Session.get('auth') !== 'undefined') {
        if(Session.get('auth')){
          
          this.$el.html(_.template(mainMenuTemplate, {user: Session}));
        } else {
          
          this.$el.html(_.template(mainMenuTemplate, {user: null}));
        }
        this.$el.fadeIn(200);
      }
    },
    events: {
      'click .signup': 'signup',
      'click .js-newapi': 'newapi',
      'click .logout': 'logout',
      'click .login': 'login',
      'click .js-account-menu': 'dropdownMenu'
    },
    dropdownMenu: function (ev) {
      $(ev.currentTarget).qtip({
        content: {
          text: Mustache.render(accountDropdown, {user: Session.get('login')})
        },
        show: {
          event: false, // Don't specify a show event...
          ready: true // ... but show the tooltip when ready
        },
      hide: {
        delay: 400,
        event: 'unfocus mouseleave',//'unfocus mouseleave',
        fixed: true // Make sure we can interact with the qTip by setting it as fixed
      },
      position: {
        my: "top center",
        at: "bottom center"
      },
        style: {
          def: false,
        tip: {
          corner: true,
          offset: 35,
          height: 5 ,
          width: 8 
                  },
    classes: 'ui-tooltip-light '
  }
      });


    },
    logout: function (ev) {
      console.log('logged out');
      // Disable the button
      Session.logout();
      Backbone.router.navigate('', true);

    },
    login: function (ev) {
      var loginView = Vm.create(this, 'LoginView', LoginView, {});
      loginView.render();
    },
    signup: function (ev) {
      var registerView = Vm.create(this, 'RegisterView', RegisterView, {});
      registerView.render();
    },
    newapi: function (ev) {
      var newApiView = Vm.create(this, 'NewApiView', NewApiView, {});
      newApiView.render();
      return false;
    },
    clean: function () {
      $('body').off('click', '.js-signup');
    }
  });
  return MainMenuView;
});
