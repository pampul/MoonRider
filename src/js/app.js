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
    return console.log(moonRider);
  });
};

delay = function(ms, func) {
  return setTimeout(func, ms);
};
