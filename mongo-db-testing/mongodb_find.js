var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017'

MongoClient.connect(url, (err, db) => {
  if (err)
    throw err
  var dbo = db.db('mydb')
  dbo.collection('customers').find({}).toArray((err, result) => {
    if (err)
      throw err
    console.log(result)
    db.close()
    /*
     * callback inside last operation
     * lmfao there is so many extra because i ran the insert many function too
     * many times
     */
  })
})
