var MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27017/'

MongoClient.connect(url, (err, db) => {
  if (err)
    throw err
  var dbo = db.db('mydb')
  dbo.collection('customers').findOne({}, (err, result) => {
    /*
     * first parameter is query object that is used to find the first occurence
     * of a selection. in this example we use an empty query object which selects
     * all documents in collection but retrusn the *first document*
     */
    if (err)
      throw err
    console.log(result.name) //result is what we found and name is the field
    db.close()
  })
})
