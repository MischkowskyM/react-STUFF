import { createStore } from "redux";
import rootReducer from  "./formReducer";

export default(initialState) => {
    return createStore(rootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}