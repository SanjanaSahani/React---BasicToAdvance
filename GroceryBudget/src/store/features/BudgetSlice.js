import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    budgets: [],
}

const BudgetSlice = createSlice({
    name: 'budget',
    initialState,
    reducers: {
        addItem: (state, action) => {
            state.budgets.push({ ...action.payload, completed: false });
        },
        toggleComplete: (state, action) => {
            const item = state.budgets.find(b => b.id === action.payload);
            if (item) item.completed = !item.completed;
        },
        deleteItem: (state, action) => {
            state.budgets = state.budgets.filter((budget) => budget.id !== action.payload)
        },
        updateItem: (state, action) => {
            const { id, text } = action.payload;
            const budget = state.budgets.find((t) => t.id === id);
            if (budget) {
                budget.text = text;
            }
        },
        clearItem: (state, action) => {
            state.budgets = []
        }
    }
})
export default BudgetSlice.reducer;
export const { addItem,toggleComplete, deleteItem, updateItem, clearItem } = BudgetSlice.actions;