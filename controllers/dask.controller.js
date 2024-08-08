const Dask = require('../models/dask.model.js');
const Policy = require('../models/policy.model.js');

const getDask = async (req, res) => {
    try {
        const dask = await Dask.find({});
        res.status(200).json({count: dask.length, data: dask});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const getDaskWithID = async (req, res) => {
    try {
        const id = req.params.id;
        const dask = await Dask.find({ policyNo: id });
        res.status(200).json(dask);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const updateDask = async (req, res) => {
    try {
        const policyNo = req.body.policyNo;
        const policy = await Policy.findOne({ policyNo: policyNo });
        if (policy) {
            const dask = await Dask.findOneAndUpdate({ policyNo: policyNo }, req.body);
            if (!dask) {
                return res.status(404).json({ message: "Dask not found" });
            } else {
                const updateddask = await Dask.find({ policyNo: policyNo });
                return res.status(200).json(updateddask);
            }
        } else {
            return res.status(404).json({ message: "Wrong Policy No" });
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const deleteDask = async (req, res) => {
    try {
        const id = req.params.id;
        const dask = await Dask.findOneAndDelete({ policyNo: id }, req.body);
        if (!dask) {
            return res.status(404).json({ message: "Dask not found" });
        }
        else {
            return res.status(200).json("Dask Deleted Successfully");
        }
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const postDask = async (req, res) => {
    try {
        const policyNo = req.body.policyNo;
        const policy = await Policy.findOne({ policyNo: policyNo });
        if (!policy) {
            return res.status(404).json({ message: "Wrong Policy No" });
        }
        const existDask = await Dask.findOne({ policyNo: policyNo });
        if (existDask) {
            await Dask.updateOne({ policyNo: policyNo }, req.body);
            return res.status(200).json(existDask);
        }
        const dask = await Dask.create(req.body);
        res.status(200).json(dask);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
}

module.exports = {
    getDask,
    getDaskWithID,
    updateDask,
    deleteDask,
    postDask
}