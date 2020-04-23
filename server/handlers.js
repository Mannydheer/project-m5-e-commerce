'use strict';

//MONGODB
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://mannyDb:nbjlHmpzLMbDb9zx@cluster0-ucphp.mongodb.net/test?retryWrites=true&w=majority`;

const dbName = 'Ecommerce';
const collection = 'Items'
const collection2 = 'Companies'
const collectionUsers = 'Users'
const collectionCoupons = 'Coupons'

const assert = require('assert')


var ObjectId = require('mongodb').ObjectID;


//

//MONGODB INTEGRATION DONE. 
const handleAllData = async (req, res) => {

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    //connect to db
    client.connect(async (err) => {
        if (err) throw { Error: err, message: "error occured connected to DB" }
        console.log("Connected to DB in handleAllData")
        try {
            const db = client.db(dbName)
            await db.collection(collection)
                .find()
                .toArray()
                .then(data => {
                    res.status(200).send(data)
                })
        }
        catch (error) {
            console.log(error.stack, 'Catch Error in handleAllData')
            res.status(500).json({ status: 500, message: error.message })
        }
        finally {
            console.log('disconnected')
            client.close();
        }
    })
}

//handle clicking on each item
const handleItemId = async (req, res) => {
    let itemId = parseInt(req.params.id);
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    //connect to db
    client.connect(async (err) => {
        if (err) throw { Error: err, message: "error occured connected to DB" }
        console.log("Connected to DB in handleItemId")
        try {
            const db = client.db(dbName)
            await db.collection(collection)
                .findOne({ _id: itemId })
                .then(data => {
                    res.status(200).json(data)
                })
        }
        catch (error) {
            console.log(error.stack, 'Catch Error in handleItemId')
            res.status(500).json({ status: 500, message: error.message })
        }
        finally {
            console.log('disconnected')
            client.close();
        }
    })
}


const handleItemsData = (req, res) => {

    let sort = req.query.sort
    console.log(sort)
    let page = req.query.page; //1
    let limit = req.query.limit; //9

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    //connect to db
    client.connect(async (err) => {
        if (err) throw { Error: err, message: "error occured connected to DB" }
        console.log("Connected to DB in handleItemsData")
        try {
            const db = client.db(dbName)
            await db.collection(collection)
                .find()
                .toArray()
                .then(items => {
                    let sortItems;
                    if (sort === 'lowToHigh') {
                        sortItems = items.slice().sort(function (a, b) {

                            return parseInt(a.price.replace('$', '').replace(',', '')) - parseInt(b.price.replace('$', '').replace(',', ''))
                        });
                    }
                    else if (sort === 'highToLow') {
                        sortItems = items.slice().sort(function (a, b) {
                            return parseInt(b.price.replace('$', '').replace(',', '')) - parseInt(a.price.replace('$', '').replace(',', ''))
                        })
                    } else if (sort === 'bestMatch') {
                        sortItems = items;
                    }

                    let firstIndex = (page - 1) * limit; //0
                    let endIndex = (limit * page);//9
                    let slicedItems = sortItems.slice(firstIndex, endIndex)

                    //will send back 9 items.

                    res.status(200).send(slicedItems)
                })
        }
        catch (error) {
            console.log(error.stack, 'Catch Error in handleItemsData')
            res.status(500).json({ status: 500, message: error.message })
        }
        finally {
            console.log('disconnected')
            client.close();
        }
    })
}

const handleBodyItems = (req, res) => {

    let bodypart = req.params.body;

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    //connect to db
    client.connect(async (err) => {
        if (err) throw { Error: err, message: "error occured connected to DB" }
        console.log("Connected to DB in handleBodyItems")
        try {
            const db = client.db(dbName)
            await db.collection(collection)
                .find({ body_location: bodypart })
                .toArray()
                .then(filteredBodyItems => {
                    console.log(filteredBodyItems)
                    res.status(200).send(filteredBodyItems);
                })
        }
        catch (error) {
            console.log(error.stack, 'Catch Error in handleBodyItems')
            res.status(500).json({ status: 500, message: error.message })
        }
        finally {
            console.log('disconnected')
            client.close();
        }
    })
}



//handle clicking on a category
const handleCategory = async (req, res) => {

    let category = req.params.category;
    let page = req.query.page;
    let limit = req.query.limit;

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    //connect to db
    client.connect(async (err) => {
        if (err) throw { Error: err, message: "error occured connected to DB" }
        console.log("Connected to DB in handleCategory")
        try {
            const db = client.db(dbName)
            await db.collection(collection)
                .find()
                .toArray()
                .then(items => {
                    if (page >= 0) {
                        let matchedCategories = items.filter(item => {
                            if (item.category == category) {
                                return item;
                            }
                        })
                        //if the array is greater than 9 items...
                        if (matchedCategories.length >= 8) {
                            let firstIndex = (page - 1) * limit; //0
                            let endIndex = (limit * page);//9
                            let slicedItems = matchedCategories.slice(firstIndex, endIndex);
                            res.send(slicedItems)
                        }
                        else {
                            res.send(matchedCategories)
                        }
                    }
                })
        }
        catch (error) {
            console.log(error.stack, 'Catch Error in handleCategory')
            res.status(500).json({ status: 500, message: error.message })
        }
        finally {
            console.log('disconnected')
            client.close();
        }
    })
}



const handleRelatedItems = async (req, res) => {

    let category = req.params.category;
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    //connect to db
    client.connect(async (err) => {
        if (err) throw { Error: err, message: "error occured connected to DB" }
        console.log("Connected to DB in handleRelatedItems")
        try {
            const db = client.db(dbName)
            await db.collection(collection)
                .find({ category: category })
                .toArray()
                .then(filteredCategories => {

                    let reducedItems = filteredCategories.filter((item, index) => {
                        if (index < 10) {
                            return item
                        }
                    })
                    res.status(200).json(reducedItems)

                })
        }
        catch (error) {
            console.log(error.stack, 'Catch Error in handleRelatedItems')
            res.status(500).json({ status: 500, message: error.message })
        }
        finally {
            console.log('disconnected')
            client.close();
        }
    })


}





const handleCompany = async (req, res) => {

    //grab company ID
    let companyId = parseInt(req.params.companyId);
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    //connect to db
    client.connect(async (err) => {
        if (err) throw { Error: err, message: "error occured connected to DB" }
        console.log("Connected to DB in handleCompany")
        try {
            const db = client.db(dbName)
            let filteredCompany = await db.collection(collection2).findOne({ _id: companyId })

            let companyItems = await db.collection(collection).find({ companyId: companyId }).toArray()

            Promise.all([filteredCompany, companyItems])
                .then(() => {
                    let company = {
                        info: filteredCompany,
                        items: companyItems
                    }
                    res.status(200).send(company);
                })
        }
        catch (error) {
            console.log(error.stack, 'Catch Error in handleCompany')
            res.status(500).json({ status: 500, message: error.message })
        }
        finally {
            console.log('disconnected')
            client.close();
        }
    })

}


const handleSellers = async (req, res) => {

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    //connect to db
    client.connect(async (err) => {
        if (err) throw { Error: err, message: "error occured connected to DB" }
        console.log("Connected to DB in handleSellers")
        try {
            const db = client.db(dbName)
            //comapnies collection
            await db.collection(collection2)
                .find()
                .toArray()
                .then(companies => {
                    res.status(200).json(companies)
                })
        }
        catch (error) {
            console.log(error.stack, 'Catch Error in handleSellers')
            res.status(500).json({ status: 500, message: error.message })
        }
        finally {
            console.log('disconnected')
            client.close();
        }
    })

}









const handleUpdateStock = async (req, res) => {

    let cartInfo = req.body;
    //beofre connecting - if no items in cart, don't do any updates..
    if (cartInfo.cartCounter === 0) {
        res.status(300).send({ response: "No changes in stock levels" })
    }
    else {
        const client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        let arrayCart = Object.keys(cartInfo);
        //grab all cart ids
        let slicedIds = arrayCart.slice(0, arrayCart.length - 1)
        //connect to db
        client.connect(async (err) => {
            if (err) throw { Error: err, message: "error occured connected to DB" }
            console.log("Connected to DB in handleUpdateStock")
            console.log(slicedIds, 'HERE')
            try {
                const db = client.db(dbName)
                slicedIds.forEach(async (id) => {

                    try {
                        let item = await db.collection(collection)
                            .findOne({ _id: parseInt(id) })
                        //once found 
                        if (!item) {
                            res.status(404).json({ message: "Item Not Found" })
                        }
                        if (item.numInStock - cartInfo[id].quantity >= 0) {

                            console.log(cartInfo[id].quantity)
                            let r = await db.collection(collection)
                                .updateOne({ _id: parseInt(id) }, { $inc: { "numInStock": -cartInfo[id].quantity } })
                            assert(1, r.matchedCount)
                            assert(1, r.modifiedCount)

                            //find it again.
                            await db.collection(collection)
                                .findOne({ _id: parseInt(id) })
                                .then(data => {
                                    cartInfo[id].numInStock = data.numInStock;
                                    res.status(200).send({
                                        response: 'Quantities successfully updated',
                                        updatedCartState: cartInfo
                                    })
                                })
                        }
                        else {
                            res.status(404).json({ message: "Item is out of stock." })
                        }
                    }
                    catch (err) {
                        res.status(400).json({ message: "Error in try/catch inside handleUpdateStock, inside the forEach." })
                    }
                })
            }
            catch (error) {
                console.log(error.stack, 'Catch Error in handleUpdateStock')
                res.status(500).json({ status: 500, message: error.message })
            }
            finally {
                // client.close()
                console.log('disconnected')
            }
        })
    }

}










const handleSignUp = (req, res) => {
    let userInfo = req.body;

    //if any error getting the user. 
    if (!userInfo) {
        res.status(400).send('Unable to Process Sign Up Request - Bad')
    }

    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    //connect to db
    client.connect(async (err) => {
        if (err) throw { Error: err, message: "error occured connected to DB" }
        console.log("Connected to DB in handleSignUp")
        try {
            const db = client.db(dbName)
            //comapnies collection
            let checkForUser = await db.collection(collectionUsers).findOne({ user: userInfo.user })

            if (checkForUser === null) {
                let name = userInfo.user.split('@')[0]
                userInfo.name = name;
                userInfo.CouponCode = Math.floor(Math.random() * (10000 - 9000 + 1) + 9000);
                await db.collection(collectionUsers).insertOne(userInfo)
                res.status(200).send({ name })
            }
            else {
                res.status(401).send({ message: 'User already exists' })
            }

        }
        catch (error) {
            console.log(error.stack, 'Catch Error in handleSellers')
            res.status(500).json({ status: 500, message: error.message })
        }
        finally {
            console.log('disconnected')
            client.close();
        }
    })
}




const handleLogin = (req, res) => {
    let loginInfo = req.body;

    //if no info
    if (!loginInfo) {
        res.status(400).send('Unable to Process Login Request - Bad')

    }
    else if (loginInfo) {

        const client = new MongoClient(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        //connect to db
        client.connect(async (err) => {
            if (err) throw { Error: err, message: "error occured connected to DB" }
            console.log("Connected to DB in handleSignUp")
            try {
                const db = client.db(dbName)
                //comapnies collection
                let checkForUser = await db.collection(collectionUsers).findOne({ user: loginInfo.user })
                if (!checkForUser) {
                    res.status(404).json({ message: "User not found." })
                } else {
                    if (checkForUser.user === loginInfo.user && checkForUser.pass === loginInfo.pass) {
                        let name = checkForUser.user.split('@')[0]
                        let data = checkForUser.cart; //if its empty, it is fine as it wont effect the front end.
                        res.status(200).send({ name, data })
                    }
                    else {
                        res.status(401).json({ message: "Wrong password was entered." })
                    }
                }
            }
            catch (error) {
                console.log(error.stack, 'Catch Error in handleSellers')
                res.status(500).json({ status: 500, message: error.message })
            }
            finally {
                console.log('disconnected')
                client.close();
            }
        })

    }


}









const handleCartItemsForUser = (req, res) => {

    let name = req.params.user; //just the name
    let notYetPurchasedCartItems = req.body; //array of objects


    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    //connect to db
    client.connect(async (err) => {
        if (err) throw { Error: err, message: "error occured connected to DB" }
        console.log("Connected to DB in handleCartItemsForUser")
        try {

            const db = client.db(dbName)
            //comapnies collection
            let checkForUser = await db.collection(collectionUsers).findOne({ name: name })
            if (!checkForUser) {
                res.status(401).send({ success: false });
            }
            else {
                await db.collection(collectionUsers).updateOne({ name: name }, { $set: { cart: notYetPurchasedCartItems } })
                res.status(200).send({ success: true });
            }
        }
        catch (error) {
            console.log(error.stack, 'Catch Error in handleCartItemsForUser')
            res.status(500).json({ status: 500, message: error.message })
        }
        finally {
            console.log('disconnected')
            client.close();
        }
    })

};





const handleSearch = (req, res) => {


    let search = req.query.search.toLowerCase();
    let splitSearch;

    let page = req.query.page; //1
    let limit = req.query.limit; //9
    let sort = req.query.sort;
    let searchedItems = [];


    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    //connect to db
    client.connect(async (err) => {
        if (err) throw { Error: err, message: "error occured connected to DB" }
        console.log("Connected to DB in handleItemsData")
        try {
            const db = client.db(dbName)
            await db.collection(collection)
                .find()
                .toArray()
                .then(items => {
                    let sortItems;

                    if (search.includes(" ")) {
                        splitSearch = search.split(" ")

                        console.log("here is split search", splitSearch)

                        // for each item
                        let searchArray = items.filter(item => {
                            //check if each search term is present in item name if not set allFound to false
                            let allFound = true;
                            splitSearch.forEach(searchTerm => {
                                allFound = (item.name.toLowerCase().includes(searchTerm.toLowerCase())) ? allFound : false
                                console.log("CONDITION: ", (item.name.toLowerCase().includes(searchTerm.toLowerCase)), "SEARCHTERM: ", searchTerm, "ITEM: ", item.name)
                            })
                            return allFound;
                        })

                        console.log(" here is the search Array", searchArray)
                        searchedItems = searchArray

                    } else {
                        searchedItems = items.filter(item => {
                            if (item.name.toLowerCase().includes(search)) {
                                return item;
                            }
                        })
                    }
                    if (sort === 'lowToHigh') {
                        console.log('low to high')
                        sortItems = searchedItems.slice().sort(function (a, b) {

                            return parseInt(a.price.replace('$', '').replace(',', '')) - parseInt(b.price.replace('$', '').replace(',', ''))
                        });
                    }
                    else if (sort === 'highToLow') {
                        console.log('high to low')
                        sortItems = searchedItems.slice().sort(function (a, b) {
                            return parseInt(b.price.replace('$', '').replace(',', '')) - parseInt(a.price.replace('$', '').replace(',', ''))
                        })
                    } else if (sort === 'bestMatch') {
                        console.log("best match last else if", items[0].price)
                        sortItems = searchedItems;
                    }

                    let firstIndex = (page - 1) * limit; //0
                    let endIndex = (limit * page);//9
                    let slicedItems = sortItems.slice(firstIndex, endIndex)

                    //will send back 9 items.
                    res.status(200).json(slicedItems)
                })
        }
        catch (error) {
            console.log(error.stack, 'Catch Error in handleItemsData')
            res.status(500).json({ status: 500, message: error.message })
        }
        finally {
            console.log('disconnected')
            client.close();
        }
    })
}



const handleGetEmails = async (req, res) => {

    const { name } = req.params;

    console.log(name, ' THIS IS THE NAME PF USER')


    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    //connect to db
    client.connect(async (err) => {
        if (err) throw { Error: err, message: "error occured connected to DB" }
        console.log("Connected to DB in handleGetEmails")
        try {
            const db = client.db(dbName)
            //comapnies collection
            let checkForUser = await db.collection(collectionUsers).findOne({ name: name })
            //if user doesnt exist, stop right away.
            let getCoupons = await db.collection(collectionCoupons).find({ applied: false }).limit(5).toArray()


            Promise.all([checkForUser, getCoupons])
                .then(() => {
                    if (!checkForUser) {
                        res.status(404).json({ message: 'That user does not exist.' })
                    } else if (!getCoupons) {
                        res.status(401).json({ CouponCode: getCoupons, message: 'No coupons available.' })
                    } else {
                        res.status(200).json({ CouponCode: getCoupons, message: 'Successful coupons.' })
                    }
                })

        }
        catch (error) {
            console.log(error.stack, 'Catch Error in handleSellers')
            res.status(500).json({ status: 500, message: error.message })
        }
        finally {
            console.log('disconnected')
            client.close();
        }
    })


}



const handleUpdateCoupon = (req, res) => {

    let code = req.params; //array of objects

    console.log(code, 'CODE INSIDE COUPON')


    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    //connect to db
    client.connect(async (err) => {
        if (err) throw { Error: err, message: "error occured connected to DB" }
        console.log("Connected to DB in handleCartItemsForUser")
        try {

            const db = client.db(dbName)
            //comapnies collection
            let r = await db.collection(collectionCoupons).updateOne({ code: parseInt(code.code) }, { $set: { applied: true } })
            assert(1, r.modifiedCount)
            assert(1, r.matchedCount)
            res.status(200).json({ success: true, message: "Coupon has been used." })
        }
        catch (error) {
            console.log(error.stack, 'Catch Error in handleUpdateCoupon')
            res.status(500).json({ status: 500, message: error.message })
        }
        finally {
            console.log('disconnected')
            client.close();
        }
    })

};





module.exports = {
    handleSignUp, handleBodyItems, handleRelatedItems,
    handleAllData, handleCompany, handleItemId, handleCategory,
    handleItemsData, handleSellers, handleLogin, handleCartItemsForUser, handleUpdateStock, handleSearch,
    handleGetEmails, handleUpdateCoupon
};
