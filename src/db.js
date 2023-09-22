const mongoose = require('mongoose');

const dbconnection = "mongodb://0.0.0.0:27017/rasool4"

module.exports = () => {
    return mongoose.connect(dbconnection,
        {useNewUrlParser: true, useUnifiedTopology: true, })
}