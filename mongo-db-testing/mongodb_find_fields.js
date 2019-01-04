/*
 * second parameter of find() method is the projection object that describes which
 * fields to include in the result. this parameter is optional and if ommitted
 * all fields will be included in the result instead
 */

var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017'

MongoClient.connect(url, (err, db) => {
  if (err)
    throw err
  var dbo = db.db('mydb')
  dbo.collection('customers').find({}, {projection: { _id: 0, name: 1, address: 1}})
  /*
   * what that does is it returns fields name and address of all documents
   * in the customers collection
   */
    .toArray((err, result) => {
      if (err)
        throw err
      console.log(result)
      db.close()
    })
})
