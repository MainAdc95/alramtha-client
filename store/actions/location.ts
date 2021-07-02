import { LocationActionTypes } from "../types/location";

export const setLocation = (location: any): LocationActionTypes => ({
    type: "SET_LOCATION",
    location,
});
