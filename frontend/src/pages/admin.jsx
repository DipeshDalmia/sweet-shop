import { useState, useEffect } from "react";
import api from "../api/axios";

const Admin = () => {
  const [sweets, setSweets] = useState([]);
  const [form, setForm] = useState({ name: "", category: "", price: "", quantity: "" });
  const [editingId, setEditingId] = useState(null);
  const [restockForm, setRestockForm] = useState({});

  const fetchSweets = async () => {
    try {
      const res = await api.get("/sweets");
      setSweets(res.data);
    } catch (err) {
      console.error("Failed to fetch sweets", err);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const addSweet = async () => {
    // Validation
    if (!form.name.trim()) {
      alert("Please enter a sweet name");
      return;
    }
    if (!form.category.trim()) {
      alert("Please enter a category");
      return;
    }
    if (!form.price || Number(form.price) <= 0) {
      alert("Please enter a valid price");
      return;
    }
    if (!form.quantity || Number(form.quantity) < 0) {
      alert("Please enter a valid quantity");
      return;
    }

    try {
      await api.post("/sweets", {
        name: form.name.trim(),
        category: form.category.trim(),
        price: Number(form.price),
        quantity: Number(form.quantity),
      });
      setForm({ name: "", category: "", price: "", quantity: "" });
      alert("Sweet added successfully!");
      fetchSweets();
    } catch (err) {
      console.error("Failed to add sweet", err);
      alert(err.response?.data?.message || "Failed to add sweet");
    }
  };

  const startEdit = (sweet) => {
    setEditingId(sweet._id);
    setForm({
      name: sweet.name,
      category: sweet.category,
      price: sweet.price.toString(),
      quantity: sweet.quantity.toString(),
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ name: "", category: "", price: "", quantity: "" });
  };

  const updateSweet = async () => {
    // Validation
    if (!form.name.trim()) {
      alert("Please enter a sweet name");
      return;
    }
    if (!form.category.trim()) {
      alert("Please enter a category");
      return;
    }
    if (!form.price || Number(form.price) <= 0) {
      alert("Please enter a valid price");
      return;
    }
    if (!form.quantity || Number(form.quantity) < 0) {
      alert("Please enter a valid quantity");
      return;
    }

    try {
      await api.put(`/sweets/${editingId}`, {
        name: form.name.trim(),
        category: form.category.trim(),
        price: Number(form.price),
        quantity: Number(form.quantity),
      });
      setEditingId(null);
      setForm({ name: "", category: "", price: "", quantity: "" });
      alert("Sweet updated successfully!");
      fetchSweets();
    } catch (err) {
      console.error("Failed to update sweet", err);
      alert(err.response?.data?.message || "Failed to update sweet");
    }
  };

  const deleteSweet = async (id) => {
    if (!window.confirm("Are you sure you want to delete this sweet?")) return;
    try {
      await api.delete(`/sweets/${id}`);
      fetchSweets();
    } catch (err) {
      console.error("Failed to delete sweet", err);
      alert(err.response?.data?.message || "Failed to delete sweet");
    }
  };

  const restockSweet = async (id) => {
    const amount = Number(restockForm[id] || 0);
    if (amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    try {
      await api.post(`/sweets/${id}/restock`, { amount });
      setRestockForm({ ...restockForm, [id]: "" });
      fetchSweets();
    } catch (err) {
      console.error("Failed to restock sweet", err);
      alert(err.response?.data?.message || "Failed to restock sweet");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold mb-6 text-purple-600">Admin Panel 🍭</h2>

      {/* Add/Edit Sweet Form */}
      <div className="bg-white p-6 rounded-xl shadow-md max-w-md mb-8">
        <h3 className="text-xl font-semibold mb-4">
          {editingId ? "Edit Sweet" : "Add New Sweet"}
        </h3>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="text"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="number"
            placeholder="Price"
            value={form.price}
            onChange={(e) => setForm({ ...form, price: e.target.value })}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input
            type="number"
            placeholder="Quantity"
            value={form.quantity}
            onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <div className="flex gap-2">
            <button
              onClick={editingId ? updateSweet : addSweet}
              className="flex-1 bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition"
            >
              {editingId ? "Update Sweet" : "Add Sweet"}
            </button>
            {editingId && (
              <button
                onClick={cancelEdit}
                className="flex-1 bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Sweet List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sweets.length === 0 ? (
          <p className="col-span-full text-gray-500 text-center">No sweets added yet.</p>
        ) : (
          sweets.map((s) => (
            <div
              key={s._id}
              className="bg-white p-4 rounded-xl shadow-md flex flex-col justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{s.name}</h3>
                <p className="text-sm text-gray-500">Category: {s.category}</p>
                <p className="text-purple-600 font-bold">₹{s.price}</p>
                <p className="text-gray-600 text-sm">Stock: {s.quantity}</p>
              </div>
              
              {/* Restock Input */}
              <div className="mt-3 flex gap-2">
                <input
                  type="number"
                  placeholder="Add stock"
                  value={restockForm[s._id] || ""}
                  onChange={(e) =>
                    setRestockForm({ ...restockForm, [s._id]: e.target.value })
                  }
                  className="flex-1 p-1 border rounded text-sm"
                />
                <button
                  onClick={() => restockSweet(s._id)}
                  className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition"
                >
                  Restock
                </button>
              </div>

              {/* Action Buttons */}
              <div className="mt-3 flex gap-2">
                <button
                  onClick={() => startEdit(s)}
                  className="flex-1 bg-blue-500 text-white py-1 rounded hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteSweet(s._id)}
                  className="flex-1 bg-red-500 text-white py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Admin;