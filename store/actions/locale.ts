import { LocaleActionTypes } from "../types/locale";

export const setEnLocale = (): LocaleActionTypes => ({
    type: "SET_EN_LOCALE",
});

export const setArLocale = (): LocaleActionTypes => ({
    type: "SET_AR_LOCALE",
});
