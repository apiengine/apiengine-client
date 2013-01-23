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
  'text!templates/modals/deleteaccount.html',
  'models/account'
], function($, _, Backbone, Mustache, Router, Vm, Session, Modal, FormFactory, settingTemplate, confirmTemplate, AccountModel){
  var SettingPage = Backbone.View.extend({
    el: '.settings-page-container',
    initialize: function () {
    },
    events: {
    	'submit .update-account': 'updateAccount',
    	'click .delete-button' : 'deleteAccount'
    },
    render: function (options) {
      $('.settings-menu a').removeClass('active');
      $('.settings-menu .account').addClass('active');
      this.$el.html(Mustache.render(settingTemplate, {user : Session.get('user')}));

      this.form = FormFactory.create($('form.update-account'), new AccountModel({ login : Session.get('user').login }), {
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
      		profileDetails.publicize = false;	// :TODO: required buy API. Needs to come from somewhere

			delete profileDetails.password_check;	// don't need to send this

			return profileDetails;
      	}
      });
    },

    updateAccount : function(ev)
    {
		this.form.save();

    	return false;
    },

    deleteAccount : function(ev)
    {
    	// show confirmation dialog
		this.modal = Modal.create({
			content: confirmTemplate,
			confirm : true
		});

		// bind to modal form submission
		$('.modal .account-delete-form').on('submit', function(ev) {
			var accountModel = new AccountModel({
					login : Session.get('user').login
				});

			accountModel.destroy({
				success: function () {
					console.log('BAHLEET', arguments);

					// :TODO: logout & redirect to goodbye page?
					that.modal.hide();
					$('[type="submit"]').removeAttr('disabled');
				},
				error: function () {
					console.log('ERROR NO DELETE', arguments);

					// :TODO: show error in UI
					$('[type="submit"]').removeAttr('disabled');
				}
			});
			return false;
		});

    	this.modal.show();
    }
  });
  return SettingPage;
});
