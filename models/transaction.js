const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    origin_amount: { type: Number },
    convertion_date: { type: String },
    clp_amount: { type: Number },
    convertion_amount: { type: Number }

}, { timestamps: true });



module.exports = mongoose.model("Transaction", TransactionSchema);