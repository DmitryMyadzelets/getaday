// Router for the server
const fs = require('fs')
const url = require('url')
const path = require('path')
 

function sendFile(res, fileName) {
  fs.createReadStream(fileName)
    .on('error', ignore => {
      res.statusCode = 404
      res.end('404 NOT FOUND')
    })
    .pipe(res)
    // The Content-Type header is set by Nginx
}

module.exports = async config => {
  // Initialization of the router
  // ...
  const { publicDir } = config
  const defaultDoc = 'index.html'

  return (req, res) => {
    try {
      const { pathname } = url.parse(req.url, true)

      switch (pathname) {
       default:
          const lastChar = pathname.charAt(pathname.length -1)
          const document = lastChar == '/' ? defaultDoc : ''
          const fileName = path.resolve(publicDir, pathname.slice(1), document)
          console.log(fileName, pathname)
          sendFile(res, fileName)
      }
    } catch (err) {
      res.statusCode = 500
      res.end('Sorry, something went wrong')
      console.error(err)
    }
  }
}
