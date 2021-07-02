import { SET_EN_LOCALE, SET_AR_LOCALE } from "../actionTypes";
import { LocaleState, LocaleActionTypes } from "../types/locale";
import cookie from "cookie";

const INITIAL_STATE: LocaleState = null;

const locale = (
    state = INITIAL_STATE,
    action: LocaleActionTypes
): LocaleState => {
    switch (action.type) {
        case SET_EN_LOCALE:
            if (typeof document !== "undefined") {
                document.cookie = cookie.serialize("locale", "en", {
                    expires: new Date("9999, 9, 9"),
                });

                // document.body.dir = "ltr";
            }

            return "en";
        case SET_AR_LOCALE:
            if (typeof document !== "undefined") {
                document.cookie = cookie.serialize("locale", "ar", {
                    expires: new Date("9999, 9, 9"),
                });

                // document.body.dir = "rtl";
            }

            return "ar";
        default:
            if (typeof document !== "undefined") {
                const { locale } = cookie.parse(document.cookie);

                if (locale) {
                    if (locale === "ar") {
                        // document.body.dir = "rtl";
                    }

                    return locale;
                }

                document.cookie = cookie.serialize("locale", "ar", {
                    expires: new Date("9999, 9, 9"),
                });

                // document.body.dir = "rtl";

                return "ar";
            }

            return state;
    }
};

export default locale;
