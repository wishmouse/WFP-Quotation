var express = require('express')
var app = express()
var path = require('path')
var bodyParser = require('body-parser')
var hbs = require('handlebars')
var hbsfy = require('hbsfy')
var request = require('superagent')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/', function(req, res){
  res.send('main')
})


app.listen(3000, function(){
  console.log("quoting up a storm on  .... 3000")
})

module.exports = app
