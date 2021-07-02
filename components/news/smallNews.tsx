// Main
import Link from "next/link";
import ImageOpt from "../imageOpt";
import { INews } from "../../types/news";

interface IProps {
    data: INews;
}

const SmallNews = ({ data }: IProps) => {
    return (
        <li className="small-news">
            <div className="news-info">
                <h2>
                    <Link href={`/news/${data.news_id}`}>
                        <a>{data.title}</a>
                    </Link>

                    <span>{data.created_at}</span>
                </h2>
            </div>
            <div className="news-img">
                <ImageOpt
                    src={data.images[0].image_name}
                    layout="fill"
                    objectFit="cover"
                />
            </div>
        </li>
    );
};

export default SmallNews;
