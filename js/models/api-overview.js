define([
  'underscore',
  'backbone',
  'models/api'
], function(_, Backbone, Api) {
  var ApiModel = Api.extend({
    idAttribute: 'apiname',
    url: function () {
    	return '/user/' +this.get('username')+ '/api/' +this.get('apiname') + '/' +this.get('version') + '/summary';
    },

    toApi : function() {
    	return new Api({
    		username	: this.get('username'),
			apiname		: this.get('apiname'),
			version		: this.get('version'),
			label		: this.get('label'),
			baseurl		: this.get('baseurl'),
			index		: this.get('index')
    	});
    }
  });
  return ApiModel;

});
