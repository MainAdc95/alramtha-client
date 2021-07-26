import Link from "next/link";
import ImageOpt from "../imageOpt";
import { INews } from "../../types/news";
import { useRouter } from "next/router";

// icons
import VisibilityIcon from "@material-ui/icons/Visibility";

interface IProps {
    news: INews;
}

const SmallNews = ({ news }: IProps) => {
    const router = useRouter();

    const shallow = () => {
        window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
        router.push(`/news/${news.news_id}`, undefined, { shallow: true });
    };

    if (news)
        return (
            <li className="small-news">
                <div onClick={() => shallow()} className="news-img">
                    <div>
                        <ImageOpt
                            src={news.thumbnail?.sizes?.s}
                            alt={news.thumbnail.image_description}
                            empty={news.thumbnail ? false : true}
                        />
                    </div>
                </div>
                <div className="news-info">
                    <a onClick={() => shallow()}>{news.title}</a>
                    <div>
                        <p>{new Date(news.created_at).toLocaleString("ar")} </p>
                        <div className="readers-container">
                            <p>{news.readers || 0}</p>
                            <VisibilityIcon />
                        </div>
                    </div>
                </div>
            </li>
        );
    return null;
};

export default SmallNews;
