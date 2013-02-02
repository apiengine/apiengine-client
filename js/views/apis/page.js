/**
 * Top-level page controller for API pages
 *
 * Contains logic available to the API as a whole view. This includes:
 * 	- editing basic API details (description).
 * 	  (Not to be confused with version details, which are managed by settings.js)
 * 	- top-order page controls (tabs, etc)
 * 	- following, unfollowing and sharing the API
 */
define([
  'jquery',
  'underscore',
  'backbone',
  'router',
  'vm',
  'mustache',
  'models/session',
  'models/api',
  'models/api-overview',
  'libs/highlight/highlight',
  'modal',
  'views/apis/collaborators',
  'views/apis/details',
  'views/apis/documentation',
  'views/apis/overview',
  'views/apis/settings',
  'views/notifications/list',
  'text!templates/apis/page.html'
], function($, _, Backbone, Router, Vm,  Mustache, Session, ApiModel, ApiSummary, hljs, Modal, CollaboratorsView, DetailsView, DocsView, OverView, SettingsView, ActivityView, apiDetailsTemplate){
  var NewApiPage = Backbone.View.extend({
    el: '.page',
    initialize: function () {

    },
    events: {
      'click .edit-api-description': 'editDescription'
    },
    editDescription: function(ev) {
      var modal = Modal.create({
        inline: {
        	from : $(ev.currentTarget),
        	model : this.options.model.toApi(),
        	field : 'description'
        }
      });
      modal.show();
    },
    render: function () {

      if(!this.model) {
      	// load the API summary on first init
        this.$el.html('');

		var that = this,
        	apiModel = new ApiSummary({username: this.options.username, apiname: this.options.apiname, version: this.options.version});

        apiModel.fetch({
          	success: function (api) {
				that.options.model = api;
				that.model = api;
				that.rerenderChildren();
            },
            error : function () {
            	// :TODO: how to handle this?
            }
        });
      } else {
      	this.rerenderChildren();
      }
    },

	rerenderChildren : function()
	{
		// :TODO: check passed in options for viewed resource / method ID and show according tabs

		var owner = Session.get('login') === this.model.get('user') ? true : false;

		// render base page template
		this.$el.html(Mustache.render(apiDetailsTemplate, {api: this.model, owner: Session.get('login') === this.model.get('user')}));

		// switch on active tab from router
		if(this.options.collaborators) {
			var collaboratorsView = Vm.create(this, 'apipage', CollaboratorsView, _.extend({parent : this}, this.options));
			collaboratorsView.render();
		}
		else if(this.options.settings) {
			var settingsView = Vm.create(this, 'apipage', SettingsView, _.extend({parent : this}, this.options));
			settingsView.render();
		} else if(this.options.activity) {
    		this.activateTab('api-activity');
			var actView = Vm.create(this, 'apipage', ActivityView, _.extend({parent : this}, this.options));
			actView.render();
		} else {
			// default to documentation section
			var docsView = Vm.create(this, 'apipage', DocsView, _.extend({parent : this}, this.options));
			docsView.render();
		}
	},

    /** ------------ shared behaviours ----------------*/

    // mark tab active
    activateTab : function(clss) {
      $('.api-container .tabs li.active').removeClass('active');
      $('.api-container .tabs .' + clss).addClass('active');
    },

    editDescription: function(ev) {
      var modal = Modal.create({
        inline: {
        	from : $(ev.currentTarget),
        	model : this.options.model.toApi(),
        	field : 'description'
        }
      });
      modal.show();
    },

    unfollowApi: function (ev) {

        return false;
    },
    followApi: function (ev) {
     	return false;
    },

    shareApi : function(ev) {
    	// :TODO:
    }
  });
  return NewApiPage;
});
