'use strict';
const cors = require('cors');

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
//data file for items
const { handleItemId, handleItemsData,
  handleCategory, handleCompany, handleSellers,
  handleAllData, handleRelatedItems, handleBodyItems,
  handleSignUp, handleLogin, handleCartItemsForUser, handleUpdateStock, handleSearch, handleGetEmails,
  handleUpdateCoupon
} = require('./handlers');


const port = process.env.PORT || 4000;
var app = express()

app.use(cors())

app.use(function (req, res, next) {

  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    'Access-Control-Allow-Methods',
    'OPTIONS, HEAD, GET, PUT, POST, DELETE'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
})
app.use(morgan('tiny'))
app.use(express.static('./server/assets'))
app.use(bodyParser.json())

app.use(express.urlencoded({ extended: false }))
app.use('/', express.static(__dirname + '/'))



//Item Data endpoint
app.get('/items', handleItemsData)
//Each item detail
app.get('/items/:id', handleItemId)
//Category 
app.get('/category/:category', handleCategory)
//Selected Company
app.get('/sellers/:companyId', handleCompany)
//list of sellers
app.get('/sellers', handleSellers)
//all data
app.get('/allItemData', handleAllData)
//  get related items
app.get('/relatedItems/:category', handleRelatedItems)
//
app.get('/bodypart/:body', handleBodyItems)
//post sign up info
app.post('/SignUp', handleSignUp)
//get login credentials
app.post('/Login', handleLogin)
//store cart items.
app.post('/storeCartItemsUser/:user', handleCartItemsForUser)

app.get('/search', handleSearch)

app.get('/bodypart/:body', handleBodyItems)
//
app.post('/updateStock', handleUpdateStock)
//
app.get('/updateCoupon/:code', handleUpdateCoupon)

app.get('/getEmails/:name', handleGetEmails)

// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static('client/build'));
//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
//   })
// }



app.listen(port, function (error) {
  if (error) {
    console.error(error);
  } else {
    console.info(`==> 🌎  Listening on port ${port}.`);
  }
});