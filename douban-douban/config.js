const port = process.env.PORT || '4000'
module.exports.port = port

module.exports.host = function () {
  const isProd = process.env.NODE_ENV === 'production'
  
  const devHost = 'http://127.0.0.1:' + 8080
  const prodHost = 'http://book.jk77.me:' + port
  const host = isProd ? prodHost : devHost
  return host
}
