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
        deleteTodo: (state, action) => { },
        updateTodo: (state, action) => { },
        clearTodo: (state, action) => { }
    }
})
export default TodoSlice.reducer;
export const { addTodo, deleteTodo, updateTodo, clearTodo } = TodoSlice.actions;