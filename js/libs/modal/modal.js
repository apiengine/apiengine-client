define(['jquery'], function ($) {
  var defaultOptions = {

  };
  var modal = function (options) {
    var options = $.extend(defaultOptions, options);



  };

  modal.prototype.show = function () {
    this.addClass('shown')
  };
  
  modal.prototype.hide = function () {
    this.addClass('hidden')
  };

  var create = function () {
    var Modal = new modal();
    return Modal;
  };

  return {
    create: create
  };

});

// var somemodal = modal.create({content: template});
// somemodal.show();