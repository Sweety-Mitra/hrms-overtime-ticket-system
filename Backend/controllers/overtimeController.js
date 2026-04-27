import Overtime from "../models/Overtime.js";
import DataPegawai from "../models/DataPegawaiModel.js";

export const createOvertime = async (req, res) => {
    try {
        const { workerId, date, hours, reason } = req.body;

        if (!workerId || !date || !hours || !reason) {
            return res.status(400).json({ msg: "All fields required" });
        }

        if (hours < 1 || hours > 6) {
            return res.status(400).json({ msg: "Hours must be 1-6" });
        }

        const today = new Date();
        const inputDate = new Date(date);

        if (inputDate > today) {
            return res.status(400).json({ msg: "Future date not allowed" });
        }

        const diffDays = (today - inputDate) / (1000 * 60 * 60 * 24);
        if (diffDays > 7) {
            return res.status(400).json({ msg: "Max 7 days old allowed" });
        }

        if (reason.length < 10) {
            return res.status(400).json({ msg: "Reason too short" });
        }

        const worker = await DataPegawai.findOne({
            where: { id: workerId }
        });

        if (!worker) {
            return res.status(404).json({ msg: "Worker not found" });
        }

        const existing = await Overtime.findOne({
            where: { workerId, date }
        });
        if (existing) {
            return res.status(400).json({ msg: "Duplicate entry" });
        }

        const startMonth = new Date(inputDate.getFullYear(), inputDate.getMonth(), 1);
        const endMonth = new Date(inputDate.getFullYear(), inputDate.getMonth() + 1, 0);

        const records = await Overtime.find({
            workerId,
            date: { $gte: startMonth, $lte: endMonth },
        });

        const total = records.reduce((sum, r) => sum + r.hours, 0);

        if (total + hours > 60) {
            return res.status(400).json({ msg: "Monthly limit exceeded" });
        }

        const overtime = new Overtime({ workerId, date, hours, reason });
        await overtime.save();

        res.status(201).json({ msg: "Overtime added", overtime });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
};