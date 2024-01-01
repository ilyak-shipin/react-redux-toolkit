import {Field, Form, Formik} from "formik";
import {useAppDispatch} from "../../hooks";
import {addToDo} from "./todoSlice";

export default function NewToDo() {
    const dispatch = useAppDispatch();

    return <Formik
        initialValues={{text: ""}}
        onSubmit={({text}, {resetForm}) => {
            if (text) {
                dispatch(addToDo(text))
                resetForm();
            }
        }}
    >
        <Form>
            <Field name="text" type="text"/>
            <button type="submit">Submit</button>
        </Form>
    </Formik>
}