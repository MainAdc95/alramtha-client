import Link from "next/link";
import ImageOpt from "../imageOpt";
import { INews } from "../../types/news";
import { useRouter } from "next/router";

// icons
import VisibilityIcon from "@material-ui/icons/Visibility";

interface IProps {
    data: INews;
}

const SmallNews = ({ data }: IProps) => {
    const router = useRouter();

    const shallow = () => {
        window.scrollTo({ left: 0, top: 0, behavior: "smooth" });
        router.push(`/news/${data.news_id}`, undefined, { shallow: true });
    };

    if (data)
        return (
            <li className="small-news">
                <div onClick={() => shallow()} className="news-img">
                    <div>
                        <ImageOpt
                            src={data.thumbnail?.sizes?.s}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                </div>
                <div className="news-info">
                    <a onClick={() => shallow()}>{data.title}</a>
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
