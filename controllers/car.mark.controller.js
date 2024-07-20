const CarMark = require('../models/car.mark.model.js');

const getCarMarks = async (req, res) => {
    try {
        const carMarks = await CarMark.find();
        res.status(200).send(carMarks);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

module.exports = { getCarMarks };