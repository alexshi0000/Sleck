
/*
 * to delete a record or document in mongodb use deleteOne() method
 * the first parameter of the deleteOne() method is a query object defining which
 * document to delete
 *
 * NOTE:
 * if the query finds more than one document only the first occurence
 * is deleted. therefore keep in mind that there willnot be any more than
 * just the first one that is deleted
 */

var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/'

MongoClient.connect(url, (err, db) => {
  if (err)
    throw err
  var dbo = db.db('mydb')
  var myquery = { address: 'Mountain 21' }
  dbo.collection('customers').deleteOne(myquery, (err, obj) => {
    if (err)
      throw err
    console.log('1 document deleted')
    db.close() //callback
  })
})
