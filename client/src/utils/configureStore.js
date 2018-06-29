import {
    createStore,
    applyMiddleware,
    combineReducers
} from "redux";
import thunk from "redux-thunk";

import solution from "../reducers/solution";


/*****************************************************************************/
const configureStore = () => {
    const rootReducer = combineReducers({
        solution,
    });

    const store = createStore(
        rootReducer,
        applyMiddleware(thunk)
    );

    store.subscribe(() => {
        console.log(">>> `store.getState()` :", store.getState());
    });

    return store;
}

export default configureStore;
