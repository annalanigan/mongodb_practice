const express = require('express');
const parser = require('body-parser');
const server = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

server.use(parser.json());
server.use(express.static('client/build')); //will look for the file called index so the path must direct it to that file
server.use(parser.urlencoded({extended: true}));

MongoClient.connect('mongodb://localhost:27017', function(err, client){
  if(err){
    console.log(err);
    return;
  }

  const db = client.db("disney_cartoons");
  console.log('connected to Disney Database');

// to post an object
  server.post('/api/disney', function(req, res){
    db.collection('characters').save(req.body, function(err, result){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }
      res.status(201);
      res.json(result.ops[0]);
      console.log("saved to the characters database");
    });
  })

// to get all objects
  server.get('/api/disney', function(req, res){
    db.collection('characters').find().toArray(function(err, result){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }
      res.json(result);
    });
  })

// to delete one object
  server.delete('/api/disney/:id', function(req, res){
    db.collection('characters').deleteOne({ "_id": ObjectID(req.params.id)}, function(err, result){
      if(err){
        res.status(500),
        res.send();
      }
      res.status(204);
      res.json(result);
    });
  })

// to delete all objects
  server.delete('/api/disney', function(req, res){
    db.collection('characters').deleteMany(function(err, result){
      if(err){
        res.status(500),
        res.send();
      }
      res.status(204);
      res.json(result);
    });
  })

// update existing
  server.put('/api/disney/:id', function(req, res){
    db.collection('characters').update({"_id": ObjectID(req.params.id)}, req.body, function(err, result){
      if(err){
        res.status(500),
        res.send();
      }
      res.status(204);
      res.send();
    })
  })

  server.listen(3000, function(){
    console.log("listening on port 3000");
  })

})
