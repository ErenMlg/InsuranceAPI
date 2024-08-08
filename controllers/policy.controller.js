
const Policy = require('../models/policy.model.js');
const Customer = require('../models/customer.model.js');

const getPolicy = async (req, res) => {
    try {
        const products = await Policy.find({});
        res.status(200).json( {count: products.length, data: products} );
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
        console.log(req.body.policyPrim);
        const policyNo = await generateUniqueId();
        req.body.policyNo = policyNo;
        const customer = await Customer.findOne({ customerID: req.body.customerNo });
        if (!customer) {
            return res.status(404).json({ message: "Customer not found" });
        }

        const existingPolicy = await Policy.findOne({
            customerNo: req.body.customerNo,
            policyTypeCode: req.body.policyTypeCode,
            $or : [ 
                {
                    policyStatus : "P",
                    policyEndDate: { $gte: req.body.policyEnterDate }
                },
                {
                    policyStatus : "T",
                    policyEnterDate: { $lte: req.body.policyEnterDate }
                }
            ],
        });
        
        if (existingPolicy) {
            req.body.policyNo = existingPolicy.policyNo;
            if (existingPolicy.policyStatus === "T") {
                await Policy.updateOne({ policyNo: req.body.policyNo }, req.body);
                console.log("Policy updated");
                const x = await Policy.findOne({ policyNo: req.body.policyNo });
                return res.status(200).json(x);
            } else {
                return res.status(409).json({ 
                    message: "Customer already has a policy with an active entry date within the specified period"
                 });
            }
        }

        const policy = await Policy.create(req.body);
        return res.status(200).json(policy);
    } catch (err) {
        if (err.code == 11000) {
            res.status(409).json({ message: err.message });
        } else {
            res.status(500).json({ message: err.message });
        }
    }
}

const generateUniqueId = async function () {
    let id;
    let exists = true;
  
    while (exists) {
      id = Math.floor(10000000 + Math.random() * 90000000).toString();
      exists = await Policy.findOne({ policyNo: id });
    }
  
    return id;
  };

module.exports = {
    getPolicy,
    updatePolicyByNo,
    deletePolicyByNo,
    savePolicy,
    getPolicyWithNo,
    getPoliciesWithAgent,
    getPoliciesWithCustomer
}