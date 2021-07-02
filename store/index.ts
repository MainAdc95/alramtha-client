import { createStore, Store, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";
import { createWrapper } from "next-redux-wrapper";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer, { RootReducer } from "./reducers";

const makeStore = () =>
    createStore(
        rootReducer,
        composeWithDevTools(compose(applyMiddleware(reduxThunk)))
    );

export const wrapper = createWrapper<Store<RootReducer>>(makeStore, {
    debug: true,
});
