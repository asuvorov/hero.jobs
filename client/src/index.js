import "babel-polyfill";

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"

import "./styles/main.scss";

import App from "./containers/App";
import configureStore from "./utils/configureStore";


/*****************************************************************************/
/*** Initials                                                              ***/
/*****************************************************************************/
const store = configureStore();

/*****************************************************************************/
/*** Component                                                              ***/
/*****************************************************************************/
ReactDOM.render(
    <div className="container">
        <Provider store={ store }>
            <App />
        </Provider>
    </div>,
    document.getElementById("app")
);
