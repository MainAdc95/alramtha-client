import parse from "html-react-parser";
import Link from "next/link";
import { useEffect } from "react";
import { SwiperSlide } from "swiper/react";
import { IArticle } from "../../../types/article";

// Components
import ShareNews from "../../../components/news/shareNews";
import SideBar from "../../../components/sideBar";
import { Box } from "@material-ui/core";
import Modal from "../modal";

// Styles
import styles from "../../../styles/News.module.scss";
import ImageOpt from "../../../components/imageOpt";
import Slider from "../../../components/slider";

// icons
import VisibilityIcon from "@material-ui/icons/Visibility";
import GoogleAds from "../../../components/googleAds";

interface IProps {
    article: IArticle;
    close: any;
}

const ArticlePage = ({ article, close }: IProps) => {
    useEffect(() => {
        // @ts-ignore
        window?.twttr?.widgets?.load(document.getElementById("textEditor"));
        // @ts-ignore
        window?.instgrm?.Embeds?.process();
    }, []);

    if (article)
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
                                            <h1>{article.title}</h1>
                                            <ul>
                                                <li>
                                                    {new Date(
                                                        article.created_at ||
                                                            null
                                                    ).toLocaleString("ar")}
                                                </li>
                                            </ul>
                                        </div>
                                        <ShareNews
                                            uri={`/articles/${article.article_id}`}
                                        />
                                        <Box width="100%">
                                            <div
                                                className={
                                                    styles.newsImgsWrapper
                                                }
                                            >
                                                <Slider>
                                                    {article.thumbnail && (
                                                        <SwiperSlide
                                                            key={
                                                                article
                                                                    .thumbnail
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
                                                                            article
                                                                                .thumbnail
                                                                                ?.sizes
                                                                                ?.l
                                                                        }
                                                                        alt={
                                                                            article
                                                                                ?.thumbnail
                                                                                ?.image_description ||
                                                                            ""
                                                                        }
                                                                    />
                                                                </div>
                                                            </div>
                                                        </SwiperSlide>
                                                    )}
                                                    {article.images.map(
                                                        (img) => (
                                                            <SwiperSlide
                                                                key={
                                                                    img.image_id
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
                                                                                img
                                                                                    ?.sizes
                                                                                    ?.l
                                                                            }
                                                                            alt={
                                                                                img.image_description
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </SwiperSlide>
                                                        )
                                                    )}
                                                </Slider>
                                            </div>
                                            {/* <div className={styles.newsInfo}>
                                            <div
                                                className={
                                                    styles.readersContainer
                                                }
                                            >
                                                <p>{article.readers || 0}</p>
                                                <VisibilityIcon />
                                            </div>
                                        </div> */}
                                            {article.intro && (
                                                <blockquote
                                                    className={styles.newsQoute}
                                                >
                                                    <p>{article.intro}</p>
                                                </blockquote>
                                            )}
                                            <Box
                                                width="100%"
                                                id="textEditor"
                                                className={styles.newsContent}
                                            >
                                                <div className="textParserContainer">
                                                    {parse(article.text)}
                                                </div>
                                            </Box>
                                            <div className={styles.newsTags}>
                                                <ul>
                                                    {article.tags.map((tag) => (
                                                        <li>
                                                            <Link
                                                                href={`/tags/${tag.tag_id}`}
                                                            >
                                                                <a className="tag">
                                                                    {
                                                                        tag.tag_name
                                                                    }
                                                                </a>
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                            <ShareNews
                                                uri={`/articles/${article.article_id}`}
                                            />
                                        </Box>
                                        <GoogleAds />
                                    </div>
                                </div>
                                <div className={styles.sidebarContainer}>
                                    <SideBar newsId={article.article_id} />
                                </div>
                            </div>
                        </div>
                    </div>
                </Modal>
            </>
        );

    return null;
};

export default ArticlePage;
