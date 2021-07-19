// Main
import Link from "next/link";
import ImageOpt from "../imageOpt";
import { INews } from "../../types/news";

interface IProps {
    news: INews;
    styles?: any;
}

const LargeNews = ({ news, styles }: IProps) => {
    return (
        <div className="large-news">
            <div className="img-wrapper">
                <div className="news-img">
                    <div>
                        {news.thumbnail && (
                            <ImageOpt
                                src={news.thumbnail?.sizes?.m}
                                layout="fill"
                                objectFit="cover"
                            />
                        )}
                    </div>
                </div>
                {news.section && (
                    <Link href={`/sections/${news.section?.section_id}`}>
                        <a style={{ backgroundColor: `${news.section.color}` }}>
                            {news.section.section_name}
                        </a>
                    </Link>
                )}
            </div>
            <div className="news-content" style={styles && styles}>
                <Link href={`/news/${news.news_id}`}>
                    <h2>{news.title}</h2>
                </Link>
                <ul>
                    <li>{news.created_at}</li>
                </ul>
            </div>
        </div>
    );
};

export default LargeNews;
