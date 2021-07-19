import { IUser } from "./user";

export interface INewsLetter {
    news_letter_id: string;
    email: string;
    created_by: IUser;
    updated_by: IUser;
    updated_at: Date;
    created_at: Date;
}
