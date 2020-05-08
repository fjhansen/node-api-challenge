const express = require('express');
const projectRouter = require('./data/routers/projectRouter')
const actionRouter = require('./data/routers/actionRouter')

const server = express();
const port = 9999;

server.use(express.json())

server.get('/', (req, res) => {
  console.log('H O M E')
  res.send(`❤ ❤ ❤ H O M E ❤ ❤ ❤`)
})

server.use('/api/projects', projectRouter)
server.use('/api/actions', actionRouter)

server.listen(port, () => {
  console.log(`\n ❤ ❤ ❤	 LIVE  ON  ${port} ❤ ❤ ❤	`)
})