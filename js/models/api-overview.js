define([
  'underscore',
  'backbone',
  'models/api'
], function(_, Backbone, Api) {
  var ApiModel = Api.extend({
    idAttribute: 'apiname',
    url: function () {
    	return '/user/' +this.get('username')+ '/api/' +this.get('apiname') + '/' +this.get('version') + '/summary';
    }
  });
  return ApiModel;

});
