import { IImage } from "./image";
import { ISection } from "./section";
import { ITag } from "./tag";
import { IUser } from "./user";

type SubTitle = { sub_title_id: string; sub_title: string };

export interface IArticle {
    article_id: string;
    thumbnail: IImage;
    intro: string;
    title: string;
    text: string;
    section: ISection;
    sub_titles: SubTitle[];
    images: IImage[];
    tags: ITag[];
    is_published: boolean;
    created_by: IUser;
    updated_by: IUser;
    updated_at: Date;
    created_at: Date;
}
