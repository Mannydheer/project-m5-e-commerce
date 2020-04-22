'use strict';

//LOAD ALL ITEMS IN DB

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://mannyDb:nbjlHmpzLMbDb9zx@cluster0-ucphp.mongodb.net/test?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const items = require('./data/items.json');
const assert = require('assert')

const dbName = 'Ecommerce';
const collection = 'Items'

const itemsBatchImports = async (req, res) => {


    //this error is from MongoClient.
    client.connect(async (err) => {

        //if any error with MongoDb Client
        if (err) {
            throw err;
        }
        console.log('connected')
        try {
            const db = client.db(dbName);
            //insert the array of seats made above.
            const r = await db.collection(collection).insertMany(items)
            assert.equal(items.length, r.insertedCount);
            res.status(201).json({ data: items, message: "Successfully inserted all items into DB." })
            console.log('disconnected')
            client.close();
        }
        //more of a javascript error - code in js fails
        catch (err) {
            console.log(err.stack)
            res.status(500).json({ status: 500, data: items, message: err.message })
            console.log('disconnected')
            client.close();
        }

    });
}

itemsBatchImports();


