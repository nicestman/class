const redis = require('redis')
const client = redis.createClient()
const {downloadImg} = require('./download')

module.exports = ($, url) => {
  console.log(url);
  switch (url) {
    case 'https://douban.com/': {
      _parse_index($, '/api/index/vistor')
    }
    break
    case 'https://book.douban.com/': {
      _parse_book_index($, '/api/book')
    }
    break
    case 'https://book.douban.com/tag/': {
      _parse_book_tags($, '/api/tags')
    }
    break
  }
}

let _parse_book_tags = ($, key) => {
  let names = [];
  $('.tag-title-wrapper').each(function(index, el) {
    names.push(el.attribs.name);
  });
  let tags = [];
  $('.tagCol').each(function(parentIndex, parentEl) {
    let tempArr = [];
    $(parentEl).find('td').each(function(index, el) {
      let title = $(el).children('a').text()
      let num = $(el).children('b').text()
      tempArr.push({
        tag: names[parentIndex],
        title: title,
        num: num
      })
    })
    tags.push(tempArr)
  })
  client.set(key, JSON.stringify(tags), function (err, data) {
    if (err) {
      console.log(err.ReplyError)
    }
  })
}

let _parse_book_index = ($, key) => {
  let booksExpress = []
    $('#wrapper #content .article .books-express .bd .carousel .slide-list ul').each(function(index, parentEl) {
      let items = []
      $(parentEl).find('li').each(function(index, el) {

        let link = $(el).find('.cover a').attr().href
        let pic = $(el).find('.cover a img').attr().src
        let title = $(el).find('.info .title a').text().trim()
        let author = $(el).find('.info .author').first().text().trim()
        let year = $(el).find('.info .more-meta .year').text().trim()
        let publisher = $(el).find('.info .more-meta .publisher').text().trim()
        let abstract = $(el).find('.info .more-meta .abstract').text().trim()
        console.log('---------------')
        console.log(link)
        console.log(pic)
        console.log(title)
        console.log(author)
        console.log(year)
        console.log(publisher)
        console.log(abstract)
        items.push({
          link: link,
          pic: pic,
          title: title,
          author: author,
          year: year,
          publisher: publisher,
          abstract: abstract
        })
      });
      booksExpress.push(items)
    })

    let popularBooks = []
    $('#wrapper #content .article .popular-books .bd ul li').each(function(index, el) {
      let link = $(el).find('.cover a').attr().href
      let pic = $(el).find('.cover a img').attr().src
      let title = $(el).find('.info .title a').text().trim()
      let score = $(el).find('.info .entry-star-small .average-rating').text().trim()
      let author = $(el).find('.info .author').text().trim()
      let type = $(el).find('.info .book-list-classification').text().trim()
      let reviews = $(el).find('.info .reviews').text().trim()
      let commenter = $(el).find('.info .reviews a').text().trim()
      reviews = reviews.replace('(' + commenter + ')', '')
      console.log('---------------')
      console.log(link)
      console.log(pic)
      console.log(title)
      console.log(author)
      console.log(type)
      console.log(reviews)
      console.log(commenter)
      popularBooks.push({
        link: link,
        pic: pic,
        title: title,
        author: author,
        type: type,
        reviews: reviews,
        commenter: commenter
      })
    })

    let marketBooksBdEl = $('#wrapper #content .article .market-books .bd')
    var marketBooksStyle = $(marketBooksBdEl).find('.top .cover a .pic').attr().style
    let marketBooksPic = marketBooksStyle.substring(marketBooksStyle.indexOf('url(') + 4, marketBooksStyle.indexOf(')'))
    let marketBooksTop = {
      link: $(marketBooksBdEl).find('.top .cover a').attr().href,
      pic: downloadImg(marketBooksPic),
      title: $(marketBooksBdEl).find('.top #market_books_header_info .title').text(),
      price: $(marketBooksBdEl).find('.top #market_books_header_info .title .price').text(),
      desc: $(marketBooksBdEl).find('.top #market_books_header_info .desc').text()
    }
    

    console.log(marketBooksPic);
    console.log(marketBooksTop)

    let marketBooksItems = []
    $(marketBooksBdEl).find('ul li').each(function(index, el) {
      let link = $(el).find('.cover a').attr().href
      let pic = $(el).find('.cover a img').attr().src
      let title = $(el).find('.info .title a').text().trim()
      let price = $(el).find('.info .price').text().trim()
      console.log('---------------')
      console.log(link)
      console.log(pic)
      console.log(title)
      console.log(price)
      marketBooksItems.push({
        link: link,
        pic: pic,
        title: title,
        price: price
      })
    })
    let marketBooks = {
      top: marketBooksTop,
      items: marketBooksItems
    }

    let ebooks = []
    $('#wrapper #content .article .ebook-area .bd .sub-section .sub-bd ul li').each(function(index, el) {
      let link = $(el).find('.cover a').attr().href
      let pic = $(el).find('.cover a img').attr().src
      let title = $(el).find('.info .title a').text().trim()
      let price = $(el).find('.info .more-meta .price').text().trim()
      let author = $(el).find('.info .more-meta .author').first().text().trim()
      let year = $(el).find('.info .more-meta .year').text().trim()
      let publisher = $(el).find('.info .more-meta .publisher').text().trim()
      let abstract = $(el).find('.info .more-meta .abstract').text().trim()
      console.log('---------------')
      console.log(link)
      console.log(pic)
      console.log(title)
      console.log(price)
      console.log(author)
      console.log(year)
      console.log(publisher)
      console.log(abstract)
      let item = {
        link: link,
        pic: pic,
        title: title,
        price: price,
        author: author,
        year: year,
        publisher: publisher,
        abstract: abstract
      }
      ebooks.push(item)
    })

    let popularAuthors = []
    $('#wrapper #content .article .popular-authors .bd ul li').each(function(index, el) {
      let name = $(el).find('.userface').attr().alt
      let pic = $(el).find('.userface').attr().src
      let link = $(el).find('.w210 p').first().find('a').attr().href
      let to = $(el).find('.entry-star-small .fleft').text().trim()
      let info = $(el).find('.w210 p')['2'].children[1].children[0].data
      let num = $(el).find('.color-gray span').first().text().trim()
      let time = $(el).find('.color-gray span').last().text().trim()
      console.log('---------------')
      console.log(link)
      console.log(pic)
      console.log(name)
      console.log(info)
      console.log(to)
      console.log(num)
      console.log(time)
      popularAuthors.push({
        link: link,
        pic: pic,
        name: name,
        to: to,
        info: info,
        num: num,
        time: time
      })
    })

    let hotTags = []
    $('#wrapper #content .aside .hot-tags-col5').children('li').each(function(index, parentEl) {
      let items = []
      $(parentEl).find('ul li').each(function(index, el) {
        let title, link = ''
        if (index === 0) {
          title = el.children[0].data.trim()
          link = null
        } else {
          title = $(el).find('a').text()
          link = 'https://book.douban.com' + $(el).find('a').attr().href
        }
        console.log(title)
        console.log(link)
        items.push({
          title: title,
          link: link
        })
      })
      hotTags.push(items)
    })

    let weeklyTop = []
     $('#wrapper #content .aside .weekly-top .bd .list').each(function(index, parentEl) {
       let items = []
       $(parentEl).find('.item').each(function(index, el) {
         let title = $(el).find('.book-info a').text()
         let link = $(el).find('.book-info a').attr().href
         let author = $(el).find('.book-info .author').text()
         let buy = $(el).children('a')['0'].attribs
         console.log(title)
         console.log(link)
         console.log(author)
         console.log(buy)
         items.push({
          title: title,
          link: link,
          author: author,
          buy: buy
         })
       })
       weeklyTop.push(items)
     })

     let bookRec = []
     $('#wrapper #content .block5 #book_rec dl').each(function(index, el) {
       let link = $(el).find('dd a').attr().href
       let pic = $(el).find('dt a img').attr().src
       let title = $(el).find('dd a').text().trim()
       console.log(title)
       console.log(link)
       console.log(pic)
       bookRec.push({
         title: title,
         link: link,
         pic: pic
       })
     })
    
    let obj = {
      booksExpress: booksExpress,
      marketBooks: marketBooks,
      ebooks: ebooks,
      popularBooks: popularBooks,
      popularAuthors: popularAuthors,
      weeklyTop: weeklyTop,
      hotTags: hotTags,
      bookRec: bookRec
    }
    client.set(key, JSON.stringify(obj), function (err, data) {
      if (err) {
        console.log(err.ReplyError)
      }
      // socket.emit('system', moment().format('YYYY-MM-DD h:mm:ss A'));
      // if (err) {
      //   socket.emit('system', 'Redis Error!')
      //   return
      // }
      // socket.emit('system', 'Success!')
    })
}

let _parse_index = ($, key) => {
  let app_title = $('#anony-reg-new .app-title span').parent().text().trim()
    let app_version = $('#anony-reg-new .app-title span').text().trim()
    let app_slogan = $('#anony-reg-new .app-slogan span').text().trim()
    let lnk_app = $('#anony-reg-new .lnk-app').attr().href
    let expand_qr = $('#anony-reg-new #expand-qr img').attr().src
    let app_qr_expand = $('#anony-reg-new .app-qr-expand img').attr().src
    console.log(app_title);
    console.log(app_version);
    console.log(app_slogan);
    console.log(lnk_app);
    console.log(expand_qr);
    console.log(app_qr_expand);

    let yike_link = $('#anony-sns .side div').first().find('a').attr().href
    let yike_pic = $('#anony-sns .side div').first().find('a img').attr().src
    // console.log(yike_link);
    // console.log(yike_pic);

    let albums = []
    $('#anony-sns .albums ul li').each(function(index, el) {
      let title = $(el).find('a').text().trim()
      let link = $(el).find('a').attr().href
      let num = $(el).find('.num').text().trim()
      let pic = $(el).find('.pic a img').attr().src
      console.log(title);
      console.log(link);
      console.log(num);
      console.log(pic);
      albums.push({
        title: title,
        link: link,
        num: num,
        pic: pic
      })
    });

    let notes = []
    $('#anony-sns .main .mod .notes ul li').each(function(index, el) {
      let title, link, author, desc
      if (index === 0) {
        title = $(el).find('.title a').text().trim()
        link = $(el).find('.title a').attr().href
        author = $(el).find('.author').text().trim()
        desc = $(el).find('p').text().trim()
      } else {
        title = $(el).find('a').text().trim()
        link = $(el).find('a').attr().href
        author = 0;
        desc = 0;
      }
      console.log(title);
      console.log(link);
      console.log(author);
      console.log(desc);
      notes.push({
        title: title,
        link: link,
        author: author,
        desc: desc
      })
    });

    let onlines = []
    $('#anony-sns .side .online ul li').each(function(index, el) {
      if (index === 3) {
        return false;
      }
      let title = $(el).find('.title a').text().trim()
      let link = $(el).find('.title a').attr().href
      let time = $(el).find('.desc').text().trim().substring(0, $(el).find('.desc').text().trim().indexOf('日', 11) + 1)
      let desc = $(el).find('.desc span').text().trim()
      console.log(title);
      console.log(link);
      console.log(time);
      console.log(desc);
      onlines.push({
        title: title,
        link: link,
        time: time,
        desc: desc
      })
    });

    let book_side_links = []
    $('#anony-book .sidenav .side-links ul li').each(function(index, el) {
      let title = $(el).find('a').text().trim()
      let link = $(el).find('a').attr().href
      console.log(title);
      console.log(link);
      book_side_links.push({
        title: title,
        link: link
      });
    });

    let books = []
    $('#anony-book .main .mod').each(function(index, el) {
      let mod = []
      $(el).find('ul li').each(function(index, el) {
        let title = $(el).find('.title a').text().trim()
        let link = $(el).find('.pic a').attr().href
        let reader = $(el).find('.bn-link').attr().href
        let author = $(el).find('.author').text().trim()
        let price = $(el).find('.price').text().trim() | ''
        let pic = $(el).find('.pic a img').attr().src
        console.log(title);
        console.log(link);
        console.log(reader);
        console.log(author);
        console.log(price);
        console.log(pic);
        mod.push({
          title: title,
          link: link,
          reader: reader,
          author: author,
          price: price,
          pic: pic
        })
      })
      books.push(mod)
    })

    let book_tags = []
    $('#anony-book .side .book-cate-mod .cate').each(function(index, el) {
      let tags = []
      $(el).find('ul li').each(function(index, el) {
        let title = ''
        let link = ''
        if (index === 0) {
          title = $(el).text().trim()
        } else {
          title = $(el).find('a').text().trim()
          link = $(el).find('a').attr().href.trim()
        }
        console.log(title);
        console.log(link);
        tags.push({
          title: title,
          link: link
        })
      })
      book_tags.push(tags)
    })

    let obj = {
      'app': {
        'title': app_title.substring(0,2),
        'version': app_version,
        'slogan': app_slogan,
        'lnk_app': lnk_app,
        'expand_qr': expand_qr,
        'qr_expand': app_qr_expand,
      },
      'sns': {
        'yike': {
        'link': yike_link,
        'pic': yike_pic,
        },
        'albums': albums,
        'notes': notes,
        'onlines': onlines,
      },
      'book': {
        'book_side_links': book_side_links,
        'books': books,
        'book_tags': book_tags
      }
    }
    client.set(key, JSON.stringify(obj), function (err, data) {
      // socket.emit('system', moment().format('YYYY-MM-DD h:mm:ss A'));
      // if (err) {
      //   socket.emit('system', 'Redis Error!')
      //   return
      // }
      // socket.emit('system', 'Success!')
    })
}