const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
var AWS = require('aws-sdk');

var s3 = new AWS.S3();
AWS.config.loadFromPath('./awsConfig.json');

var dataArray = []
var lastValue = 0
const awsURL = "https://vdlmikqfqd.execute-api.us-east-1.amazonaws.com/prod/test"
var DSPArray = []


//Middleware
app.use(cors())
app.use(bodyParser.json())

//Serving files
const indexPath = path.join(__dirname, './dist/index.html');
const publicPath = express.static(path.join(__dirname, './dist'));

app.use('/', publicPath);

app.get('/', function(_,res){ res.sendFile(indexPath) });

app.post('/file', function (req,res){
  var options = {
      Bucket    : 'enph454-dsp-bucket',
      Key    : req.body.key,
  };

  res.attachment(req.body.key);
  var fileStream = s3.getObject(options).createReadStream();
  fileStream.pipe(res);
})


app.get('/data', function(req,res){
  res.send(JSON.stringify(dataArray))
})

/*
axios.post('https://vdlmikqfqd.execute-api.us-east-1.amazonaws.com/prod/test', {
  data:[1,2,3,4,5]
  })
  .then(function(res) {
    console.log(res.data)
  })
  .catch(function(error) {
    console.log(error.response.status + ', ' + error.response.statusText)
  })
*/

  // Server Port
app.listen(3000,function() {
	console.log('App listening on port 3000')
})
 module.exports = app;
