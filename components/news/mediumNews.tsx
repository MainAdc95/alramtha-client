// Main
import Link from "next/link";
import ImageOpt from "../imageOpt";
import { INews } from "../../types/news";

interface IProps {
    data: INews;
}

const MediumNews = ({ data }: IProps) => {
    return (
        <div className="medium-news">
            <ImageOpt
                src={data.thumbnail?.sizes?.m}
                layout="fill"
                objectFit="cover"
            />
            <div className="overlay">
                <Link href={`/news/${data.news_id}`}>
                    <a>{data.title}</a>
                </Link>
            </div>
        </div>
    );
};

export default MediumNews;
