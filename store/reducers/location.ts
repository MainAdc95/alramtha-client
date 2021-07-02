import { SET_LOCATION } from "../actionTypes";
import { LocationState, LocationActionTypes } from "../types/location";

const INITIAL_STATE: LocationState = null;

const location = (
    state = INITIAL_STATE,
    action: LocationActionTypes
): LocationState => {
    switch (action.type) {
        case SET_LOCATION:
            return action.location;
        default:
            return state;
    }
};

export default location;
