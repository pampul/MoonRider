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
