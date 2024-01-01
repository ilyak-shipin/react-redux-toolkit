import {useAppSelector} from "./hooks";
import {List, ListItem} from "@mui/material";

export default function ToDoList() {
    const list = useAppSelector(state => state.toDo.tasks);

    return <List>
        {list.map(task => <ListItem key={task.id}>{task.text}</ListItem>)}
    </List>
}