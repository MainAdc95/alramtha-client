// Main
import Link from "next/link";
import ImageOpt from "./imageOpt";
import { INews } from "../types/news";

interface IProps {
    data: INews;
}

const HoverBox = ({ data }: IProps) => {
    if (data)
        return (
            <div className="hover-box">
                <div className="overlay"></div>
                <div className="box-img">
                    <ImageOpt
                        src={data.images[0].image_name}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>

                <div className="box-text">
                    <Link href={`/news/${data.news_id}`}>
                        <h2>{data.title}</h2>
                    </Link>
                    <ul>
                        <li>{data.created_at}</li>
                        {/* <li>
                            by <span>{data.created_by.username}</span>
                        </li> */}
                        <li>0 comments</li>
                    </ul>
                </div>
            </div>
        );
    else return null;
};

export default HoverBox;
