import { createStore } from "redux";
import rootReducer from  "./formReducer";

export default(initialState) => {
    return createStore(rootReducer, initialState);
}