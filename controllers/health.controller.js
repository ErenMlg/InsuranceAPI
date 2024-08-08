const Health = require('../models/health.model.js');
const Policy = require('../models/policy.model.js');

const getHealth = async (req, res) => {
    try {
        const health = await Health.find({});
        res.status(200).json(health);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getHealthWithID = async (req, res) => {
    try {
        const id = req.params.id;
        const health = await Health.find({ policyNo: id });
        res.status(200).json(health);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateHealth = async (req, res) => {
    try {
        const policyNo = req.body.policyNo;
        const policy = await Policy.findOne({ policyNo: policyNo });
        if (policy) {
            const health = await Health.findOneAndUpdate({ policyNo: policyNo }, req.body);
            if (!health) {
                return res.status(404).json({ message: "Health not found" });
            } else {
                const updatedHealth = await Health.find({ policyNo: policyNo });
                return res.status(200).json(updatedHealth);
            }
        } else {
            return res.status(404).json({ message: "Wrong Policy No" });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const deleteHealth = async (req, res) => {
    try {
        const id = req.params.id;
        const health = await Health.findOneAndDelete({ policyNo: id }, req.body);
        if (!health) {
            return res.status(404).json({ message: "Health not found" });
        }
        else {
            return res.status(200).json("Health Deleted Successfully");
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const postHealth = async (req, res) => {
    try {
        const policyNo = req.body.policyNo;
        const policy = await Policy.findOne({ policyNo: policyNo });
        if (!policy) {
            return res.status(404).json({ message: "Wrong Policy No" });
        }
        const existHealth = await Health.findOne({ policyNo: policyNo });
        if (existHealth) {
            await Health.updateOne({ policyNo: policyNo }, req.body);
            return res.status(200).json(existHealth);
        }
        const health = await Health.create(req.body);
        res.status(200).json(health);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getHealth,
    getHealthWithID,
    updateHealth,
    deleteHealth,
    postHealth
}