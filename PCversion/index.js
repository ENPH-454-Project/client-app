const express = require('express')
const cors = require('cors')
const axios = require('axios')
const app = express()
const path = require('path')
const bodyParser = require('body-parser')
const server = require('http').Server(app)
const io =  require('socket.io')(server)

/*
const SoftSPI = require('rpi-softspi')
const SPI = require('pi-spi');

const spi = SPI.initialize("/dev/spidev0.0")
*/

var dataArray = []
var lastValue = 0
var DSPArray = []
var dataCount = 0
const packetLength = 10;

/*
var client = new SoftSPI({
   clock: 15,     // pin number of SCLK
   mosi: 11,      // pin number of MOSI
   miso: 13,      // pin number of MISO
   client: 16    // pin number of CS
})
client.open()
*/

//Middleware
app.use(cors())
app.use(bodyParser.json())

//Serving files
const indexPath = path.join(__dirname, './dist/index.html');
const publicPath = express.static(path.join(__dirname, './dist'));
app.use('/', publicPath);
app.get('/', function(_,res){ res.sendFile(indexPath) });

// Socket.io
io.on('connection', (socket)=>{
  console.log('Someone Connected')
  // Timer
  socket.on('subscribeToTimer', (interval)=>{
    console.log('Client subscripbed to timer at:',interval)
    setInterval(()=>{
      socket.emit('timer', new Date())
    }, interval)
  })
  socket.on('callback', (data, fn)=>{
    fn('data')
  })
  socket.on('disconnect', ()=>{
    console.log('Someone Disconnected')
  })
})

// Requests
app.get('/data', function(req,res){
  res.send(JSON.stringify(dataArray))
})


app.get('/testSend', function(req,res){
  axios.post('https://vdlmikqfqd.execute-api.us-east-1.amazonaws.com/prod/test', {
    data:[1,2,3,4,5]
    })
    .then(function(res) {
      console.log(res.data)
    })
    .catch(function(error) {
      console.log(error.response.status + ', ' + error.response.statusText)
    })
})

//Start of Pi sections
// Collect Data
/*
for(var i=0; i<10000; i++){
  spi.read(2, function(e,d){
    if(e) console.log('error'+e)
    else {
	//lastValue = lastValue+1
	lastValue = (d[0] & 0xFF) | ((d[1] & 0x0F) << 8)
	dataArray.push(lastValue)
      //console.log('data: ')
	console.log(lastValue)
    }
  })
 //console.log(lastValue)
}
*/
// Recursive
/*
function liveData(resolve, reject) {
  spi.read(10, function(e,d){
    if(e) {console.log('error'+e)
      reject(e)
	}
    else {
	//lastValue = (d[0] & 0xFF) | ((d[1] & 0x0F) << 8)
    	dataArray.push(lastValue)
          //console.log('data: ')
    	console.log(lastValue)
      liveData(resolve)
    }
  })
}
*/
/*
function liveDataSoft(resolve, reject) {
  let bytes = client.read(1)
  console.log(bytes.reduce((a, b) => a + b, 0))
  setTimeout(()=>liveDataSoft(resolve),1000)
}


new Promise((r, j) => {
    liveDataSoft(r, j);
}).then((e) => {
    console.log('Finished')
    console.log(dataArray)
    //This will call if your algorithm succeeds!
});
*/
// End of Pi Section

  // Server Port
server.listen(3000,function() {
	console.log('App listening on port 3000')
})
 module.exports = app;
