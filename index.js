require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const policyRoute = require('./routes/policy.route.js');
const customerRoute = require('./routes/customer.route.js');
const carRoute = require('./routes/car.route.js');
const paymentRoute = require('./routes/payment.route.js');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/v1/api/policies', policyRoute);
app.use('/v1/api/customers', customerRoute);
app.use('/v1/api/cars', carRoute);
app.use('/v1/api/payments', paymentRoute);

app.get('/', (req, res) => {
  res.send("Hello From Node API :)")
});


mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected!')
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => console.log('Connection Failed!'));