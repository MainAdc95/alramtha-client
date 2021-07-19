import { IImage } from "./image";
import { IUser } from "./user";

export interface ISection {
    section_id: string;
    section_name: string;
    section_order: number;
    color: string;
    created_at: Date;
    updated_at: Date;
    created_by: IUser;
    updated_by: IUser;
}
