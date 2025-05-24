import { useState } from 'react'
import './App.css'
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux"
import { addTodo } from './store/features/TodoSlice';


function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todo.todos);
  const [newTodo, setNewTodo] = useState("")
  console.log(newTodo);
  console.log(todos);

  const handleAddTodo = () => {
    if (newTodo) {
      dispatch(addTodo({
        id: Date.now(),
        text: newTodo
      }))
      setNewTodo("")
    }
  }

  const handleDeleteTodo = () => {

  }
  return (
    <>
      <h1 className='text-blue-900 font-bold text-center font-serif m-8 text-4xl'>TODO APP</h1>
      <div className='flex justify-center content-center mt-10 font-serif'>
        <input className='border-2 border-blue-400 p-2 my-4 w-[25%] rounded font-medium rounded-r-none outline-blue-400'
          type="text"
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder='Add Items Here ...' />
        <button className='border-2 border-blue-400 bg-blue-400 text-black p-2 my-4 rounded font-medium rounded-l-none hover:bg-blue-600'
          onClick={handleAddTodo}  >
          Add Item</button>
      </div>

      {todos.map((todo) => (
        <div key={todo.id} className='flex justify-center content-center w-full'>
          <p className='flex justify-center content-center font-serif bg-blue-50 py-2 m-1 rounded font-medium  text-blue-400'>
            <span className='px-[30%] w-[422px]'>{todo.text}</span>
            <span className='text-green-500 py-1 hover:text-green-600'><FaEdit /></span>
            <span className='text-red-500 px-2 py-1 hover:text-red-600'><MdDelete /></span>
          </p>
        </div>
      ))}

      <div className='flex justify-center content-center'>
        <button className='border-2 border-blue-400 bg-blue-400 text-black py-2 px-4 my-4 rounded font-medium font-serif outline-none hover:bg-blue-600'
          onClick={handleDeleteTodo}  >
          Clear</button>
      </div>

    </>
  )
}

export default App
