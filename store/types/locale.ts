import { SET_EN_LOCALE, SET_AR_LOCALE } from "../actionTypes";

type SetEnLocale = {
    type: typeof SET_EN_LOCALE;
};

type SetArLocale = {
    type: typeof SET_AR_LOCALE;
};

export type LocaleActionTypes = SetEnLocale | SetArLocale;

export type LocaleState = "ar" | "en";
