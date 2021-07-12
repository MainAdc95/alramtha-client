import { INews } from "../../types/news";
import { NewsActionTypes } from "../types/news";

export const addToCreateNews = (news: INews): NewsActionTypes => ({
    type: "ADD_TO_CREATE_NEWS",
    news,
});

export const removeToCreateNews = (): NewsActionTypes => ({
    type: "REMOVE_TO_CREATE_NEWS",
});
