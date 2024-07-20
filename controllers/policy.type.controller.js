const PolicyType = require('../models/policy.type.model.js');

const getPolicyTypes = async (req, res) => {
    try {
        const policyTypes = await PolicyType.find();
        res.status(200).send(policyTypes);
    } catch (err) {
        res.status(500).send({message: err.message});
    }
}

module.exports = {
    getPolicyTypes
}