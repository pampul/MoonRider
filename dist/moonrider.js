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

var MoonRider, Performance, moonRider;

MoonRider = (function() {
  function MoonRider() {}

  MoonRider.prototype.performance = null;

  MoonRider.prototype.setPerformance = function() {
    return this.performance = new Performance();
  };

  return MoonRider;

})();

Performance = (function() {
  Performance.prototype.domContentReadableTime = 0;

  Performance.prototype.domContentLoadTime = 0;

  Performance.prototype.loadEventTime = 0;

  function Performance() {
    this.getLoadingTimes();
  }

  Performance.prototype.getLoadingTimes = function() {
    this.domContentLoadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart;
    this.domContentReadableTime = window.performance.timing.domComplete - window.performance.timing.navigationStart;
    return this.loadEventTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart;
  };

  return Performance;

})();

moonRider = new MoonRider();

moonRider.setPerformance();

console.log(moonRider.performance.domContentLoadTime);
