import { IFile } from "./file";
import { IImage } from "./image";
import { ISection } from "./section";
import { ITag } from "./tag";
import { IUser } from "./user";

type SubTitle = { sub_title_id: string; sub_title: string };

export interface INews {
    news_id: string;
    thumbnail: IImage;
    intro: string;
    title: string;
    text: string;
    section: ISection;
    file: IFile;
    sub_titles: SubTitle[];
    images: IImage[];
    tags: ITag[];
    is_published: boolean;
    is_archived: boolean;
    created_by: IUser;
    updated_by: IUser;
    updated_at: Date;
    created_at: Date;
}
