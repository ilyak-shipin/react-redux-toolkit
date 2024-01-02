import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {RootState} from "../../store";
import {v4 as uuidV4} from 'uuid';
import {RealtimeDBUrl} from "../../config";

interface ToDoTask {
    id: string,
    text: string,
    deleting: boolean
}

// Define a type for the slice state
interface ToDoState {
    state: "idle" | "loading" | "error" | "done"
    tasks: ToDoTask[]
    writing: boolean
    createError?: string
    fetchError?: string
    deleteError?: string
}

// Define the initial state using that type
const initialState: ToDoState = {
    state: "idle",
    tasks: [],
    writing: false,
};

export const createToDo = createAsyncThunk(
    'todo/createToDo',
    // if you type your function argument here
    async (text: string) => {
        const toDoId = uuidV4()

        await fetch(RealtimeDBUrl + toDoId + ".json", {
            method: "PUT",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({text: text})
        })

        return toDoId
    }
)

export const fetchToDos = createAsyncThunk(
    'todo/fetchToDos',
    async (): Promise<ToDoTask[]> => {
        const response = await fetch(RealtimeDBUrl + ".json", {
            method: "GET",
        })

        const objects: Record<string, { text: string }> | null = await response.json();

        if (objects === null) {
            return [];
        }

        return Array.from(Object.keys(objects)).map((key) => {
            return {
                id: key,
                text: objects[key]!.text,
                deleting: false
            }
        });
    }
)

export const deleteToDo = createAsyncThunk(
    'todo/deleteToDo',
    async (taskId: string) => {
        await fetch(RealtimeDBUrl + taskId + ".json", {
            method: "DELETE",
        })
    }
)

function setDeleting(tasks: ToDoTask[], taskId: string, deleting: boolean): ToDoTask[] {
    return tasks.map((task) => {
        if (task.id === taskId) {
            return {...task, deleting};
        } else {
            return task;
        }
    })
}


export const toDoSlice = createSlice({
    name: "todo",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    reducers: {
        dismissCreateError: (state) => {
            return {
                ...state,
                createError: undefined
            }
        },
        dismissDeleteError: (state) => {
            return {
                ...state,
                deleteError: undefined
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createToDo.pending, (state) => {
            return {
                ...state,
                writing: true
            };
        }).addCase(createToDo.fulfilled, (state, action) => {
            return {
                ...state,
                tasks: [
                    ...state.tasks,
                    {id: action.payload, text: action.meta.arg, deleting: false}
                ],
                writing: false
            };
        }).addCase(createToDo.rejected, (state, action) => {
            return {
                ...state,
                writing: false,
                createError: action.error.message
            };
        }).addCase(fetchToDos.pending, (state) => {
            return {
                ...state,
                fetchError: undefined,
                state: "loading"
            }
        }).addCase(fetchToDos.fulfilled, (state, action) => {
            return {
                ...state,
                state: "done",
                tasks: action.payload
            }
        }).addCase(fetchToDos.rejected, (state, action) => {
            return {
                ...state,
                state: "error",
                fetchError: action.error.message
            };
        }).addCase(deleteToDo.pending, (state, action) => {
            return {
                ...state,
                tasks: setDeleting(state.tasks, action.meta.arg, true)
            }
        }).addCase(deleteToDo.fulfilled, (state, action) => {
            return {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== action.meta.arg)
            }
        }).addCase(deleteToDo.rejected, (state, action) => {
            return {
                ...state,
                tasks: setDeleting(state.tasks, action.meta.arg, false),
                deleteError: action.error.message
            }
        })
    },

});

export const {dismissCreateError, dismissDeleteError} = toDoSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const toDoCount = (state: RootState) => state.toDo.tasks.length;

export const isWritingSelector = (state: RootState) => state.toDo.writing;

export const createErrorSelector = (state: RootState) => state.toDo.createError;
export const fetchErrorSelector = (state: RootState) => state.toDo.fetchError;
export const deleteErrorSelector = (state: RootState) => state.toDo.deleteError;

export const stateSelector = (state: RootState) => state.toDo.state;

export default toDoSlice.reducer;
