const express = require('express');
const mongoose = require('mongoose');
const env = require('dotenv').config();
const Policy = require('./models/policy.model.js');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
  res.send("Hello From Node API :)")
});

app.get('/api/policy', async (req, res) => {
  try {
    const products = await Policy.find({});
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.get('/api/policy/:policyNo', async (req, res) => {
  try {
    const { policyNo } = req.params;
    const policies = await Policy.find({ policyNo: policyNo });

    res.status(200).json(policies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


app.put('/api/policy/:policyNo', async (req, res) => {
  try {
    const { policyNo } = req.params;
    const policy = await Policy.findOneAndUpdate({ policyNo: policyNo }, req.body);
    if (!policy) {
      return res.status(404).json({ message: "Policy not found" });
    } else {
      const updatedPolicy = await Policy.find({ policyNo: policyNo });
      return res.status(200).json(updatedPolicy);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.delete('/api/policy/:policyNo', async (req, res) => {
  try {
    const { policyNo } = req.params;
    const policy = await Policy.findOneAndDelete({ policyNo: policyNo }, req.body);
    if (!policy) {
      return res.status(404).json({ message: "Policy not found" });
    } else {
      return res.status(200).json("Policy Deleted Successfully");
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.post('/api/policy', async (req, res) => {
  try {
    const policy = await Policy.create(req.body);
    res.status(200).json(policy);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected!')
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => console.log('Connection Failed!'));