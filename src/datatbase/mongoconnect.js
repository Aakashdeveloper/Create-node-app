import mongodb from 'mongodb'
const MongoClient = mongodb.MongoClient;
const url = "mongodb://localhost:27017";

const maincall = (myObj) => {
    MongoClient.connect(url,(err,db)=> {
        if(err) throw err;
        var dbo = db.db('testdata')
        dbo.collection('first').insertOne(myObj,(err) => {
            if(err) throw err;
            console.log('data inserted')
            db.close();
        })
    })
}

// Post Call
maincall.prototype.postData = (colName,myObj) => {
    MongoClient.connect(url,(err,db)=> {
        if(err) throw err;
        var dbo = db.db('testdata')
        dbo.collection(colName).insertOne(myObj,(err) => {
            if(err) throw err;
            console.log('data inserted')
            db.close();
        })
    })

    return outres;
}

// PUt Call
maincall.prototype.putData = (colName,query,myObj) => {
    MongoClient.connect(url,(err,db)=> {
        if(err) throw err;
        var dbo = db.db('testdata')
        dbo.collection(colName).update(query,myObj,(err) => {
            if(err) throw err;
            console.log('data updated')
            db.close();
        })
    })

    return outres;
}

// Delete Call
maincall.prototype.deleteData = (colName,query) => {
    MongoClient.connect(url,(err,db)=> {
        if(err) throw err;
        var dbo = db.db('testdata')
        dbo.collection(colName).deleteOne(query,(err) => {
            if(err) throw err;
            console.log('data deleted')
            db.close();
        })
    })

    return outres;
}

// Get Call
let outres;
maincall.prototype.getData = (colName) => {
    MongoClient.connect(url,(err,db)=> {
        if(err) throw err;
        var dbo = db.db('testdata')
        dbo.collection(colName).find({}).toArray(
            (err,results) => {
                if(err) throw err
                outres = results
            })
    })

    return outres;
}

maincall.prototype.getDataByName = (colName,query) => {
    MongoClient.connect(url,(err,db)=> {
        if(err) throw err;
        var dbo = db.db('testdata')
        dbo.collection(colName).find({query}).toArray(
            (err,results) => {
                if(err) throw err
                outres = results
            })
    })

    return outres;
}

module.exports= maincall;