import {CircularProgress, IconButton, ListItem} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {useAppDispatch} from "../../hooks";
import {deleteToDo} from "./todoSlice";

interface ToDoItemProps {
    id: string,
    text: string,
    deleting: boolean
}

export default function ToDoItem({id, text, deleting}: ToDoItemProps) {
    const dispatch = useAppDispatch();

    return <ListItem key={id} secondaryAction={
        deleting ? <CircularProgress/> : <IconButton edge="end" aria-label="delete" onClick={() => {
            dispatch(deleteToDo(id))
        }}>
            <DeleteIcon/>
        </IconButton>
    }>{text}</ListItem>
}