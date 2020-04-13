'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
//data file for items
const items = require('./data/items.json');
const { handleItemId, handleItemsData,
  handleCategory, handleCompany, handleSellers,
  handleAllData,
} = require('./handlers');



const PORT = 4000;

/*items.forEach((element, index) => {

    if (index < 20) {
      console.log(" testing for each", element.price)    }

  });*/




var app = express()
app.use(function (req, res, next) {
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

// REST endpoints?
// .get('/bacon', (req, res) => res.status(200).json('🥓'))


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










  .listen(PORT, () => console.info(`Listening on port ${PORT}`));

