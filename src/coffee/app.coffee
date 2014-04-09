## Main class
class MoonRider
  performance: null

  setPerformance: ->
    this.performance = new Performance()


## Basic performances class
class Performance
  timing: window.performance.timing
  domContentReadableTime: 0
  serverLoadingTime: 0
  totalLoadingTime: 0
  loadEventTime: 0

  constructor: ->
    this.getLoadingTimes()

  getLoadingTimes: ->
    this.totalLoadingTime = this.timing.loadEventEnd - this.timing.navigationStart
    this.domContentLoadTime = this.timing.domContentLoadedEventEnd - this.timing.responseEnd
    this.serverLoadingTime = this.timing.responseEnd - this.timing.requestStart
    this.loadEventTime = this.timing.loadEventEnd - this.timing.responseEnd



## MoonRider
window.onload = ->
  delay 0, ->
    # old browser, cancel analytics
    return  if not window.performance or not performance.timing

    # init MoonRider
    moonRider = new MoonRider()
    moonRider.setPerformance()

    console.log moonRider


## Usefull functions
delay = (ms, func) ->
  setTimeout func, ms