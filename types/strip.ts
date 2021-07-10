import { IUser } from "./user";

export type StripType = "breakingNews" | "announcement" | "default";

export interface IStrip {
    strip_id: string;
    title: string;
    duration: string;
    type: StripType;
    link?: string;
    created_at: Date;
    updated_at: Date;
    created_by: IUser;
    updated_by: IUser;
}
