const mongoose = require("mongoose");

const invoiceItemSchema = new mongoose.Schema({
  description: String,
  quantity: Number,
  price: Number,
});

const invoiceSchema = new mongoose.Schema({
  client_id: { type: mongoose.Schema.Types.ObjectId, ref: "Client" },
  date: { type: Date, default: Date.now },
  total_amount: Number,
  items: [invoiceItemSchema],
});

module.exports = mongoose.model("Invoice", invoiceSchema);
