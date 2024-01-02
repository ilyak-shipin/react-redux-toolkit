import {ListItem} from "@mui/material";

interface ToDoItemProps {
    id: string,
    text: string,
    deleting: boolean
}

export default function ToDoItem({id, text}: ToDoItemProps) {
    return <ListItem key={id}>{text}</ListItem>
}