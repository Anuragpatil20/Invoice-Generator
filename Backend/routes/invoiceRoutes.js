const express = require("express");
const router = express.Router();
const Invoice = require("../models/Invoice");
const Client = require("../models/Client");

router.post("/", async (req, res) => {
  try {
    const invoice = await Invoice.create(req.body);
    res.status(201).json(invoice);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  const invoices = await Invoice.find().populate("client_id", "name email phone");
  res.json(invoices);
});

router.get("/:id", async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id).populate("client_id");
    res.json({ ...invoice._doc, client: invoice.client_id });
  } catch (err) {
    res.status(404).json({ error: "Invoice not found" });
  }
});

module.exports = router;
