/*! atomic v1.0.0 | (c) 2014 @toddmotto | github.com/toddmotto/atomic */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory;
  } else {
    root.atomic = factory(root);
  }
})(this, function (root) {

  'use strict';

  var exports = {};

  var parse = function (req) {
    var result;
    try {
      result = JSON.parse(req.responseText);
    } catch (e) {
      result = req.responseText;
    }
    return [result, req];
  };

  var xhr = function (type, url, data) {
    var methods = {
      success: function () {},
      error: function () {}
    };
    var XHR = root.XMLHttpRequest || ActiveXObject;
    var request = new XHR('MSXML2.XMLHTTP.3.0');
    request.open(type, url, true);
    request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    request.onreadystatechange = function () {
      if (request.readyState === 4) {
        if (request.status === 200) {
          methods.success.apply(methods, parse(request));
        } else {
          methods.error.apply(methods, parse(request));
        }
      }
    };
    request.send(data);
    return {
      success: function (callback) {
        methods.success = callback;
        return methods;
      },
      error: function (callback) {
        methods.error = callback;
        return methods;
      }
    };
  };

  exports['get'] = function (src) {
    return xhr('GET', src);
  };

  exports['put'] = function (url, data) {
    return xhr('PUT', url, data);
  };

  exports['post'] = function (url, data) {
    return xhr('POST', url, data);
  };

  exports['delete'] = function (url) {
    return xhr('DELETE', url);
  };

  return exports;

});

var MoonRider, Performance, delay;

MoonRider = (function() {
  function MoonRider() {}

  MoonRider.prototype.performance = null;

  MoonRider.prototype.setPerformance = function() {
    return this.performance = new Performance();
  };

  return MoonRider;

})();

Performance = (function() {
  Performance.prototype.timing = window.performance.timing;

  Performance.prototype.domContentReadableTime = 0;

  Performance.prototype.serverLoadingTime = 0;

  Performance.prototype.totalLoadingTime = 0;

  Performance.prototype.loadEventTime = 0;

  function Performance() {
    this.getLoadingTimes();
  }

  Performance.prototype.getLoadingTimes = function() {
    this.totalLoadingTime = this.timing.loadEventEnd - this.timing.navigationStart;
    this.domContentLoadTime = this.timing.domContentLoadedEventEnd - this.timing.responseEnd;
    this.serverLoadingTime = this.timing.responseEnd - this.timing.requestStart;
    return this.loadEventTime = this.timing.loadEventEnd - this.timing.responseEnd;
  };

  return Performance;

})();

window.onload = function() {
  return delay(0, function() {
    var moonRider;
    if (!window.performance || !performance.timing) {
      return;
    }
    moonRider = new MoonRider();
    moonRider.setPerformance();
    return console.log(moonRider.performance);
  });
};

delay = function(ms, func) {
  return setTimeout(func, ms);
};
