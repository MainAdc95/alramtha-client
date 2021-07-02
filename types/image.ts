import { IUser } from "./user";

export interface IImage {
    image_id: string;
    image_name: string;
    image_description: string;
    created_at: Date;
    created_by: IUser;
}
