define([
  'setup/logging'
], function (Logging){
  var setup = function () {
    Logging.setup();
  }
  return {
    setup: setup
  }

});