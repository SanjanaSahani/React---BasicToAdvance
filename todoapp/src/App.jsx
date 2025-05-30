import { useState } from 'react'
import './App.css'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";

import { useDispatch, useSelector } from "react-redux"
import { addTodo, clearTodo, deleteTodo, updateTodo } from './store/features/TodoSlice';


function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);
  const [newTodo, setNewTodo] = useState("")
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);


  const handleAddOrUpdateTodo = () => {
    if (!newTodo.trim()) return;

    if (isEditing) {
      dispatch(updateTodo({ id: editId, text: newTodo }));
      setIsEditing(false);
      setEditId(null);
    } else {
      dispatch(addTodo({
        id: Date.now(),
        text: newTodo
      }));
    }

    setNewTodo("");
  };

  const handleStartEdit = (todo) => {
    setIsEditing(true);
    setNewTodo(todo.text);
    setEditId(todo.id);
  };
  const handleDeleteTodo = () => {
    dispatch(clearTodo())
  }
  return (
    <>
      <h1 className='text-blue-900 font-bold text-center font-serif m-8 text-4xl'>TODO LIST</h1>
      <div className='flex justify-center content-center mt-10 font-serif'>
        <input className='border-2 border-blue-400 p-2 my-4 w-[25%] rounded font-medium rounded-r-none outline-blue-400'
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder='Add Items Here ...' />
        <button className='border-2 border-blue-400 bg-blue-400 text-black p-2 my-4 rounded font-medium rounded-l-none hover:bg-blue-600'
          onClick={handleAddOrUpdateTodo}
        >
          Add Items
        </button>
      </div>

      {todos.map((todo) => (
        <div key={todo.id} className='flex justify-center content-center w-full'>
          <p className='flex justify-center content-center font-serif bg-blue-50 py-2 m-1 rounded font-medium  text-blue-400'>
            {isEditing && editId === todo.id ? (
              <>
                <input
                  className=' text-black px-2 w-[422px] rounded outline-none'
                  type="text"
                  value={newTodo}
                  onChange={(e) => setNewTodo(e.target.value)}
                />
                <span
                  className='text-green-500 py-1  hover:text-green-600 cursor-pointer'
                  onClick={handleAddOrUpdateTodo}
                >
                  <FaCheck />
                </span>
              </>
            ) : (
              <>
                <span className='px-[30%] w-[422px]'>{todo.text}</span>
                <span
                  className='text-green-500 py-1 hover:text-green-600 cursor-pointer'
                  onClick={() => handleStartEdit(todo)}
                >
                  <FaEdit />
                </span>
              </>
            )}
            <span className='text-red-500 px-2 py-1 hover:text-red-600'
              onClick={() => dispatch(deleteTodo(todo.id))}><MdDelete /></span>
          </p>
        </div>
      ))}

      {todos.length > 0 && (
        <div className='flex justify-center content-center'>
          <button className='border-2 border-blue-400 bg-blue-400 text-black py-2 px-4 my-4 rounded font-medium font-serif outline-none hover:bg-blue-600'
            onClick={handleDeleteTodo}  >
            Clear All</button>
        </div>
      )}

    </>
  )
}

export default App
