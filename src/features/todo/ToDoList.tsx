import {useAppSelector} from "../../hooks";
import {List} from "@mui/material";
import ToDoItem from "./ToDoItem";

export default function ToDoList() {
    const list = useAppSelector(state => state.toDo.tasks);

    return <List>
        {list.map(task => {
            return <ToDoItem key={task.id} id={task.id} text={task.text} deleting={task.deleting}/>
        })}
    </List>;

}