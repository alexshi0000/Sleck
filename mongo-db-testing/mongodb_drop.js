var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/'

MongoClient.connect(url, (err, db) => {
  if (err)
    throw err
  var dbo = db.db('mydb')
  dbo.collection('customers').drop((err, delOK) => { //define a callback
    if (err)
      throw err
    if (delOK)
      console.log('Collection was deleted')
    db.close()
  })
})
