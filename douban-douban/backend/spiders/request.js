const moment = require('moment')
const superagent = require('superagent')
const redis = require('redis')
const client = redis.createClient()
const cheerio = require('cheerio')
const download = require('./download')
const parse = require('./parse')

// 带爬取的 url
let mainUrls = [
'https://book.douban.com/',
'https://douban.com/',
'https://book.douban.com/tag/'
]

// 爬取数据
module.exports = () => {
  // let _log = console.log
  // console.log = function (data) {
  //   _log(data)
  //   _log.call(console, arguments)
  // }
  for (var i = 0; i < mainUrls.length; i++) {
    let url = mainUrls[i]
    superagent
    .get(url)
    .set({
      Referer: url,
      'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:39.0) Gecko/20100101 Firefox/39.0'
    })
    .end(function (err, res) {
      if (err) {
        console.log('出现错误:' + url + '' + err)
        return
      }
      console.log('正在解析' + url);
      let $ = cheerio.load(res.text)
      download($)
      parse($, url)
    })
  }
}

