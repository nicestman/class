# Douban Book Website
[![Build Status](https://travis-ci.org/ericjjj/douban.svg?branch=douban)](https://travis-ci.org/ericjjj/douban)

> vue.js 2.0, vuex, vue-router, vue-server-renderer,  express, cheerio, superagent, redis

## 1. Start

``` bash

# start redis

# install dependencies
npm install

# start in development
npm run dev

# init data, start spider
curl http://host:port/api/spider // replace your host:port

# build for production
npm run build

```

## 2. Notes

1. xxx
2. open http://127.0.0.1:4000/api/spider, start spider
3. pages:

   -  http://127.0.0.1:4000/

   -  http://127.0.0.1:4000/book

   -  http://127.0.0.1:4000/tags
    
   -  http://127.0.0.1:4000/tag:name
   
   -  http://127.0.0.1:4000/subject:id


### 3. Vue.js1.0 update to Vue.js2.0
1. "window undefined" in  server side render 
2. v-html replace {{{}}}
3. `webpack` error: `Invalid configuration object. Webpack has been initialised using a configuration object that does not match the API schema.`
  trick:
``` bash
$ npm uninstall webpack --save-dev

followed by

$ npm install webpack@2.1.0-beta.22 --save-dev

Then you should be able to gulp again. Fixed the issue for me.
```

 `npm run dev`
from: https://github.com/angular/angular-cli/issues/2234

```html
<div>
  <span v-for="n in 10">{{ n }}</span> // n
</div>
<div>
  <span v-for="(item, $index) in items">{{ $index }}</span> // $index
</div>
```


### 4. Update
2016 12 01 fix babel error

### 5. Tree
<pre>
.
├── README.md 
├── build
├── index.html
├── server.js
├── frontend
│   ├── App.vue
│   ├── app.js
│   ├── assets
│   ├── client-entry.js
│   ├── components
│   ├── router
│   ├── server-entry.js
│   ├── store
│   └── views
├── backend
│   ├── spiders
│   └── routers
├── node_modules
├── package.json
├── public
└── test



