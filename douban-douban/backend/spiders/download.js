const fs = require('fs')
const superagent = require('superagent')
const {host} = require('../../config.js')
const dir = './public/spider_imgs/'

// 把豆瓣的图片保存到本地
module.exports = function ($) {
  // 下载图片， 保存到 public/img 目录。
  $('img').each(function(index, el) {
      let url = $(el).attr().src
      if (url.indexOf('blank.gif') != -1 && $(el).attr()['data-origin']) {
         url = $(el).attr()['data-origin']
      } 
      let newUrl = url.substring(8, url.length).replace(/\//g,'')
      if (newUrl.indexOf('?v=') != -1) {
        newUrl = newUrl.substring(0, newUrl.indexOf('?v='))
      }
      $(el).attr('src', host() + '/spider_imgs/' + newUrl)
      superagent(url).pipe(fs.createWriteStream(dir + newUrl))
    })
  // 替换 url
  $('a').each(function (index, el) {
    let href = $(el).attr().href || ''
    if (href.indexOf('https://book.douban.com/subject/') > -1) {
     let id = href.match(/[1-9][0-9]*/g)
     $(el).attr('href', '/subject/' + id)
    }
  })
}

// 下载单张图片
module.exports.downloadImg = function (url) {
  let newUrl = url.substring(8, url.length).replace(/\//g,'')
  if (newUrl.indexOf('?v=') != -1) {
    newUrl = newUrl.substring(0, newUrl.indexOf('?v='))
  }
  superagent(url).pipe(fs.createWriteStream(dir + newUrl))
  return host() + '/spider_imgs/' + newUrl
}

mkdirSync(dir,0,function(e){
    if(e){
        console.log('目录创建出错 / 已存在');
    }else{
        console.log("目录创建成功")
    }
});

function mkdirSync(url,mode,cb){
    var path = require("path"), arr = url.split("/");
    mode = mode || 0755;
    cb = cb || function(){};
    if(arr[0]==="."){//处理 ./aaa
        arr.shift();
    }
    if(arr[0] == ".."){//处理 ../ddd/d
        arr.splice(0,2,arr[0]+"/"+arr[1])
    }
    function inner(cur){
        if(!fs.existsSync(cur)){//不存在就创建一个
            fs.mkdirSync(cur, mode)
        }
        if(arr.length){
            inner(cur + "/"+arr.shift());
        }else{
            cb();
        }
    }
    arr.length && inner(arr.shift());
}