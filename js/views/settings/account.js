define([
  'jquery',
  'underscore',
  'backbone',
  'mustache',
  'router',
  'vm',
  'models/session',
  'modal',
  'form',
  'text!templates/settings/account.html',
  'text!templates/settings/account-errordef.html',
  'text!templates/modals/deleteaccount.html',
  'models/account'
], function($, _, Backbone, Mustache, Router, Vm, Session, Modal, FormFactory, settingTemplate, errorDefs, confirmTemplate, AccountModel){
  var SettingPage = Backbone.View.extend({
    el: '.settings-page-container',
    initialize: function () {
    },
    events: {
    	'click .delete-button' : 'deleteAccount'
    },
    render: function (options) {
      $('.settings-menu a').removeClass('active');
      $('.settings-menu .account').addClass('active');
      this.$el.html(Mustache.render(settingTemplate, {user : Session.get('user')}, {errordef : errorDefs}));

      this.form = FormFactory.create($('form.update-account'), new AccountModel({
      	login : Session.get('login'),
      	publicize : Session.get('user').profile.publicize
      }), {
      	errorMapping : {
      		'password.mismatch' : 'current_password'
      	},
      	onPreValidate : function(profileDetails) {
      		// don't send password if not filled in
			if (!profileDetails.password && !profileDetails.password_check) {
				delete profileDetails.current_password
				delete profileDetails.password;
				delete profileDetails.password_check;
			}
      		return profileDetails;
    	},
    	validate : function(profileDetails) {
    		var errors = {password_check : [], current_password : []};

    		// throw an error if it mismatched
			if (profileDetails.password && (profileDetails.password != profileDetails.password_check)) {
				errors['password_check'].push('password.mismatch');
			}

			// throw an error if old password wasn't provided
			if (profileDetails.password && !profileDetails.current_password) {
				errors['current_password'].push('password.notprovided');
			}

			return errors;
    	},
      	onPreSend : function(profileDetails) {
			delete profileDetails.password_check;	// don't need to send this

			return profileDetails;
      	}
      });
    },

	// show delete confirmation dialog
    deleteAccount : function(ev)
    {
    	var that = this;

		this.modal = Modal.create({
			content: confirmTemplate,

			form: {
				element : '.account-delete-form',
				model : new AccountModel({
			      	login : Session.get('login')
			      }),
				success: function () {
					console.log('BAHLEET', arguments);

					// hide the dialog
					that.modal.hide();
					// logout
					Session.logout();
					// go back to homepage
					Backbone.router.navigate('/');
				}
			}
		});
    }
  });
  return SettingPage;
});
