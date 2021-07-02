import { ILocation } from "../../types/location";
import { SET_LOCATION } from "../actionTypes";

type SetLocation = {
    type: typeof SET_LOCATION;
    location: ILocation;
};

export type LocationActionTypes = SetLocation;

export type LocationState = ILocation | null;
