import parse from "html-react-parser";
import Link from "next/link";
import HeadLayout from "../../headLayout";
import { useEffect } from "react";
import { transformYoutubeLinks } from "../../../utils/parseSmTextEditor";

// Components
import SideBar from "../../sideBar";
import { Box } from "@material-ui/core";
import Modal from "../modal";

// Styles
import styles from "../../../styles/News.module.scss";
import { INews } from "../../../types/news";
import ImageOpt from "../../imageOpt";
import Slider from "../../slider";
import { SwiperSlide } from "swiper/react";

// icons
import VisibilityIcon from "@material-ui/icons/Visibility";

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
            <Modal
                width="70%"
                type="parent"
                closeInfo={{ close, check: false }}
            >
                <div className={styles.page}>
                    <div className={`${styles.container}`}>
                        <div className={styles.sideContentContainer}>
                            <div className={styles.mainContent}>
                                <div className={styles.newsContent}>
                                    <div className={styles.newsHeading}>
                                        <h1>{news.title}</h1>
                                        <ul>
                                            <li>
                                                {new Date().toLocaleString(
                                                    "ar"
                                                )}
                                            </li>
                                        </ul>
                                    </div>
                                    <Box width="100%">
                                        <div className={styles.newsImgsWrapper}>
                                            <Slider>
                                                {news.thumbnail && (
                                                    <SwiperSlide
                                                        key={
                                                            news.thumbnail
                                                                .image_id
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                styles.newsImgItem
                                                            }
                                                        >
                                                            <div>
                                                                <ImageOpt
                                                                    src={
                                                                        news
                                                                            .thumbnail
                                                                            ?.sizes
                                                                            ?.l
                                                                    }
                                                                    layout="fill"
                                                                    objectFit="cover"
                                                                />
                                                            </div>
                                                        </div>
                                                    </SwiperSlide>
                                                )}
                                                {news.images.map((img) => (
                                                    <SwiperSlide
                                                        key={img.image_id}
                                                    >
                                                        <div
                                                            className={
                                                                styles.newsImgItem
                                                            }
                                                        >
                                                            <div>
                                                                <ImageOpt
                                                                    src={
                                                                        img
                                                                            ?.sizes
                                                                            ?.l
                                                                    }
                                                                    layout="fill"
                                                                    objectFit="cover"
                                                                />
                                                            </div>
                                                        </div>
                                                    </SwiperSlide>
                                                ))}
                                            </Slider>
                                        </div>
                                        <div className={styles.newsInfo}>
                                            {news.resources && (
                                                <Box display="flex">
                                                    <p
                                                        className={
                                                            styles.resource
                                                        }
                                                    >
                                                        المصدر:
                                                        {news.resources.map(
                                                            (r) => (
                                                                <span
                                                                    key={
                                                                        r.resource_id
                                                                    }
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
                                                            )
                                                        )}
                                                        .
                                                    </p>
                                                </Box>
                                            )}
                                            <div
                                                className={
                                                    styles.readersContainer
                                                }
                                            >
                                                <p>{news.readers || 0}</p>
                                                <VisibilityIcon />
                                            </div>
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
                                            id="textEditor"
                                            className={styles.newsContent}
                                        >
                                            <div className="textParserContainer">
                                                {parse(
                                                    transformYoutubeLinks(
                                                        news.text
                                                    )
                                                )}
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
                                    </Box>
                                </div>
                            </div>
                            <div className={styles.sidebarContainer}>
                                <SideBar newsId={news.news_id} />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default NewsPreview;
