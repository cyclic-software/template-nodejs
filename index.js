const axios = require('axios')
const url = 'http://checkip.amazonaws.com/';
const bodyParser = require('body-parser')

const express = require('express')
const app = express()
const port = 3000

// Accept both form and json encoded bodies
app.use(bodyParser.urlencoded({extended: false})); // application/x-www-form-urlencoded
app.use(bodyParser.json()); // application/json

app.all('*', async (req, res) => {
  const ip = await axios(url);

  console.log(`Headers: ${JSON.stringify(req.headers)}`)
  console.log(`Body: ${JSON.stringify(req.body)}`)

  console.log(req.originalUrl)
  res.json({
    method: req.method,
    source: ip.data.trim(),
    path: req.path,
    message: "In local node app",
    now: (new Date()).toISOString(),
    body: req.body,
    headers: req.headers
  })
})

app.listen(port, () => {
  console.log(`
Listening at http://localhost:${port}
Use Ctrl-C to quit you are done.

Trying testing with one of the following commands:

  curl -i -XGET http://localhost:3000/user/1 --header "x-feature-flag: xyz"

  curl -i -XPOST http://localhost:3000/ --data '{"param1":"awesome value 1"}'

`)
})
