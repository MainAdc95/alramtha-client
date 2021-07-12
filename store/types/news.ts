import { ADD_TO_CREATE_NEWS, REMOVE_TO_CREATE_NEWS } from "../actionTypes";
import { INews } from "../../types/news";

type AddToCreateNews = {
    type: typeof ADD_TO_CREATE_NEWS;
    news: INews;
};

type RemoveToCreateNews = {
    type: typeof REMOVE_TO_CREATE_NEWS;
};

export type NewsActionTypes = AddToCreateNews | RemoveToCreateNews;

export type NewsState = {
    toCreate: INews | null;
};
