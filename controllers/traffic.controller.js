const Traffic = require('../models/traffic.model.js');
const Policy = require('../models/policy.model.js');

const getCars = async (req, res) => {
    try {
        const traffic = await Traffic.find({});
        res.status(200).json(traffic);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getCarsWithID = async (req, res) => {
    try {
        const id = req.params.id;
        const traffic = await Traffic.find({ carMotorNo: id });
        res.status(200).json(traffic);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateCar = async (req, res) => {
    try {
        const id = req.params.id;
        const policyNo = req.body.policyNo;
        const policy = await Policy.findOne({ policyNo: policyNo });
        if (policy) {
            const traffic = await Traffic.findOneAndUpdate({ carMotor: id }, req.body);
            if (!traffic) {
                return res.status(404).json({ message: "Car not found" });
            } else {
                const updatedTraffic = await Traffic.find({ carMotor: id });
                return res.status(200).json(updatedTraffic);
            }
        } else {
            return res.status(404).json({ message: "Wrong Policy No" });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const deleteCar = async (req, res) => {
    try {
        const id = req.params.id;
        const traffic = await Traffic.findOneAndDelete({ carMotor: id }, req.body);
        if (!traffic) {
            return res.status(404).json({ message: "Car not found" });
        }
        else {
            return res.status(200).json("Car Deleted Successfully");
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const postCar = async (req, res) => {
    try {
        const policyNo = req.body.policyNo;
        const policy = await Policy.findOne({ policyNo: policyNo });
        if (!policy) {
            return res.status(404).json({ message: "Wrong Policy No" });
        }
        const existTraffic = await Traffic.findOne({ policyNo: policyNo });
        if (existTraffic) {
            await Traffic.updateOne({ policyNo: policyNo }, req.body);
            return res.status(200).json(existTraffic);
        }
        const traffic = await Traffic.create(req.body);
        console.log(traffic);
        res.status(200).json(traffic);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getCars,
    getCarsWithID,
    updateCar,
    deleteCar,
    postCar
}