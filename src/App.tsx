import {useAppDispatch, useAppSelector} from "./hooks";
import {Button, Typography} from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import TotalCount from "./TotalCount";
import {addToDo, toDoCount} from "./features/todo/todoSlice";
import NewToDo from "./NewToDo";
import ToDoList from "./ToDoList";

export default function App() {
    return (
        <Grid2 container>
            <Grid2 xs={8}>
                <Typography component="h1" variant="h5">
                    To Do App
                </Typography>
                <ToDoList />
                <NewToDo />
            </Grid2>
            <Grid2 xs={4}>
                <TotalCount/>
            </Grid2>
        </Grid2>


    );
}
