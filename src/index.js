const express = require('express');
const mongoose = require('mongoose');
const connectdb = require('./db');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const secretKey = 'rasool786';


// Routes -----
const userRoute = require("../src/routes/userroutes");
const Adminroute = require("../src/routes/Adminroute");
const categoryRoutes = require('./routes/categoryroutes');
const productRoutes = require('./routes/productroutes');
const app = express();
const PORT = process.env.PORT || 4002;



//app-----
app.use(express.json()); // This should be sufficient for parsing JSON
// app.use(bodyParser.json()); // You don't need this line if you're using express.json()

app.use("/user", userRoute);
// app.use("/admins",Adminroute)

app.use('/api', categoryRoutes);
app.use('/api', productRoutes);



// app.listen ----
app.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});



// Database Connection-----
connectdb()
    .then(() => {
        console.log('Database is connected...');
    })
    .catch(err => console.log(err));

