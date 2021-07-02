import { IUser } from "./user";

export interface ITag {
    tag_id: string;
    tag_name: string;
    created_at: Date;
    updated_at: Date;
    created_by: IUser;
    updated_by: IUser;
}
