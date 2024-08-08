require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const policyRoute = require('./routes/policy.route.js');
const customerRoute = require('./routes/customer.route.js');
const trafficRoute = require('./routes/traffic.route.js');
const paymentRoute = require('./routes/payment.route.js');
const kaskoRoute = require('./routes/kasko.route.js');
const healthRoute = require('./routes/health.route.js');
const daskRoute = require('./routes/dask.route.js');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/v1/api/policies', policyRoute);
app.use('/v1/api/customers', customerRoute);
app.use('/v1/api/traffic', trafficRoute);
app.use('/v1/api/payments', paymentRoute);
app.use('/v1/api/kasko', kaskoRoute);
app.use('/v1/api/health', healthRoute);
app.use('/v1/api/dask', daskRoute);


mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected!')
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => console.log('Connection Failed!'));