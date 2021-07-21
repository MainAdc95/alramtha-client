import Link from "next/link";
import ImageOpt from "../imageOpt";
import { INews } from "../../types/news";

// icons
import VisibilityIcon from "@material-ui/icons/Visibility";

interface IProps {
    data: INews;
}

const SmallNews = ({ data }: IProps) => {
    if (data)
        return (
            <li className="small-news">
                <Link href={`/news/${data.news_id}`}>
                    <div className="news-img">
                        <div>
                            <ImageOpt
                                src={data.thumbnail?.sizes?.s}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    </div>
                </Link>
                <div className="news-info">
                    <Link href={`/news/${data.news_id}`}>
                        <a>{data.title}</a>
                    </Link>
                    <div>
                        <p>{new Date(data.created_at).toLocaleString("ar")} </p>
                        <div className="readers-container">
                            <p>{data.readers || 0}</p>
                            <VisibilityIcon />
                        </div>
                    </div>
                </div>
            </li>
        );
    return null;
};

export default SmallNews;
