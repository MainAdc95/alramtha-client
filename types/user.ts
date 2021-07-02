import { IImage } from "./image";

export type Role =
    | "all"
    | "is_super_admin"
    | "is_admin"
    | "is_editor"
    | "is_reporter";

export interface IUser {
    user_id: string;
    avatar: IImage;
    username: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    password: string;
    version: number;
    is_active: boolean;
    is_blocked: boolean;
    is_admin: boolean;
    is_super_admin: boolean;
    is_editor: boolean;
    is_reporter: boolean;
    created_at: Date;
}
