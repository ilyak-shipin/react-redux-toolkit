import {Field, Form, Formik} from "formik";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {createErrorSelector, createToDo, dismissCreateError, isWritingSelector} from "./todoSlice";
import {Alert, CircularProgress, Snackbar} from "@mui/material";

export default function NewToDo() {
    const dispatch = useAppDispatch();
    const isWriting = useAppSelector(isWritingSelector);
    const createError = useAppSelector(createErrorSelector);

    if (isWriting) {
        return <CircularProgress/>
    } else {
        return <>
            <Snackbar open={createError !== undefined}
                      message={"Error creating todo:" + createError}
                      onClose={() => {
                          dispatch(dismissCreateError())
                      }}
            >
                <Alert onClose={() => {
                    dispatch(dismissCreateError())
                }} severity="error" sx={{width: '100%'}}>
                    Error creating to do: {createError}
                </Alert>
            </Snackbar>
            <Formik
                initialValues={{text: ""}}
                onSubmit={({text}, {resetForm}) => {
                    if (text) {
                        dispatch(createToDo(text))
                        resetForm();
                    }
                }}
            >

                <Form>
                    <Field name="text" type="text"/>
                    <button type="submit">Submit</button>
                </Form>
            </Formik>
        </>
    }
}