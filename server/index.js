const http = require('http')
const Router = require('./router')
const config = {
  publicDir: process.argv[2] || ''
}

;(async function main() {
  const router = await Router(config)
  const { port } = config || 0

  http
    .createServer(router)
    .listen(port, function () {
      const { port } = this.address()
      console.log(`Go to http://127.0.0.1:${ port }`)
    })
})()
