import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const InvoiceDetail = () => {
  const { id } = useParams();
  const [invoice, setInvoice] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/invoices/${id}`)
      .then((res) => res.json())
      .then((data) => setInvoice(data));
  }, [id]);

  if (!invoice)
    return (
      <div className="text-center text-gray-500 py-20 text-xl">
        Loading invoice...
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-8 mt-10 border border-gray-200">
      {/* Header */}
      <h2 className="text-4xl font-extrabold text-blue-700 mb-6 text-center">
        Invoice Details
      </h2>

      {/* Client Info */}
      <div className="mb-8 bg-gray-50 p-6 rounded-lg border">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">
          Client Information
        </h3>
        <div className="space-y-2 text-gray-700">
          <p><span className="font-medium">Name:</span> {invoice.client.name}</p>
          <p><span className="font-medium">Email:</span> {invoice.client.email}</p>
          <p><span className="font-medium">Phone:</span> {invoice.client.phone}</p>
          <p><span className="font-medium">Date:</span> {new Date(invoice.date).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Items */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Invoice Items</h3>
        <div className="overflow-hidden border rounded-lg shadow-sm">
          <table className="w-full table-auto bg-white">
            <thead className="bg-blue-100 text-gray-700">
              <tr>
                <th className="text-left px-4 py-2">Description</th>
                <th className="text-center px-4 py-2">Quantity</th>
                <th className="text-right px-4 py-2">Price (₹)</th>
                <th className="text-right px-4 py-2">Total (₹)</th>
              </tr>
            </thead>
            <tbody className="text-gray-800">
              {invoice.items.map((item, idx) => (
                <tr key={idx} className="border-t">
                  <td className="px-4 py-2">{item.description}</td>
                  <td className="text-center px-4 py-2">{item.quantity}</td>
                  <td className="text-right px-4 py-2">{item.price}</td>
                  <td className="text-right px-4 py-2">
                    {item.price * item.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Total */}
      <div className="text-right mt-6">
        <p className="text-2xl font-bold text-green-700">
          Grand Total: ₹{invoice.total_amount}
        </p>
      </div>
    </div>
  );
};

export default InvoiceDetail;
