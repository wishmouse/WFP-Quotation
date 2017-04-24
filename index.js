var express = require('express')
var app = express()
var path = require('path')
var bodyParser = require('body-parser')
var hbs = require('handlebars')
var hbsfy = require('hbsfy')
var request = require('superagent')
var mongodb = require('mongodb')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/', function(req, res){
  res.render("main")
})

app.post('/database', function(req, res){
  inputData =  req.body //returns object
  var MongoClient = mongodb.MongoClient
  var url = "mongodb://localhost:27017/database"

  MongoClient.connect(url, function(err, db){
    if (err){
      console.log("ooops there is an error in database entry: ", err)
    } else {
      var collection = db.collection("database")
      var newData = inputData
        collection.insert([newData], function(err, result){
        if (err){
          conosole.log("ooops there is an error in database entry: ", err)
        } else {
          res.redirect('/')
        }
        db.close()
      })
    }
  })
})


app.post('/quotation', function(req, res){
  inputDataQuote =  req.body //returns object
  console.log("this is inputDataQuote", inputDataQuote)
  var MongoClient = mongodb.MongoClient
  var url = "mongodb://localhost:27017/quotation"
  MongoClient.connect(url, function(err, db){
    if (err){
      console.log("ooops there's an error: ", err)
    } else {
      var collection = db.collection("quotation")
      var newData = inputDataQuote
      console.log(newData)
        collection.insert([newData], function(err, result){
        if (err){
          conosole.log("there is an error: ", err)
        } else {
          res.redirect('/')
        }
        db.close()
      })
    }
  })
})


app.get('/fireplaceData',  function(req, res){
  var MongoClient = mongodb.MongoClient
  var url = "mongodb://localhost:27017/database"
  MongoClient.connect(url, function(err, db){
    if (err){
      console.log("ooops there's an error retreiving data from Database: ", err)
    } else {
      var collection = db.collection("database")
      collection.find({}).toArray(function(err, result){
        if (err){
          conosole.log("there is an error retreiving data from database: ", err)
          res.send(err)
        } else if (result.length){
          res.send(JSON.stringify(result))
        }
        else{
          console.log("no document found")
          res.send("No documents found")
        }
        db.close()
      })
    }
  })
})

app.post('/salesman', function(req, res){
  inputDataSalesman =  req.body //returns object
  var MongoClient = mongodb.MongoClient
  var url = "mongodb://localhost:27017/quotation"
  MongoClient.connect(url, function(err, db){
    if (err){
      console.log("ooops there's an error: ", err)
    } else {
      var collection = db.collection("saleman")
      var newData = inputDataSalesman
      console.log(newData)
        collection.insert([newData], function(err, result){
        if (err){
          conosole.log("there is an error: ", err)
        } else {
          res.redirect('/')
        }
        db.close()
      })
    }
  })
})


app.get('/quotation',  function(req, res){
  var MongoClient = mongodb.MongoClient
  var url = "mongodb://localhost:27017/quotation"
  MongoClient.connect(url, function(err, db){
    if (err){
      console.log("ooops there's an error retreiving data from Database: ", err)
    } else {
      var collection = db.collection("quotation")
      collection.find({}).toArray(function(err, result){
        if (err){
          conosole.log("there is an error retreiving data from database: ", err)
          res.send(err)
        } else if (result.length){
          res.send(JSON.stringify(result))
        }
        else{
          console.log("no document found")
          res.send("No documents found")
        }
        db.close()
      })
    }
  })
})


app.get('/edit/:id',  function(req, res){
  var MongoClient = mongodb.MongoClient
  var url = "mongodb://localhost:27017/database"
  //var editId = req.params.id
  MongoClient.connect(url, function(err, db){
    if (err){
      console.log("ooops there's an error retreiving data from Database: ", err)
    } else {
      var collection = db.collection("database")
      var ObjectId = require('mongodb').ObjectId;
      var editId = req.params.id;
      var o_id = new ObjectId(editId);
      collection.find({_id:o_id}).toArray(function(err, result){
        if (err){
          conosole.log("there is an error retreiving data from database: ", err)
          res.send(err)
        } else if (result.length){
          res.send(JSON.stringify(result))
        }
        else{
          console.log("no document found")
          res.send("No documents found")
        }
        db.close()
      })
    }
  })
})

app.get('/delete/:id',  function(req, res){
  var MongoClient = mongodb.MongoClient
  var url = "mongodb://localhost:27017/database"
  MongoClient.connect(url, function(err, db){
    if (err){
      console.log("ooops there's an error retreiving data from Database: ", err)
    } else {
      var collection = db.collection("database")
      var ObjectId = require('mongodb').ObjectId;
      var editId = req.params.id;
      var o_id = new ObjectId(editId);
      collection.remove({_id:o_id})
        db.close()
    }
  })
})

app.get('/getData',  function(req, res){
  var MongoClient = mongodb.MongoClient
  var url = "mongodb://localhost:27017/database"
  MongoClient.connect(url, function(err, db){
    if (err){
      console.log("ooops there's an error retreiving data from Database: ", err)
    } else {
      var collection = db.collection("database")
      var ObjectId = require('mongodb').ObjectId;
      var editId = req.params.id;
      var o_id = new ObjectId(editId);
      collection.find({_id:o_id}).toArray(function(err, result){
        if (err){
          conosole.log("there is an error retreiving data from database: ", err)
          res.send(err)
        } else if (result.length){
          res.send(JSON.stringify(result))
        }
        else{
          console.log("no document found")
          res.send("No documents found")
        }
        db.close()
      })
    }
  })
})

app.get('/deleteQuotation/:id',  function(req, res){
  var MongoClient = mongodb.MongoClient
  var url = "mongodb://localhost:27017/quotation"
  MongoClient.connect(url, function(err, db){
    if (err){
      console.log("ooops there's an error retreiving data from Database: ", err)
    } else {
      var collection = db.collection("quotation")
      var ObjectId = require('mongodb').ObjectId;
      var deleteId = req.params.id;
      var o_id = new ObjectId(deleteId);
      collection.remove({_id:o_id})
        db.close()
    }
  })
})

app.listen(3000, function(){
  console.log("quoting up a storm on  .... 3000")
})

module.exports = app
