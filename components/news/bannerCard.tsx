import { SwiperSlide } from "swiper/react";
import Link from "next/link";
import ImageOpt from "../imageOpt";
import Slider from "../slider";
import { INews } from "../../types/news";

interface IProps {
    data: any;
    type: boolean;
}

const BannerCard = ({ data, type }: IProps) => {
    console.log(data);
    return (
        <div className="banner-card">
            {data ? (
                type ? (
                    <Slider spaceBetween={1}>
                        {data.map((news: INews) => (
                            <SwiperSlide key={news.news_id}>
                                <div
                                    className="newsContainer"
                                    style={{ height: "100%" }}
                                >
                                    <ImageOpt
                                        priority={true}
                                        src={news.thumbnail?.sizes?.m}
                                        objectFit="cover"
                                        layout="fill"
                                    />
                                </div>
                                <Link href={`/news/${news.news_id}`}>
                                    <div className="overlay">
                                        {news.section && (
                                            <a
                                                style={{
                                                    backgroundColor: `${news.section.color}`,
                                                }}
                                            >
                                                {news.section.section_name}
                                            </a>
                                        )}
                                        <div className="card-content">
                                            <Link
                                                href={`/news/${news.news_id}`}
                                            >
                                                <p>{news.title}</p>
                                            </Link>
                                        </div>
                                    </div>
                                </Link>
                            </SwiperSlide>
                        ))}
                    </Slider>
                ) : (
                    <>
                        <ImageOpt
                            src={data.news[0]?.thumbnail?.sizes?.m}
                            objectFit="cover"
                            layout="fill"
                        />
                        <Link href={`/news/${data?.news[0]?.news_id}`}>
                            <div className="overlay">
                                <a
                                    style={{
                                        backgroundColor: `${data.color}`,
                                    }}
                                >
                                    {data.section_name}
                                </a>
                                <div className="card-content">
                                    <Link
                                        href={`/news/${data.news[0]?.news_id}`}
                                    >
                                        <p>{data.news[0]?.title}</p>
                                    </Link>
                                </div>
                            </div>
                        </Link>
                    </>
                )
            ) : null}
        </div>
    );
};

export default BannerCard;
