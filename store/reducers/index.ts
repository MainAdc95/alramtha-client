import { combineReducers } from "redux";

// reducers
import location from "./location";
import auth from "./auth";
import locale from "./locale";

const rootReducer = combineReducers({
    location,
    auth,
    locale,
});

export type RootReducer = ReturnType<typeof rootReducer>;

export default rootReducer;
