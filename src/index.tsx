import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {store} from "./store";
import {Provider} from "react-redux";
import {createTheme} from "@mui/material";
import {ThemeProvider} from "@emotion/react";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

const defaultTheme = createTheme();

root.render(
    <React.StrictMode>
        <ThemeProvider theme={defaultTheme}>
            <Provider store={store}>
                <App/>
            </Provider>
        </ThemeProvider>
    </React.StrictMode>
);
