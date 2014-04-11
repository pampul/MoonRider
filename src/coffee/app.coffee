## Main class
class MoonRider
  performance: null
  webSite: null
  client: null

  constructor: ->
    this.client = new Client()
    this.webSite = new WebSite()
    this.performance = new Performance()

  setPerformance: ->
    this.performance = new Performance()


## Basic performances class
class Performance
  domContentReadableTime: 0
  serverLoadingTime: 0
  totalLoadingTime: 0
  loadEventTime: 0

  constructor: ->
    this.setLoadingTimes()

  setLoadingTimes: ->
    timing = window.performance.timing
    this.totalLoadingTime = timing.loadEventEnd - timing.navigationStart
    this.domContentLoadTime = timing.domContentLoadedEventEnd - timing.responseEnd
    this.serverLoadingTime = timing.responseEnd - timing.requestStart
    this.loadEventTime = timing.loadEventEnd - timing.responseEnd
    return

## WebSite info
class WebSite
  host: null

  constructor: ->
    this.setHost()

  setHost: ->
    windowHost = window.location.host
    if windowHost == 'localhost'
      pathArray = window.location.pathname.split( '/' )
      if pathArray[1]
        this.host = windowHost + '/' + pathArray[1]
      else
        this.host = windowHost
    else
      this.host = windowHost

## Client info
class Client
  isTouch: false

  constructor: ->
    this.isTouch = 'ontouchstart' in window;


## MoonRider
window.onload = ->
  delay 0, ->
    # old browser, cancel analytics
    return  if not window.performance or not performance.timing

    # init MoonRider
    moonRider = new MoonRider()

    atomic.post("/server/stats", JSON.stringify(moonRider)).success((data, xhr) ->
      # data sent
    ).error (data, xhr) ->
      console.log 'Error while loading server'
    return



## Usefull functions
delay = (ms, func) ->
  setTimeout func, ms