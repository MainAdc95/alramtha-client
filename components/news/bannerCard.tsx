import { SwiperSlide } from "swiper/react";
import Link from "next/link";
import ImageOpt from "../imageOpt";

import Slider from "../slider";
import { INews } from "../../types/news";
import { ISection } from "../../types/section";

interface IProps {
    data: any;
    type: boolean;
}

const BannerCard = ({ data, type }: IProps) => {
    if (data.news.length > 0)
        return (
            <div className="banner-card">
                {type ? (
                    <Slider>
                        {data.news.map((news: INews) => (
                            <SwiperSlide key={news.news_id}>
                                <div className="newsContainer">
                                    <ImageOpt
                                        src={news.images[0].image_name}
                                        objectFit="cover"
                                        layout="fill"
                                    />
                                </div>
                                <div className="overlay">
                                    <div className="card-content">
                                        <a
                                            style={{
                                                backgroundColor: `${data.color}`,
                                            }}
                                        >
                                            {data.section_name}
                                        </a>
                                        <Link href={`/news/${data.news[0].id}`}>
                                            <h2>{data.news[0].title}</h2>
                                        </Link>

                                        <ul>
                                            <li>04 Dec, 2020</li>
                                            <li>0 comments</li>
                                        </ul>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Slider>
                ) : (
                    <>
                        <ImageOpt
                            src={data.news[0].images[0].image_name}
                            objectFit="cover"
                            layout="fill"
                        />

                        <div className="overlay">
                            <div className="card-content">
                                <a style={{ backgroundColor: `${data.color}` }}>
                                    {data.section_name}
                                </a>
                                <Link href={`/news/${data.news[0].id}`}>
                                    <h2>{data.news[0].title}</h2>
                                </Link>

                                <ul>
                                    <li>04 Dec, 2020</li>
                                    <li>0 comments</li>
                                </ul>
                            </div>
                        </div>
                    </>
                )}
            </div>
        );
    else return null;
};

export default BannerCard;