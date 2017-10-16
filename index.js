const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')



//Middleware
app.use(cors())
app.use(bodyParser.json())

axios.post('https://vdlmikqfqd.execute-api.us-east-1.amazonaws.com/prod/test', {
  data:[1,2,3,4,5]
  })
  .then(function(res) {
    console.log(res.data)
  })
  .catch(function(error) {
    console.log(error.response.status + ', ' + error.response.statusText)
  })

  // Server Port
app.listen(3000,function() {
	console.log('App listening on port 3000')
})
 module.exports = app;
