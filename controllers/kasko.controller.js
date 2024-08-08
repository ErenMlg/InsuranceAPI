const Kasko = require('../models/kasko.model.js');
const Policy = require('../models/policy.model.js');

const getCars = async (req, res) => {
    try {
        const cars = await Kasko.find({});
        res.status(200).json({count: cars.length, data: cars});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getCarsWithID = async (req, res) => {
    try {
        const id = req.params.id;
        const cars = await Kasko.find({ carMotorNo: id });
        res.status(200).json(cars);
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
            const car = await Kasko.findOneAndUpdate({ carMotor: id }, req.body);
            if (!car) {
                return res.status(404).json({ message: "Car not found" });
            } else {
                const updatedCar = await Kasko.find({ carMotor: id });
                return res.status(200).json(updatedCar);
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
        const car = await Kasko.findOneAndDelete({ carMotor: id }, req.body);
        if (!car) {
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
        const existCar = await Kasko.findOne({ policyNo: policyNo });
        if (existCar) {
            await Kasko.updateOne({ policyNo: policyNo }, req.body);
            return res.status(200).json(existCar);
        }
        const car = await Kasko.create(req.body);
        res.status(200).json(car);
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