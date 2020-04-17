// const handlePagination = (totalItems) => {

//     return (req, res, next) => {
//         let page = parseInt(req.query.page); //1
//         let limit = parseInt(req.query.limit); //9
//         let firstIndex = (page - 1) * limit; //0
//         let endIndex = (limit * page);//9
//         let slicedItems = totalItems.slice(firstIndex, endIndex);
//         res.paginated = slicedItems;
//         next();
//         //will send back 9 items.
//     }
// }

// module.exports = { handlePagination };