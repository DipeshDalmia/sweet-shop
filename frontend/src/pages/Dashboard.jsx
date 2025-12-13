import { useEffect, useState } from "react";
import api from "../api/axios";
import SweetCard from "../components/SweetCard";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Dashboard = () => {
  const { role } = useContext(AuthContext);
  const isAdmin = role === "admin";

  const [sweets, setSweets] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    category: "",
    minPrice: "",
    maxPrice: "",
  });

  // Admin form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [form, setForm] = useState({ name: "", category: "", price: "", quantity: "" });
  const [editingId, setEditingId] = useState(null);

  // Get unique categories from sweets
  const [categories, setCategories] = useState([]);

  const fetchSweets = async () => {
    setLoading(true);
    try {
      const res = await api.get("/sweets/search", {
        params: {
          name: filters.name || undefined,
          category: filters.category || undefined,
          minPrice: filters.minPrice || undefined,
          maxPrice: filters.maxPrice || undefined,
        },
      });
      setSweets(res.data);
      
      // Extract unique categories
      const uniqueCategories = [...new Set(res.data.map(s => s.category))];
      setCategories(uniqueCategories);
    } catch (err) {
      console.error("Failed to fetch sweets", err);
      alert(err.response?.data?.message || "Failed to fetch sweets");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSweets();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  const handleSearch = () => {
    fetchSweets();
  };

  const clearFilters = () => {
    setFilters({
      name: "",
      category: "",
      minPrice: "",
      maxPrice: "",
    });
    setTimeout(() => {
      fetchSweets();
    }, 100);
  };

  // Admin functions
  const addSweet = async () => {
    if (!form.name.trim() || !form.category.trim() || !form.price || !form.quantity) {
      alert("Please fill all fields");
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
      setShowAddForm(false);
      alert("Sweet added successfully!");
      fetchSweets();
    } catch (err) {
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
    setShowAddForm(true);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm({ name: "", category: "", price: "", quantity: "" });
    setShowAddForm(false);
  };

  const updateSweet = async () => {
    if (!form.name.trim() || !form.category.trim() || !form.price || !form.quantity) {
      alert("Please fill all fields");
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
      setShowAddForm(false);
      alert("Sweet updated successfully!");
      fetchSweets();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update sweet");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-purple-600">Available Sweets 🍬</h2>
        {isAdmin && (
          <button
            onClick={() => {
              setShowAddForm(!showAddForm);
              if (showAddForm) cancelEdit();
            }}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
          >
            {showAddForm ? "Cancel" : "Add New Sweet"}
          </button>
        )}
      </div>

      {/* Admin Add/Edit Form - Visible to all but only functional for admins */}
      {isAdmin && showAddForm && (
        <div className="bg-white p-6 rounded-xl shadow-md mb-6">
          <h3 className="text-xl font-semibold mb-4 text-purple-600">
            {editingId ? "Edit Sweet" : "Add New Sweet"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="text"
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <input
              type="number"
              placeholder="Quantity"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={editingId ? updateSweet : addSweet}
              className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition"
            >
              {editingId ? "Update Sweet" : "Add Sweet"}
            </button>
            {editingId && (
              <button
                onClick={cancelEdit}
                className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600 transition"
              >
                Cancel
              </button>
            )}
          </div>
        </div>
      )}

      {/* Advanced Search/Filter Section */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Search & Filter</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Search by name..."
              value={filters.name}
              onChange={(e) => handleFilterChange("name", e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Min Price (₹)
            </label>
            <input
              type="number"
              placeholder="Min price"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange("minPrice", e.target.value)}
              min="0"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Max Price (₹)
            </label>
            <input
              type="number"
              placeholder="Max price"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
              min="0"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleSearch}
            disabled={loading}
            className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? "Searching..." : "Search"}
          </button>
          <button
            onClick={clearFilters}
            className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {loading && (
        <div className="text-center py-8">
          <p className="text-gray-500">Loading sweets...</p>
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sweets.length === 0 ? (
            <p className="text-gray-500 col-span-full text-center py-8">
              No sweets found. Try adjusting your filters.
            </p>
          ) : (
            sweets.map((sweet) => (
              <SweetCard 
                key={sweet._id} 
                sweet={sweet} 
                refresh={fetchSweets}
                onEdit={isAdmin ? startEdit : null}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;