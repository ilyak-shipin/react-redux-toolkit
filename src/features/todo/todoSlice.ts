import type {PayloadAction} from "@reduxjs/toolkit";
import {createSlice} from "@reduxjs/toolkit";
import type {RootState} from "../../store";
import {v4 as uuidV4} from 'uuid';

interface ToDoTask {
    id: string,
    text: string
}

// Define a type for the slice state
interface ToDoState {
    tasks: ToDoTask[];
}

// Define the initial state using that type
const initialState: ToDoState = {
    tasks: [],
};

export const toDoSlice = createSlice({
    name: "todo",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {

        // Use the PayloadAction type to declare the contents of `action.payload`
        addToDo: (state, action: PayloadAction<string>) => {
            state.tasks = [
                ...state.tasks,
                {
                    id: uuidV4(),
                    text: action.payload
                }
            ];
        },
    },
});

export const {addToDo} = toDoSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const toDoCount = (state: RootState) => state.toDo.tasks.length;

export default toDoSlice.reducer;
