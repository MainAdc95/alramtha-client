// Main
import Link from "next/link";
import ImageOpt from "../imageOpt";
import { INews } from "../../types/news";

interface IProps {
    data: INews;
    styles?: any;
}

const LargeNews = ({ data, styles }: IProps) => {
    return (
        <div className="large-news">
            <div className="img-wrapper">
                <div className="news-img">
                    <ImageOpt
                        src={data.images[0]?.sizes?.m}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>

                <Link href={`/sections/${data.section.section_id}`}>
                    <a style={{ backgroundColor: `${data.section.color}` }}>
                        {data.section.section_name}
                    </a>
                </Link>
            </div>

            <div className="news-content" style={styles && styles}>
                <Link href={`/news/${data.news_id}`}>
                    <h2>{data.title}</h2>
                </Link>

                <ul>
                    <li>{data.created_at}</li>
                    <li>
                        by <span>{data.created_by.username}</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default LargeNews;
