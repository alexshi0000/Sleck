var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/'

MongoClient.connect(url, (err, db) => {
  if (err)
    throw err
  var dbo = db.db('mydb')
  var myquery = { address: /^H/ }
  //delete all documents were the address starts with the letter "O"
  dbo.collection('customers').deleteMany(myquery, (err, obj) => {
    if (err)
      throw ervr
    console.log(obj.result.n + ' documents(s) deleted')
    db.close
  })
})

/*
 * the deleteMany() method returns an object which contains information about
 * how the execution affected the database
 *
 * Most of the information is not important to understand, but one object inside
 * the object is called 'result' which tells us if the execution went OK, and
 * how many documents were affected
 *
 * the result object looks like this:
 * { n: 2, ok: 1 }
 */
