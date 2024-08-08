const Customer = require('../models/customer.model.js');

const getCustomer = async (req, res) => {
    try {
        const customers = await Customer.find({});
        res.status(200).json({ count: customers.length, data: customers });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getCustomerByIDByName = async (req, res) => {
    try {
        const { key, customerID } = req.params;
        console.log('Received params:', { key, customerID });
        let query = {
            $or: []
        };

        if (customerID) {
            query.$or.push({ customerID: { $regex: customerID, $options: 'i' } });
        }

        if (!customerID) {
            query.$or.push({ customerID: { $regex: key, $options: 'i' } });
        }
        
        if (key) {
            query.$or.push({customerName: { $regex: key, $options: 'i' }});
            query.$or.push({ customerSurname: { $regex: key, $options: 'i' }});           
        }

        if (!customerID && !key) {
            query = {};
        }

        console.log('Constructed query:', query);

        const customers = await Customer.find(query);
        res.status(200).json({ count: customers.length, data: customers });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


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
        if (err.code == 11000) {
            res.status(409).json({ message: "This customer is already added" });
        } else {
            res.status(500).json({ message: err.message });
        }
    }
}

module.exports = {
    getCustomer,
    updateCustomerByNo,
    deleteCustomerByNo,
    saveCustomer,
    getCustomerByIDByName
}