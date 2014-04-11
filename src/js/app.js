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
    atomic.post('/server/status', JSON.stringify(moonRider)).success(function() {}).error(function() {
      return console.log('Error while sending data to server ...');
    });
  });
};

delay = function(ms, func) {
  return setTimeout(func, ms);
};
