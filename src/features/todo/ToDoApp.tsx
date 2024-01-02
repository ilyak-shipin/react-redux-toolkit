import {useAppDispatch, useAppSelector} from "../../hooks";
import {fetchErrorSelector, fetchToDos, stateSelector} from "./todoSlice";
import {useEffect} from "react";
import {Alert, CircularProgress, Typography} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import ToDoList from "./ToDoList";
import NewToDo from "./NewToDo";
import TotalCount from "./TotalCount";

export default function ToDoApp() {
    const dispatch = useAppDispatch();
    const state = useAppSelector(stateSelector);
    const fetchError = useAppSelector(fetchErrorSelector);

    useEffect(() => {
        if (state === "idle") {
            dispatch(fetchToDos());
        }
    }, [dispatch, state]);

    if (state === "idle") {
        return <CircularProgress/>
    } else if (state === "loading") {
        return <CircularProgress/>
    } else if (state === "error") {
        return <Alert severity="error">
            Error loading to do: {fetchError}
        </Alert>
    }

    return <Grid2 container>
        <Grid2 xs={8}>
            <Typography component="h1" variant="h5">
                To Do App
            </Typography>
            <ToDoList/>
            <NewToDo/>
        </Grid2>
        <Grid2 xs={4}>
            <TotalCount/>
        </Grid2>
    </Grid2>
}