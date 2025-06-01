import {configureStore} from "@reduxjs/toolkit";
import BudgetSlice from "./BudgetSlice";

export const store = configureStore({
    reducer:{
        budget:BudgetSlice,
}
})