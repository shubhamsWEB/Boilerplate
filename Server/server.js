const server = require('./index')
const PORT = process.env.PORT || 3000
server.listen(PORT,() => {
  console.log(`server starting on port ${PORT}`)
})
