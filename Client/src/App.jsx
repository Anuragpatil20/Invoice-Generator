import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Clients from "./components/Clients";
import AddClient from "./components/AddClient";
import Invoices from "./components/Invoices";
import AddInvoice from "./components/AddInvoice";
import InvoiceDetail from "./components/InvoiceDetail";

function App() {
  return (
  
      <div className="min-h-screen bg-gray-50">
        {/* Header / Navbar */}
        <header className="bg-gradient-to-r from-white via-blue-50 to-white shadow-lg sticky top-0 z-50">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center">
    <h1 className="text-3xl font-bold text-gray-800 tracking-tight mb-3 sm:mb-0 hover:scale-105 transition-transform duration-300">
      🚀 Invoice Manager
    </h1>
    <nav className="flex flex-wrap justify-center gap-4 text-base font-medium text-gray-600">
      <Link
        to="/"
        className="px-3 py-1.5 rounded-full hover:bg-blue-100 hover:text-blue-700 transition duration-200"
      >
        Clients
      </Link>
      <Link
        to="/add-client"
        className="px-3 py-1.5 rounded-full hover:bg-blue-100 hover:text-blue-700 transition duration-200"
      >
        Add Client
      </Link>
      <Link
        to="/invoices"
        className="px-3 py-1.5 rounded-full hover:bg-blue-100 hover:text-blue-700 transition duration-200"
      >
        Invoices
      </Link>
      <Link
        to="/add-invoice"
        className="px-3 py-1.5 rounded-full hover:bg-blue-100 hover:text-blue-700 transition duration-200"
      >
        Add Invoice
      </Link>
    </nav>
  </div>
</header>


        {/* Main Content */}
        <main className="max-w-5xl mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Clients />} />
            <Route path="/add-client" element={<AddClient />} />
            <Route path="/invoices" element={<Invoices />} />
            <Route path="/add-invoice" element={<AddInvoice />} />
            <Route path="/invoices/:id" element={<InvoiceDetail />} />
          </Routes>
        </main>
      </div>
   
  );
}

export default App;
