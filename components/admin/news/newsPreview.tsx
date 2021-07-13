import parse from "html-react-parser";
import Link from "next/link";
import HeadLayout from "../../headLayout";
import { useEffect } from "react";

// Components
import ShareNews from "../../news/shareNews";
import SideBar from "../../sideBar";
import { Grid, Box } from "@material-ui/core";
import Modal from "../modal";

// Styles
import styles from "../../../styles/News.module.scss";
import { INews } from "../../../types/news";
import ImageOpt from "../../imageOpt";
import Slider from "../../slider";
import { SwiperSlide } from "swiper/react";

interface IProps {
    news: INews;
    close: any;
}

const NewsPreview = ({ news, close }: IProps) => {
    useEffect(() => {
        // @ts-ignore
        window?.twttr?.widgets?.load();

        // @ts-ignore
        window.instgrm?.Embeds?.process();
    }, []);

    return (
        <>
            <HeadLayout title={news.title} />
            <Modal
                width="90%"
                type="parent"
                closeInfo={{ close, check: false }}
            >
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
                                                    news.created_at ||
                                                        Date.now()
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
                                            {parse(news.text)}
                                        </Box>
                                        <div className={styles.newsTags}>
                                            <ul>
                                                {news.tags.map((tag) => (
                                                    <li>
                                                        <Link
                                                            href={`/tags/${tag.tag_id}`}
                                                        >
                                                            <a>
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
            </Modal>
        </>
    );
};

export default NewsPreview;
