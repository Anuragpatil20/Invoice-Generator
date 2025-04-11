import React, { useState, useEffect } from "react";

const AddInvoice = () => {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({
    client_id: "",
    items: [{ description: "", quantity: 1, price: 0 }],
    total_amount: 0,
  });

  useEffect(() => {
    fetch("http://localhost:5000/api/clients")
      .then((res) => res.json())
      .then((data) => setClients(data));
  }, []);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...form.items];
    updatedItems[index][field] =
      field === "quantity" || field === "price" ? Number(value) : value;
    const total = updatedItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setForm({ ...form, items: updatedItems, total_amount: total });
  };

  const addItem = () => {
    setForm({
      ...form,
      items: [...form.items, { description: "", quantity: 1, price: 0 }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    alert("Invoice created!");
    setForm({
      client_id: "",
      items: [{ description: "", quantity: 1, price: 0 }],
      total_amount: 0,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl border border-gray-200"
    >
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Create Invoice
      </h2>

      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Select Client
        </label>
        <select
          value={form.client_id}
          onChange={(e) => setForm({ ...form, client_id: e.target.value })}
          className="w-full p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">-- Choose a client --</option>
          {clients.map((client) => (
            <option key={client._id} value={client._id}>
              {client.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        {form.items.map((item, idx) => (
          <div
            key={idx}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center"
          >
            <input
              placeholder="Description"
              value={item.description}
              onChange={(e) =>
                handleItemChange(idx, "description", e.target.value)
              }
              className="p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 w-full"
            />
            <input
              type="number"
              placeholder="Qty"
              value={item.quantity}
              onChange={(e) =>
                handleItemChange(idx, "quantity", e.target.value)
              }
              className="p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 w-full"
            />
            <input
              type="number"
              placeholder="Price"
              value={item.price}
              onChange={(e) =>
                handleItemChange(idx, "price", e.target.value)
              }
              className="p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 w-full"
            />
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={addItem}
        className="mt-4 text-blue-600 font-medium hover:underline transition"
      >
        + Add Item
      </button>

      <div className="mt-6 text-right">
        <p className="text-lg font-semibold">
          Total: <span className="text-green-600">₹{form.total_amount}</span>
        </p>
      </div>

      <button
        type="submit"
        className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl text-lg font-semibold shadow-md transition"
      >
        Save Invoice
      </button>
    </form>
  );
};

export default AddInvoice;
