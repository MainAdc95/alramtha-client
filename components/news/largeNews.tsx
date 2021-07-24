import Link from "next/link";
import ImageOpt from "../imageOpt";
import { INews } from "../../types/news";

// icons
import VisibilityIcon from "@material-ui/icons/Visibility";
import { apiImage } from "../../utils/apiCall";

interface IProps {
    news: INews;
    styles?: any;
}

const LargeNews = ({ news, styles }: IProps) => {
    return (
        <div className="large-news">
            <div className="img-wrapper">
                <Link href={`/news/${news.news_id}`}>
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
                </Link>
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
                    <a>
                        <h2>{news.title}</h2>
                    </a>
                </Link>
                <ul>
                    <li>{new Date(news.created_at).toLocaleString("ar")}</li>
                    <li>
                        <div className="readers-container">
                            <p>{news.readers || 0}</p>
                            <VisibilityIcon />
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default LargeNews;
