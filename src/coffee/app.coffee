class MoonRider
  performance: null

  setPerformance: ->
    this.performance = new Performance()


class Performance
  domContentReadableTime: 0
  domContentLoadTime: 0
  loadEventTime: 0

  constructor: ->
    this.getLoadingTimes()

  getLoadingTimes: ->
    this.domContentLoadTime = window.performance.timing.domContentLoadedEventEnd - window.performance.timing.navigationStart
    this.domContentReadableTime = window.performance.timing.domComplete - window.performance.timing.navigationStart
    this.loadEventTime = window.performance.timing.loadEventEnd - window.performance.timing.navigationStart


moonRider = new MoonRider()
moonRider.setPerformance()

console.log moonRider.performance.domContentLoadTime