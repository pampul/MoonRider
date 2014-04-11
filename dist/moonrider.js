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

'use strict';
var Client, MoonRider, Performance, WebSite, delay,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

MoonRider = (function() {
  MoonRider.prototype.performance = null;

  MoonRider.prototype.webSite = null;

  MoonRider.prototype.client = null;

  function MoonRider() {
    this.client = new Client();
    this.webSite = new WebSite();
    this.performance = new Performance();
  }

  MoonRider.prototype.setPerformance = function() {
    this.performance = new Performance();
  };

  return MoonRider;

})();

Performance = (function() {
  Performance.prototype.domContentReadableTime = 0;

  Performance.prototype.serverLoadingTime = 0;

  Performance.prototype.totalLoadingTime = 0;

  Performance.prototype.loadEventTime = 0;

  function Performance() {
    this.setLoadingTimes();
  }

  Performance.prototype.setLoadingTimes = function() {
    var timing;
    timing = window.performance.timing;
    this.totalLoadingTime = timing.loadEventEnd - timing.navigationStart;
    this.domContentLoadTime = timing.domContentLoadedEventEnd - timing.responseEnd;
    this.serverLoadingTime = timing.responseEnd - timing.requestStart;
    this.loadEventTime = timing.loadEventEnd - timing.responseEnd;
  };

  return Performance;

})();

WebSite = (function() {
  WebSite.prototype.host = null;

  function WebSite() {
    this.setHost();
  }

  WebSite.prototype.setHost = function() {
    var pathArray, windowHost;
    windowHost = window.location.host;
    if (windowHost === 'localhost') {
      pathArray = window.location.pathname.split('/');
      if (pathArray[1]) {
        this.host = windowHost + '/' + pathArray[1];
      } else {
        this.host = windowHost;
      }
    } else {
      this.host = windowHost;
    }
  };

  return WebSite;

})();

Client = (function() {
  Client.prototype.isTouch = false;

  function Client() {
    this.isTouch = __indexOf.call(window, 'ontouchstart') >= 0;
  }

  return Client;

})();

window.onload = function() {
  return delay(0, function() {
    var moonRider;
    if (!window.performance) {
      return;
    }
    moonRider = new MoonRider();
    atomic.post('/server/stats', JSON.stringify(moonRider)).success(function() {}).error(function() {
      return console.log('Error while loading server');
    });
  });
};

delay = function(ms, func) {
  return setTimeout(func, ms);
};
