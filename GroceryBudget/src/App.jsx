import { useState } from 'react';
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux";
import { addItem, deleteItem, updateItem, clearItem, toggleComplete } from './store/features/BudgetSlice';

import toast, { Toaster } from 'react-hot-toast'; // ✅ Toast import

function App() {
  const dispatch = useDispatch();
  const budgets = useSelector((state) => state.budget.budgets);
  const [newItems, setNewItems] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

  const handleAddOrUpdateItems = () => {
    if (!newItems.trim()) return;

    if (isEditing) {
      dispatch(updateItem({ id: editId, text: newItems }));
      setIsEditing(false);
      setEditId(null);
      toast.success("Item Updated!");
    } else {
      dispatch(addItem({
        id: Date.now(),
        text: newItems
      }));
      toast.success("Item Added To The List");
    }

    setNewItems("");
  };

  const handleStartEdit = (budget) => {
    setIsEditing(true);
    setNewItems(budget.text);
    setEditId(budget.id);
  };

  const handleDeleteItems = () => {
    dispatch(clearItem());
    toast("All Items Cleared", { icon: "🗑️" });
  };

  return (
    <>
      {/* ✅ Toast notification container */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-[90%] md:w-[400px]">
          <h2 className="text-center text-3xl font-bold text-blue-800 mb-6 font-serif">Grocery Bud</h2>

          <div className="flex mb-4">
            <input
              className="flex-grow border border-blue-400 p-2 rounded-l outline-blue-400"
              type="text"
              value={newItems}
              onChange={(e) => setNewItems(e.target.value)}
              placeholder='Add Items Here ...'
            />
            <button
              className="bg-cyan-500 text-white px-4 rounded-r hover:bg-cyan-600"
              onClick={handleAddOrUpdateItems}
            >
              {isEditing ? "Update" : "Add Item"}
            </button>
          </div>

          <div className="space-y-2">
            {budgets.map((budget) => (
              <div key={budget.id} className="flex items-center justify-between bg-gray-100 px-4 py-2 rounded">
                {isEditing && editId === budget.id ? (
                  <>
                    <input
                      className="flex-grow border p-1 rounded outline-none"
                      type="text"
                      value={newItems}
                      onChange={(e) => setNewItems(e.target.value)}
                    />
                    <button
                      className="text-green-500 ml-2 hover:text-green-700"
                      onClick={handleAddOrUpdateItems}
                    >
                      <FaCheck />
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-3 flex-grow">
                      <input
                        type="checkbox"
                        checked={budget.completed}
                        onChange={() => dispatch(toggleComplete(budget.id))}
                      />
                      <span className={`${budget.completed ? "line-through text-gray-500" : "text-black"}`}>
                        {budget.text}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="text-green-500 hover:text-green-700"
                        onClick={() => handleStartEdit(budget)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="bg-black text-white px-2 py-1 rounded hover:bg-gray-800"
                        onClick={() => dispatch(deleteItem(budget.id))}
                      >
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>

          {budgets.length > 0 && (
            <button
              className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
              onClick={handleDeleteItems}
            >
              Clear All
            </button>
          )}
        </div>
      </div>
    </>
  );
}

export default App;
