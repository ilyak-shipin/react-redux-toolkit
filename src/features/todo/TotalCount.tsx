import {useAppSelector} from "../../hooks";
import {Typography} from "@mui/material";
import {toDoCount} from "./todoSlice";

export default function TotalCount() {
    const count = useAppSelector(toDoCount);

    return <Typography component="h2" variant="h6">
        Current count {count}
    </Typography>;

}