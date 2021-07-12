import { ADD_TO_CREATE_NEWS, REMOVE_TO_CREATE_NEWS } from "../actionTypes";
import { NewsState, NewsActionTypes } from "../types/news";

const INITIAL_STATE: NewsState = {
    toCreate: null,
};

const news = (state = INITIAL_STATE, action: NewsActionTypes): NewsState => {
    switch (action.type) {
        case ADD_TO_CREATE_NEWS:
            return { ...state, toCreate: action.news };
        case REMOVE_TO_CREATE_NEWS:
            return { ...state, toCreate: null };
        default:
            return state;
    }
};

export default news;
