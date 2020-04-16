const mongoose = require ("mongoose");

const rateSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    code: {type: String, required: true},
    fullName: {type: String, required: true},
    rate: {type: Number, required: true},
});

module.exports = mongoose.model("Rate", rateSchema)