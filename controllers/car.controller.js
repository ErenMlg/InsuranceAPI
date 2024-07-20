const Car = require('../models/car.model.js');
const Policy = require('../models/policy.model.js');

const getCars = async (req, res) => {
    try {
        const customers = await Customer.find({});
        res.status(200).json(customers);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getCarsWithID = async (req, res) => {
    try {
        const id = req.params.id;
        const cars = await Car.find({ carMotorNo: id });
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
            const car = await Car.findOneAndUpdate({ carMotor: id }, req.body);
            if (!car) {
                return res.status(404).json({ message: "Car not found" });
            } else {
                const updatedCar = await Car.find({ carMotor: id });
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
        const car = await Car.findOneAndDelete({ carMotor: id }, req.body);
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
        } else {
            const car = await Car.create(req.body);
            res.status(200).json(car);
        }
    } catch (err) {
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