






'use strict';

//LOAD ALL ITEMS IN DB

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://mannyDb:nbjlHmpzLMbDb9zx@cluster0-ucphp.mongodb.net/test?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const assert = require('assert')

const dbName = 'Ecommerce';
const collectionCoupons = 'Coupons'

let couponArray = []

for (let count = 0; count < 40; count++) {
    let num = Math.floor(Math.random() * (10000 - 1000 + 1) + 1000)
    let discount = (Math.random() * (0.50 - 0.10 + 0.10) + 0.10).toFixed(2);

    couponArray.push({
        code: num,
        discount: discount,
        applied: false
    })

}
console.log(couponArray)
const couponsBatchImports = async (req, res) => {


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
            const r = await db.collection(collectionCoupons).insertMany(couponArray)
            assert.equal(couponArray.length, r.insertedCount);
            res.status(201).json({ message: "Successfully inserted all coupons into DB." })
            console.log('disconnected')
            client.close();
        }
        //more of a javascript error - code in js fails
        catch (err) {
            console.log(err.stack)
            res.status(500).json({ status: 500, message: err.message })
            console.log('disconnected')
            client.close();
        }

    });
}

couponsBatchImports();
