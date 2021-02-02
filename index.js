const axios = require('axios')
const url = 'http://checkip.amazonaws.com/';

const express = require('express')
const app = express()
const port = 3000

app.all('*', async (req, res) => {
  const ip = await axios(url);

  console.log(`Headers: ${JSON.stringify(req.headers)}`)

  console.log(req.originalUrl)
  res.json({
    method: req.method,
    source: ip.data.trim(),
    path: req.path,
    message: "In local node app",
    now: (new Date()).toISOString()
  })
})

app.listen(port, () => {
  console.log(`sam-app-hello-world listening at http://localhost:${port}`)
})
