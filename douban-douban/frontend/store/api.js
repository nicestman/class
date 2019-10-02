import LRU from 'lru-cache'
import Vue from 'vue'
const superagent = require('superagent')
const {host} = require('../../config.js')
const apiHost = host() + '/api'
// const inBrowser = typeof window !== 'undefined'
// When using bundleRenderer, the server-side application code runs in a new
// context for each request. To allow caching across multiple requests, we need
// to attach the cache to the process which is shared across all requests.
// const cache = inBrowser
//   ? null
//   : (process.__API_CACHE__ || (process.__API_CACHE__ = createCache()))

// function createCache () {
//   return LRU({
//     max: 1000,
//     maxAge: 1000 * 60 * 15 // 15 min cache
//   })
// }

function fetch (url) {
  console.log(apiHost + url)
  return new Promise((resolve, reject) => {
    superagent
   .get(apiHost + url)
   .end((err,response) => {
      if (err) {
        console.log('error!' + url);
        return
      }
      console.log('success!' + url);
      resolve(JSON.parse(response.text))
    })
 })
}

export function fetchItem (url) {
  return fetch(url)
}

export function fetchSearchItems (type) {
  let url = encodeURI('https://api.douban.com/v2/book/search?q=' + type)
  return new Promise((resolve, reject) => {
    superagent
   .get(url)
   .end((err,response) => {
      if (err) {
        console.log('error!' + url);
        return
      }
      console.log('success!' + url);
      resolve(JSON.parse(response.text))
    })
 })
}

export function fetchSearchItem (id) {
  let url = encodeURI('https://api.douban.com/v2/book/' + id)
  return new Promise((resolve, reject) => {
    superagent
   .get(url)
   .end((err,response) => {
      if (err) {
        console.log('error!' + url);
        return
      }
      console.log('success!' + url);
      resolve(JSON.parse(response.text))
    })
 })
}



