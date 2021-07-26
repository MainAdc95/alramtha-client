// Main
import Link from "next/link";
import ImageOpt from "../imageOpt";
import { INews } from "../../types/news";

interface IProps {
    news: INews;
}

const MediumNews = ({ news }: IProps) => {
    return (
        <div className="medium-news">
            <ImageOpt
                src={news.thumbnail?.sizes?.m}
                alt={news.thumbnail.image_description}
                empty={news.thumbnail ? false : true}
            />
            <div className="overlay">
                <Link href={`/news/${news.news_id}`}>
                    <a>{news.title}</a>
                </Link>
            </div>
        </div>
    );
};

export default MediumNews;
