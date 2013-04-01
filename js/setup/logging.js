define([
  'jquery',
  'libs/events/event_bus',
  'libs/events/events',
  'libs/proxino/proxino',
  'clicky'
], function ($, EventBus, Events, norefProxino, noclickyref){
  var setup = function () {
    // Clicky Tracking
    try{ clicky.init(66633495); }catch(e){}

    // Google analytics
    EventBus.on('all', function (event) {
      ga('send', {
        hitType: 'event',
        eventCategory: 'app',
        eventAction: event
      })
    });

    // Proxino Error tracking
    Proxino.key = "QI-BctdhtytsUUJERc5HfA";
    Proxino.track_errors();

    // Server Error Failures 

    $("body").ajaxError(function(ev, res, req) {
      if(res.status >= 500 && res.status <= 600) {
        var responseJSON = xhr.responseText;
        try {
          responseJSON = JSON.parse(xhr.responseText);
        } catch (e) {}

        var error = new ErrorModel();
        error.save({
          "page": window.location.href,
          "context": req.type + ' ' + req.url,
          "code": res.status,
          "error": "Internal API error",
          "payload": {
            sent : req.data,
            received : responseJSON
          }
        }, {});
      }
     });
  };
  return {
    setup: setup
  }
})