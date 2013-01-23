define([
	'underscore',
	'backbone'
], function(_, Backbone) {
	var AcountModel = Backbone.Model.extend({
		idAttribute : 'login',
		url: function() {
			return '/user/' + this.get('login');
		}
	});
	return AcountModel;

});
