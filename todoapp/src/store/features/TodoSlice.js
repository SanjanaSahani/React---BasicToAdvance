import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    todos: [],
}

const TodoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        addTodo: (state, action) => {
            state.todos.push(action.payload)
        },
        deleteTodo: (state, action) => {
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        },
        updateTodo: (state, action) => {
            const { id, text } = action.payload;
            const todo = state.todos.find((t) => t.id === id);
            if (todo) {
                todo.text = text;
            }
        },
        clearTodo: (state, action) => {
            state.todos = []
        }
    }
})
export default TodoSlice.reducer;
export const { addTodo, deleteTodo, updateTodo, clearTodo } = TodoSlice.actions;