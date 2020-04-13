const mongoose = require ("mongoose");

const rateSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    code: String,
    fullName: String,
    rate: Number
});

module.exports = mongoose.model("Rate", rateSchema)