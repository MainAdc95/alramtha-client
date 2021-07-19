import parse from "html-react-parser";
import { apiCall } from "../../utils/apiCall";
import { GetServerSideProps } from "next";
import Link from "next/link";
import HeadLayout from "../../components/headLayout";
import { useEffect } from "react";

// Components
import ShareNews from "../../components/news/shareNews";
import SideBar from "../../components/sideBar";
import { Grid, Box } from "@material-ui/core";

// Styles
import styles from "../../styles/News.module.scss";
import { INews } from "../../types/news";
import ImageOpt from "../../components/imageOpt";
import Slider from "../../components/slider";
import { SwiperSlide } from "swiper/react";

interface IProps {
    news: INews;
}

const NewsPage = ({ news }: IProps) => {
    useEffect(() => {
        // @ts-ignore
        window?.twttr?.widgets?.load();

        // @ts-ignore
        window.instgrm?.Embeds?.process();
    }, []);

    if (news)
        return (
            <>
                <HeadLayout title={news.title} />
                <div className={styles.page}>
                    <div className={`container ${styles.container}`}>
                        <Grid container className="grid-root">
                            <Grid item xs={12} md={8}>
                                <div className={styles.newsContent}>
                                    <div className={styles.newsHeading}>
                                        <h1>{news.title}</h1>
                                        <ul>
                                            <li>
                                                {new Date(
                                                    news.created_at
                                                ).toLocaleDateString()}
                                            </li>
                                            <li>0 القراء</li>
                                        </ul>
                                    </div>
                                    <ShareNews />
                                    <Box width="100%">
                                        <div className={styles.newsImgsWrapper}>
                                            <Slider>
                                                {news.thumbnail && (
                                                    <SwiperSlide
                                                        key={
                                                            news.thumbnail
                                                                .image_id
                                                        }
                                                        className={
                                                            styles.newsImgContainer
                                                        }
                                                    >
                                                        <ImageOpt
                                                            src={
                                                                news.thumbnail
                                                                    ?.sizes?.m
                                                            }
                                                            layout="fill"
                                                            objectFit="cover"
                                                        />
                                                    </SwiperSlide>
                                                )}
                                                {news.images.map((img) => (
                                                    <SwiperSlide
                                                        key={img.image_id}
                                                        className={
                                                            styles.newsImgContainer
                                                        }
                                                    >
                                                        <ImageOpt
                                                            src={img?.sizes?.m}
                                                            layout="fill"
                                                            objectFit="cover"
                                                        />
                                                    </SwiperSlide>
                                                ))}
                                            </Slider>
                                        </div>
                                        {news.resources && (
                                            <Box display="flex">
                                                <p className={styles.resource}>
                                                    المصادر:
                                                    {news.resources.map((r) => (
                                                        <span
                                                            key={r.resource_id}
                                                        >
                                                            {r.resource}
                                                            <span
                                                                className={
                                                                    styles.coma
                                                                }
                                                            >
                                                                ,
                                                            </span>
                                                        </span>
                                                    ))}
                                                    .
                                                </p>
                                            </Box>
                                        )}
                                        {news.intro && (
                                            <blockquote
                                                className={styles.newsQoute}
                                            >
                                                <p>{news.intro}</p>
                                            </blockquote>
                                        )}
                                        <Box
                                            width="100%"
                                            className={styles.newsContent}
                                        >
                                            <div className="textParserContainer">
                                                {parse(news.text)}
                                            </div>
                                        </Box>
                                        <div className={styles.newsTags}>
                                            <ul>
                                                {news.tags.map((tag) => (
                                                    <li>
                                                        <Link
                                                            href={`/tags/${tag.tag_id}`}
                                                        >
                                                            <a className="tag">
                                                                {tag.tag_name}
                                                            </a>
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                        <ShareNews />
                                    </Box>
                                </div>
                            </Grid>

                            <Grid item xs={12} md={4}>
                                <SideBar />
                            </Grid>
                        </Grid>
                    </div>
                </div>
            </>
        );

    return null;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const news = await apiCall("get", `/news/${ctx.params.newsId}`);

    return {
        props: {
            news,
        },
    };
};

export default NewsPage;
