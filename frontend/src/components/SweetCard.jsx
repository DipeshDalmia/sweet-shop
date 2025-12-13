import api from "../api/axios";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const SweetCard = ({ sweet, refresh, onEdit }) => {
  const { role } = useContext(AuthContext);
  const isAdmin = role === "admin";
  const [restockAmount, setRestockAmount] = useState("");

  const purchase = async () => {
    try {
      await api.post(`/sweets/${sweet._id}/purchase`);
      alert("Purchase successful!");
      refresh();
    } catch (err) {
      console.error("Purchase failed", err);
      alert(err.response?.data?.message || "Purchase failed");
    }
  };

  const deleteSweet = async () => {
    if (!window.confirm("Are you sure you want to delete this sweet?")) return;
    try {
      await api.delete(`/sweets/${sweet._id}`);
      alert("Sweet deleted successfully!");
      refresh();
    } catch (err) {
      console.error("Failed to delete sweet", err);
      alert(err.response?.data?.message || "Failed to delete sweet");
    }
  };

  const restockSweet = async () => {
    const amount = Number(restockAmount);
    if (!amount || amount <= 0) {
      alert("Please enter a valid amount");
      return;
    }
    try {
      await api.post(`/sweets/${sweet._id}/restock`, { amount });
      setRestockAmount("");
      alert("Restocked successfully!");
      refresh();
    } catch (err) {
      console.error("Failed to restock sweet", err);
      alert(err.response?.data?.message || "Failed to restock sweet");
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition">
      <h3 className="text-xl font-semibold text-gray-800 mb-1">
        {sweet.name}
      </h3>

      <p className="text-sm text-gray-500 mb-2">
        Category: {sweet.category}
      </p>

      <p className="text-lg font-bold text-purple-600">
        ₹{sweet.price}
      </p>

      <p className="text-sm text-gray-600 mt-1">
        Stock: <span className="font-semibold">{sweet.quantity}</span>
      </p>

      {isAdmin ? (
        <div className="mt-4 space-y-2">
          {/* Edit Button */}
          {onEdit && (
            <button
              onClick={() => onEdit(sweet)}
              className="w-full bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition"
            >
              Edit
            </button>
          )}
          
          {/* Restock Section */}
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Add stock"
              value={restockAmount}
              onChange={(e) => setRestockAmount(e.target.value)}
              min="1"
              className="flex-1 p-2 border rounded text-sm"
            />
            <button
              onClick={restockSweet}
              className="bg-green-500 text-white px-3 py-2 rounded text-sm hover:bg-green-600 transition"
            >
              Restock
            </button>
          </div>

          {/* Delete Button */}
          <button
            onClick={deleteSweet}
            className="w-full bg-red-500 text-white py-2 rounded-lg font-medium hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      ) : (
        <button
          disabled={sweet.quantity === 0}
          onClick={purchase}
          className={`mt-4 w-full py-2 rounded-lg font-medium transition
            ${
              sweet.quantity === 0
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-purple-600 text-white hover:bg-purple-700"
            }`}
        >
          {sweet.quantity === 0 ? "Out of Stock" : "Purchase"}
        </button>
      )}
    </div>
  );
};

export default SweetCard;