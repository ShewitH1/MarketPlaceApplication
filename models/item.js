const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    title: String,
    description: String,
    active: {
    type: Boolean,
    default: true,
    },
    totalOffers: {
    type: Number,
    default: 0,
    },
    highestOffer: {
    type: Number,
    default: 0,
    },
    seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    },
    });

module.exports = mongoose.model("Item", itemSchema);
