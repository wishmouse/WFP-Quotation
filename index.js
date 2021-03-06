var express = require('express')
var app = express()
var path = require('path')
var bodyParser = require('body-parser')
var hbs = require('handlebars')
var hbsfy = require('hbsfy')
var request = require('superagent')
var mongodb = require('mongodb')
var polyfill = require("babel-polyfill")
var cons = require('consolidate')

// view engine setup
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'html')

//app.set('views', path.join(__dirname, 'views'))
//app.set('view engine', 'hbs')
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/', function(req, res){
  res.render("main")
})

app.post('/salesman', function(req, res){
  inputDataSalesman =  req.body //returns object
  var MongoClient = mongodb.MongoClient
  var url = "mongodb://localhost:27017/salesman"
  MongoClient.connect(url, function(err, db){
    if (err){
      console.log("ooops there's an error: ", err)
    } else {
      var collection = db.collection("salesman")
      var newData = inputDataSalesman
      console.log("salesman", newData)
        collection.insert([newData], function(err, result){
        if (err){
          console.log("there is an error: ", err)
        } else {
          res.redirect('/')
        }
        db.close()
      })
    }
  })
})

app.post('/fireplaceDatabase', function(req, res){
  inputData =  req.body //returns object
  console.log(inputData)
  var MongoClient = mongodb.MongoClient
  var url = "mongodb://localhost:27017/fireplaceDatabase"
  MongoClient.connect(url, function(err, db){
    if (err){
      console.log("ooops there is an error in database entry: ", err)
    } else {
      var collection = db.collection("fireplaceDatabase")
      var newData = inputData
        collection.insert([newData], function(err, result){
        if (err){
          console.log("ooops there is an error in database entry: ", err)
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


app.post('/hearth', function(req, res){
  inputDataHearth =  req.body //returns object
  var MongoClient = mongodb.MongoClient
  var url = "mongodb://localhost:27017/hearth"
  MongoClient.connect(url, function(err, db){
    if (err){
      console.log("ooops there's an error: ", err)
    } else {
      var collection = db.collection("hearth")
      var newData = inputDataHearth
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

app.post('/flue', function(req, res){
  inputDataFlue=  req.body //returns object
  var MongoClient = mongodb.MongoClient
  var url = "mongodb://localhost:27017/flue"
  MongoClient.connect(url, function(err, db){
    if (err){
      console.log("ooops there's an error: ", err)
    } else {
      var collection = db.collection("flue")
      var newData = inputDataFlue
      console.log("flue",newData)
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


app.get('/salesman',  function(req, res){
  var MongoClient = mongodb.MongoClient
  var url = "mongodb://localhost:27017/salesman"
  MongoClient.connect(url, function(err, db){
    if (err){
      console.log("ooops there's an error retreiving data from Database: ", err)
    } else {
      var collection = db.collection("salesman")
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

app.get('/deleteSalesman/:id',  function(req, res){
  var MongoClient = mongodb.MongoClient
  var url = "mongodb://localhost:27017/salesman"
  MongoClient.connect(url, function(err, db){
    if (err){
      console.log("ooops there's an error retreiving data from Database: ", err)
    } else {
      var collection = db.collection("salesman")
      var ObjectId = require('mongodb').ObjectId;
      var deleteId = req.params.id;
      var o_id = new ObjectId(deleteId);
      collection.remove({_id:o_id})
        db.close()
    }
  })
})

app.get('/fireplaceData',  function(req, res){
  var MongoClient = mongodb.MongoClient
  console.log("we are here")
  var url = "mongodb://localhost:27017/fireplaceDatabase"
  MongoClient.connect(url, function(err, db){
    if (err){
      console.log("ooops there's an error retreiving data from Database: ", err)
    } else {
      var collection = db.collection("fireplaceDatabase")
      console.log("... and here")
      collection.find({}).toArray(function(err, result){
        if (err){
          conosole.log("there is an error retreiving data from database: ", err)
          res.send(err)
        } else if (result.length){
          console.log(".. and evern more here..")
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
          console.log(result)
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
  var url = "mongodb://localhost:27017/fireplaceDatabase"

  MongoClient.connect(url, function(err, db){
    if (err){
      console.log("ooops there's an error retreiving data from Database: ", err)
    } else {
      var collection = db.collection("fireplaceDatabase")
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
  var url = "mongodb://localhost:27017/fireplaceDatabase"
  MongoClient.connect(url, function(err, db){
    if (err){
      console.log("ooops there's an error retreiving data from Database: ", err)
    } else {
      var collection = db.collection("fireplaceDatabase")
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
  var url ='mongodb://localhost:27017/fireplaceDatabase'
  MongoClient.connect(url, function(err, db){
    if (err){
      console.log("ooops there's an error retreiving data from Database: ", err)
    } else {
      var collection = db.collection("fireplaceDatabase")
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


app.get('/getHearthData',  function(req, res){
  var MongoClient = mongodb.MongoClient
  var url = "mongodb://localhost:27017/hearth"
  MongoClient.connect(url, function(err, db){
    if (err){
      console.log("ooops there's an error retreiving data from Database: ", err)
    } else {
      var collection = db.collection("hearth")
      collection.find({}).toArray(function(err, result){
        if (err){
          conosole.log("there is an error retreiving data from database: ", err)
          res.send(err)
        } else if (result.length){
          console.log("this is result for hearth", result)
          res.send(JSON.stringify(result))
        }
        else{
          console.log("No document found")
          res.send("No documents found")
        }
        db.close()
      })
    }
  })
})

app.get('/deleteHearth/:id',  function(req, res){
  var MongoClient = mongodb.MongoClient
  var url = "mongodb://localhost:27017/hearth"
  MongoClient.connect(url, function(err, db){
    if (err){
      console.log("ooops there's an error retreiving data from Database: ", err)
    } else {
      var collection = db.collection("hearth")
      var ObjectId = require('mongodb').ObjectId;
      var deleteId = req.params.id;
      var o_id = new ObjectId(deleteId);
      collection.remove({_id:o_id})
        db.close()
    }
  })
})

app.get('/getFlueData/',  function(req, res){
  var MongoClient = mongodb.MongoClient
  var url = "mongodb://localhost:27017/flue"
  MongoClient.connect(url, function(err, db){
    if (err){
      console.log("ooops there's an error retreiving data from Database: ", err)
    } else {
      var collection = db.collection("flue")
      collection.find({}).toArray(function(err, result){
        if (err){
          conosole.log("there is an error retreiving data from database: ", err)
          res.send(err)
        } else if (result.length){
        //  console.log("this is result for flue", result)
          res.send(JSON.stringify(result))
        }
        else{
          console.log("No document found")
          res.send("No documents found")
        }
        db.close()
      })
    }
  })
})

app.get('/deleteFlue/:id',  function(req, res){
  var MongoClient = mongodb.MongoClient
  var url = "mongodb://localhost:27017/flue"
  MongoClient.connect(url, function(err, db){
    if (err){
      console.log("ooops there's an error retreiving data from Database: ", err)
    } else {
      var collection = db.collection("flue")
      var ObjectId = require('mongodb').ObjectId;
      var deleteId = req.params.id;
      console.log("deleteId", deleteId)
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
