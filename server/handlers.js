

//THIS IS A COPY!!!
const items = require('./data/items.json');
const companies = require('./data/companies.json');
const users = require('./data/users.json');

const handleAllData = (req, res) => {

    //happens when app render
    res.status(200).send(items)


}

//handle clicking on a category
const handleCategory = (req, res) => {
    let category = req.params.category;
    let page = req.query.page;
    let limit = req.query.limit;
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

}
//handle clicking on each item
const handleItemId = (req, res) => {
    let itemId = req.params.id;
    //if we received an itemId
    //filter through data
    let filteredItem = items.find(item => {
        if (itemId == item.id) {
            return item
        }
    })
    res.send(filteredItem)


}



const handleItemsData = (req, res) => {
    //caterogy, name, price, image, companyID
    let sort = req.query.sort
    console.log(sort)
    let page = req.query.page; //1
    let limit = req.query.limit; //9

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
    res.send(slicedItems)
}


const handleCompany = (req, res) => {
    //grab company ID
    let companyId = req.params.companyId;
    //find associated company and return to the front end.
    let filteredCompany = companies.find(company => {
        if (company.id == companyId) {
            return (company)
        }
    })

    let companyItems = items.filter(item => {
        if (item.companyId == companyId) {
            return item;
        }
    })
    //comment
    let company = {
        info: filteredCompany,
        items: companyItems
    }
    res.status(200).send(company);
}

const handleSellers = (req, res) => {

    res.send(companies);
}
const handleUpdateStock = (req, res) => {
    let cartInfo = req.body;

    if (cartInfo.cartCounter === 0) {
        //change for a different status
        res.status(300).send({ response: "No changes in stock levels" })
    }
    else {
        let arrayCart = Object.keys(cartInfo);
        console.log(arrayCart)
        let slicedIds = arrayCart.slice(0, arrayCart.length - 1)
        //loop though items array and change values. 
        slicedIds.forEach(id => {
            //find the corresponding item in the item array. 
            let selectedItem = items.find(item => {
                if (item.id == id) {
                    return item
                }
            })
            console.log(selectedItem.numInStock, 'BEFORE')
            console.log(cartInfo[id].quantity, 'QUANTITY')
            //once found... update sotck levels. Only if there are still in stock
            if (selectedItem.numInStock > 0) {
                //for backend update
                selectedItem.numInStock -= cartInfo[id].quantity;
                //for front end update of cartstate
                //initialize it to the backends stock lvl
                cartInfo[id].numInStock = selectedItem.numInStock;

                console.log(selectedItem.numInStock, 'AFTER')
            }
            // else {
            //     res.status(404).send({
            //         response: "No stock left.",
            //         Item: selectedItem
            //     })
            // }
        })
        res.status(200).send({
            response: 'Quantities successfully updated',
            updatedCartState: cartInfo
        })


    }
}


const handleBodyItems = (req, res) => {
    let bodypart = req.params.body;

    let filteredBodyItems = items.filter(item => {
        if (item.body_location == bodypart) {
            return item;
        }
    })

    res.status(200).send(filteredBodyItems);

}

const handleSignUp = (req, res) => {
    let userInfo = req.body;

    //if any error getting the user. 
    if (!userInfo) {
        res.status(400).send('Unable to Process Sign Up Request - Bad')
    }
    else {
        let existingUser = users.find(user => {
            if (user.user == userInfo.user) {
                console.log('inside')
                return ('That user already exists!')
            }
        })
        //change this
        //if undefined then there is no user and can proceed with sign up
        if (existingUser == undefined) {
            users.push(userInfo)
            let name = userInfo.user.split('@')[0]
            res.status(200).send({ name })
        }
        else {
            res.status(401).send({ message: 'User already exists' })
        }
    }
}

const handleLogin = (req, res) => {

    let loginInfo = req.body;
    console.log(loginInfo, 'THIS IS LOGIN INFO')


    if (!loginInfo) {
        res.status(400).send('Unable to Process Login Request - Bad')
    }
    //meaning there is something in the array of users 
    else if (loginInfo) {
        let getUserInfo = users.find(user => {
            if (user.user === loginInfo.user && user.pass === loginInfo.pass) {
                return (user)
            }
        })
        //if user was found
        if (getUserInfo !== undefined) {
            //send only the Profile Name
            let name = getUserInfo.user.split('@')[0]
            let data = getUserInfo.cart;
            console.log(data, 'this is data')

            res.status(200).send({ name, data })
        } else {
            res.status(404).send('User Not Found')
        }
    }
    //can remove
    else {
        res.status(401).send('Error occured Authenticating')
    }
}

const handleCartItemsForUser = (req, res) => {
    let name = req.params.user; //just the name
    let notYetPurchasedCartItems = req.body; //array of objects

    console.log(req.body)
    //first thing is find the user.
    console.log(name, 'THIS IS NAME');
    let userInfo = users.find((user) => {
        if (name == user.user.split('@')[0]) {
            return user;
        }
    });
    //user was found
    if (userInfo !== undefined) {
        userInfo.cart = notYetPurchasedCartItems;
        res.status(200).send({ success: true });
    }
    else {
        res.status(401).send({ success: false });
    }
    // res.status(200);
};

const handleRelatedItems = (req, res) => {
    let category = req.params.category;
    let filteredCategories = items.filter((item, index) => {
        if (category == item.category) {
            return item
        }
    })
    let reducedItems = filteredCategories.filter((item, index) => {
        if (index < 10) {
            return item
        }
    })
    res.status(200).send(reducedItems)
}




const handleSearch = (req, res) => {
    let search = req.query.search.toLowerCase();
    let splitSearch;

    let page = req.query.page; //1
    let limit = req.query.limit; //9
    console.log(limit)
    let sort = req.query.sort;
    let searchedItems = [];


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
            // if (allFound) {
            //     console.log("ALLFOUND: ", allFound, "ITEM: ", item)
            //     return item;
            // }
        })

        console.log(" here is the search Array", searchArray)

        searchedItems = searchArray

    } else {

        searchedItems = items.filter(item => {
            if (item.name.toLowerCase().includes(search)) {
                return item;
            }

        })

        console.log("the sort here is", sort)
    }

    /* const searchingQuery = () => { 
      if (item.name.toLowerCase().includes(search)) {
              return item;
          }
      }
           */


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
    res.send(slicedItems)


}


module.exports = {
    handleSignUp, handleBodyItems, handleRelatedItems,
    handleAllData, handleCompany, handleItemId, handleCategory,
    handleItemsData, handleSellers, handleLogin, handleCartItemsForUser, handleUpdateStock, handleSearch
};
