import { IImage } from "./image";
import { IUser } from "./user";

export interface IFile {
    file_id: string;
    text: string;
    image: IImage;
    created_at: Date;
    updated_at: Date;
    created_by: IUser;
    updated_by: IUser;
}
