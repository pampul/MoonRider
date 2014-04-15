###
  Index Controller
###
path = require('path')
fs = require('fs')
config = require("./../config/config")

# Globals
datas =
  year:
    path: ''
    stats: {}
  month:
    path: ''
    stats: {}
  day:
    path: ''
    stats: {}


exports.index = (req, res) ->
  date = new Date();
  webSitePath = config.root + '/data/' + req.params.site
  datas.year.path = webSitePath + '/' + date.getFullYear()
  datas.month.path = datas.year.path + '/' + pad(date.getMonth() + 1)
  datas.day.path = datas.month.path + '/' + pad(date.getDate())

  if fs.existsSync(webSitePath)
    res.send 'Data found'
    #res.render 'index', {"title": "Ninja Stack"}

    # Get current day data
    files = fs.readdirSync(datas.day.path)
    datas.day.stats = getDataForFiles(datas.day.path + '/', files)

    # Get current month data
    files = getMonthFiles(datas.month.path + '/')
    datas.month.stats = getDataForFiles(datas.month.path + '/', files)

    # Get current year data
    files = getYearFiles(datas.year.path + '/')
    datas.year.stats = getDataForFiles(datas.year.path + '/', files)
    console.log datas.year.stats

  else
    res.send 'No data founded.'
  return


## Data functions
pad = (n) ->
  (if n < 10 then "0" + n else n)

parseJson = (file) ->
  data = fs.readFileSync file
  data = JSON.parse(data)
  return data

getMonthFiles = (monthDir)->
  files = []
  days = fs.readdirSync(monthDir)
  for day in days
    filesInDay = fs.readdirSync(monthDir + '/' + day)
    for file in filesInDay
      files.push day + '/' + file

  return files

getYearFiles = (yearDir)->
  files = []
  months = fs.readdirSync(yearDir)
  for month in months
    days = fs.readdirSync(yearDir + '/' + month)
    for day in days
      filesInDay = fs.readdirSync(yearDir + '/' + month + '/' + day)
      for file in filesInDay
        files.push month + '/' + day + '/' + file

  return files

getDataForFiles = (rootPath, files) ->
  stats =
    totalLoadingTime:
      max: 0
      min: 0
      total: 0
      avg: 0
    domContentLoadTime:
      max: 0
      min: 0
      total: 0
      avg: 0
    serverLoadingTime:
      max: 0
      min: 0
      total: 0
      avg: 0
    loadEventTime:
      max: 0
      min: 0
      total: 0
      avg: 0
    count: files.length

  for file in files
    data = parseJson(rootPath + file)

    stats.totalLoadingTime.total += data.performance.totalLoadingTime
    stats.totalLoadingTime.max = data.performance.totalLoadingTime if data.performance.totalLoadingTime > stats.totalLoadingTime.max
    stats.totalLoadingTime.min = data.performance.totalLoadingTime if data.performance.totalLoadingTime < stats.totalLoadingTime.min or stats.totalLoadingTime.min == 0

    stats.domContentLoadTime.total += data.performance.domContentLoadTime
    stats.domContentLoadTime.max = data.performance.domContentLoadTime if data.performance.domContentLoadTime > stats.domContentLoadTime.max
    stats.domContentLoadTime.min = data.performance.domContentLoadTime if data.performance.domContentLoadTime < stats.domContentLoadTime.min or stats.domContentLoadTime.min == 0

    stats.serverLoadingTime.total += data.performance.serverLoadingTime
    stats.serverLoadingTime.max = data.performance.serverLoadingTime if data.performance.serverLoadingTime > stats.serverLoadingTime.max
    stats.serverLoadingTime.min = data.performance.serverLoadingTime if data.performance.serverLoadingTime < stats.serverLoadingTime.min or stats.serverLoadingTime.min == 0

    stats.loadEventTime.total += data.performance.loadEventTime
    stats.loadEventTime.max = data.performance.loadEventTime if data.performance.loadEventTime > stats.loadEventTime.max
    stats.loadEventTime.min = data.performance.loadEventTime if data.performance.loadEventTime < stats.loadEventTime.min or stats.loadEventTime.min == 0

  stats.totalLoadingTime.avg = (stats.totalLoadingTime.total / stats.count).toFixed(1)
  stats.domContentLoadTime.avg = (stats.domContentLoadTime.total / stats.count).toFixed(1)
  stats.serverLoadingTime.avg = (stats.serverLoadingTime.total / stats.count).toFixed(1)
  stats.loadEventTime.avg = (stats.loadEventTime.total / stats.count).toFixed(1)

  return stats