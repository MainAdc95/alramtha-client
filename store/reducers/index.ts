import { combineReducers } from "redux";

// reducers
import location from "./location";
import auth from "./auth";
import locale from "./locale";
import news from "./news";
import polls from "./poll";

const rootReducer = combineReducers({
    location,
    auth,
    locale,
    news,
    polls,
});

export type RootReducer = ReturnType<typeof rootReducer>;

export default rootReducer;
