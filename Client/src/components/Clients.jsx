import React, { useEffect, useState } from "react";
import { UserCircle2 } from "lucide-react"; // Optional, install lucide-react or use an emoji

const Clients = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/clients")
      .then((res) => res.json())
      .then((data) => setClients(data));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-10 relative">
        Client List
        <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-2 rounded-full" />
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {clients.map((client) => (
          <div
            key={client._id}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 group"
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <UserCircle2 className="w-8 h-8 text-blue-600" />
                {/* Or use: <span className="text-2xl">👤</span> */}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-700 transition">
                {client.name}
              </h3>
            </div>

            <div className="text-sm text-gray-600 space-y-1 pl-1">
              <p><span className="font-medium">Email:</span> {client.email}</p>
              <p><span className="font-medium">Phone:</span> {client.phone}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Clients;
