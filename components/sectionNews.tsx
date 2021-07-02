// Main
import Link from "next/link";
import ImageOpt from "./imageOpt";
import HoverBox from "./hoverBox";
import SmallNews from "./news/smallNews";
import { Grid } from "@material-ui/core";
import Slider from "./slider";
import { SwiperSlide } from "swiper/react";

interface IProps {
    data: any;
    styles: any;
}

const SectionNews = ({ data, styles }: IProps) => {
    if (data.news.length > 0)
        return (
            <div style={{ marginBottom: "25px" }}>
                <div className="author-title">
                    <h1>
                        <span
                            style={{
                                borderColor: `${data.color}`,
                            }}
                        >
                            {data.section_name}
                        </span>
                    </h1>
                </div>

                <Slider slidesPerView={2} spaceBetween={50}>
                    {data.news.map((news) => (
                        <SwiperSlide key={news.news_id}>
                            <div className={styles.sectionItem}>
                                <div className={styles.itemImg}>
                                    <HoverBox data={news} />
                                </div>
                                <ul
                                    style={{
                                        marginBottom: "10px",
                                    }}
                                >
                                    {data.news.map((item) => (
                                        <SmallNews
                                            key={item.news_id}
                                            data={item}
                                        />
                                    ))}
                                </ul>
                            </div>
                        </SwiperSlide>
                    ))}
                </Slider>
            </div>
        );
    else return null;
};

export default SectionNews;
