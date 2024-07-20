const Customer = require('../models/customer.model.js');

const getCustomer = async (req, res) => {
    try {
        const customers = await Customer.find({});
        res.status(200).json(customers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateCustomerByNo = async (req, res) => {
    try {
        const customerID = req.params.customerID;
        const customer = await Customer.findOneAndUpdate({ customerID: customerID }, req.body);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        } else {
            const updatedCustomer = await Customer.find({ customerID: customerID });
            return res.status(200).json(updatedCustomer);
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const deleteCustomerByNo = async (req, res) => {
    try {
        const customerID = req.params.customerID;
        const customer = await Customer.findOneAndDelete({ customerID: customerID }, req.body);
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        } else {
            return res.status(200).json("Customer Deleted Successfully");
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const saveCustomer = async (req, res) => {
    try {
        const customer = await Customer.create(req.body);
        res.status(200).json(customer);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getCustomer,
    updateCustomerByNo,
    deleteCustomerByNo,
    saveCustomer
}