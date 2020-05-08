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

/* NOTES for weekend:
1. Try to do stretch, would be fun
2. Try to deploy to heroku
3. Practice with .env
4. Learn more about Helmet
5. Research other 3rd party middleware
6. Get better at thinking about edge cases
*/
