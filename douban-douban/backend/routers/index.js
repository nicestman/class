const { io } = require('../../server.js');
const express = require('express')
const redis = require('redis')
const client = redis.createClient()
const router = express.Router()
const request = require('../spiders/request')

setInterval(function(){
  request()
}, 1000 * 60 * 60)
// 每小时请求数据更新

router.get('*', (req, res, next) => {
  client.get('/api' + req.url, (err, data) => {
    if (err) {
      res.send(err)
      return
    }
    res.send(JSON.parse(data))
    next();
  })
})

router.get('/spider', (req, res) => {
  request()
})

// 豆瓣首页(未登录)
router.get('/index/vistor', (req, res) => {
})

router.get('/book', (req, res) => {
})

router.get('/subject/:id', (req, res) => {
})

router.get('/tags', (req, res) => {
})



// websockets连接建立
io.sockets.on('connect', (socket) => {
  socket.emit('system', 'Connect Success At  ' + moment().format('YYYY-MM-DD h:mm:ss A'))
  socket.on('system', (data) => {
    console.log(data)
  })

  // 处理爬取请求
  socket.on('climb', (data) => {
    switch (data) {
      case 'index': {
        climbIndex(superagent, cheerio, socket)
        break
      }
      case 'book/index': {
        climbBook(superagent, cheerio, socket)
        break
      }
    }
  })
})

module.exports = router