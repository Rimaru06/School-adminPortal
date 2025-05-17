import React, { useEffect, useState } from "react";
import axios from "axios";

const typeOptions = [
  { label: "General Document", value: "documents" },
  { label: "Mandatory Document", value: "mandatory" },
  { label: "News", value: "news" },
];

const endpoints = {
  documents: "/api/documents",
  mandatory: "/api/mandatory",
  news: "/api/news",
  gallery: "/api/gallery"
};

const DeleteDocx = () => {
  const [selectedType, setSelectedType] = useState("documents");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!selectedType) return;
    setLoading(true);
    setMessage("");
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}${endpoints[selectedType]}`)
      .then((res) => setItems(res.data))
      .catch(() => setMessage("Failed to fetch items."))
      .finally(() => setLoading(false));
  }, [selectedType]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    setDeleteLoading(true);
    setMessage("");
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}${endpoints[selectedType]}/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      setItems((prev) => prev.filter((item) => item._id !== id));
      setMessage("Deleted successfully.");
    } catch {
      setMessage("Failed to delete item.");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="pt-16 flex flex-col items-center min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      <div className="w-full max-w-2xl px-6 py-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-700 px-8 py-6 text-white">
            <h2 className="text-2xl font-bold text-center">Delete Docx</h2>
            <p className="text-center text-white/80 mt-1">
              Select a type and delete any item
            </p>
          </div>
          <div className="p-8">
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Type
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full py-2 px-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                {typeOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
            {message && (
              <div
                className={`mb-4 p-3 ${
                  message.includes("success")
                    ? "bg-green-50 border-l-4 border-green-500 text-green-700"
                    : "bg-red-50 border-l-4 border-red-500 text-red-700"
                } text-sm rounded`}
              >
                {message}
              </div>
            )}
            {loading ? (
              <div>Loading...</div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {items.length === 0 && (
                  <li className="py-4 text-gray-500 text-center">No items found.</li>
                )}
                {items.map((item) => (
                  <li key={item._id} className="py-4 flex justify-between items-center">
                    <div>
                      <div className="font-medium text-gray-800">
                        {item.title || item.name || item.section || item.heading || "Untitled"}
                      </div>
                      {selectedType === "news" && (
                        <div className="text-xs text-gray-500">
                          {item.createdAt &&
                            new Date(item.createdAt).toLocaleDateString("en-US")}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => handleDelete(item._id)}
                      disabled={deleteLoading}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                    >
                      {deleteLoading ? "Deleting..." : "Delete"}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteDocx;