const CarModal = require('../models/car.modal.model.js');

const getCarModals = async (req, res) => {
    try {
        const carModals = await CarModal.find();
        res.status(200).send(carModals);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
}

module.exports = {  getCarModals };