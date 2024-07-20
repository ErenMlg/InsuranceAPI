
const Policy = require('../models/policy.model.js');
const Customer = require('../models/customer.model.js');

const getPolicy = async (req, res) => {
    try {
        const products = await Policy.find({});
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getPoliciesWithAgent = async (req, res) => {
    try {
        const agentNo = req.params.agentNo;
        const policies = await Policy.find({ policyAgent: agentNo });
        res.status(200).json(policies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getPoliciesWithCustomer = async (req, res) => {
    try {
        const customerNo = req.params.customerNo;
        const policies = await Policy.find({ customerNo: customerNo });
        res.status(200).json(policies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getPolicyWithNo = async (req, res) => {
    try {
        const policyNo = req.params.policyNo;
        const policies = await Policy.find({ policyNo: policyNo });

        res.status(200).json(policies);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updatePolicyByNo = async (req, res) => {
    try {
        const customer = await Customer.findOne({ customerNo: req.params.customerNo });
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        const policyNo = req.params.policyNo;
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
}

const deletePolicyByNo = async (req, res) => {
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
}

const savePolicy = async (req, res) => {
    try {
        const customer = await Customer.findOne({ customerNo: req.body.customerNo });
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }
        const policy = await Policy.create(req.body);
        return res.status(200).json(policy);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getPolicy,
    updatePolicyByNo,
    deletePolicyByNo,
    savePolicy,
    getPolicyWithNo,
    getPoliciesWithAgent,
    getPoliciesWithCustomer
}