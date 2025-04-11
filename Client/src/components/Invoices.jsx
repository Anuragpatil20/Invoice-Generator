import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileText, ArrowRight } from "lucide-react"; // Optional icons

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/invoices")
      .then((res) => res.json())
      .then((data) => setInvoices(data));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
        📄 All Invoices
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-2 rounded-full" />
      </h2>

      {invoices.length === 0 ? (
        <p className="text-gray-500 text-center">No invoices available.</p>
      ) : (
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {invoices.map((inv) => (
            <li
              key={inv._id}
              className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="text-blue-500 w-5 h-5" />
                  <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-700 transition">
                    {}
                  </h3>
                </div>
                <Link
                  to={`/invoices/${inv._id}`}
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center transition"
                >
                  View <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
              </div>

              <div className="text-sm text-gray-600 space-y-1 pl-1">
                
                <p>
                  <span className="font-medium">Date:</span>{" "}
                  {new Date(inv.date).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">Total:</span> ₹{inv.total_amount}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Invoices;
