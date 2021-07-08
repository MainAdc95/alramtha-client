import { IUser } from "./user";

export interface IImage {
    image_id: string;
    sizes: { s: string; m: string; l: string };
    image_description: string;
    created_at: Date;
    created_by: IUser;
}
