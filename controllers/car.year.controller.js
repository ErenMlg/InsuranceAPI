const CarYear = require('../models/car.year.model.js');

const getCarYears = async (req, res) => {
    try {
        const carYears = await CarYear.find();
        res.status(200).send(carYears);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

module.exports = { getCarYears };