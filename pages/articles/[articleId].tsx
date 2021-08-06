import parse from "html-react-parser";
import { apiCall, apiImage } from "../../utils/apiCall";
import { GetServerSideProps } from "next";
import Link from "next/link";
import HeadLayout from "../../components/headLayout";
import { useEffect } from "react";

// Components
import ShareNews from "../../components/news/shareNews";
import SideBar from "../../components/sideBar";
import { Box } from "@material-ui/core";

// Styles
import styles from "../../styles/News.module.scss";
import { IArticle } from "../../types/article";
import ImageOpt from "../../components/imageOpt";
import Slider from "../../components/slider";
import { SwiperSlide } from "swiper/react";
import { useRouter } from "next/router";

// icons
import VisibilityIcon from "@material-ui/icons/Visibility";
import GoogleAds from "../../components/googleAds";

interface IProps {
    article: IArticle;
}

const ArticlePage = ({ article }: IProps) => {
    const router = useRouter();

    useEffect(() => {
        // @ts-ignore
        window?.twttr?.widgets?.load(document.getElementById("textEditor"));
        // @ts-ignore
        window?.instgrm?.Embeds?.process();

        handleSelect();
    }, [router.asPath]);

    const handleSelect = async () => {
        try {
            await apiCall("post", `/articles/${article.article_id}/read`);
        } catch (err) {
            console.log(err);
        }
    };

    if (article)
        return (
            <>
                <HeadLayout
                    title={article.title}
                    image={apiImage(article.thumbnail?.sizes?.l)}
                    description={article.intro}
                />
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
                                                    article.created_at
                                                ).toLocaleString("ar")}
                                            </li>
                                        </ul>
                                    </div>
                                    <ShareNews
                                        uri={`/articles/${article.article_id}`}
                                    />
                                    <Box width="100%">
                                        <div className={styles.newsImgsWrapper}>
                                            <Slider>
                                                {article.thumbnail && (
                                                    <SwiperSlide
                                                        key={
                                                            article.thumbnail
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
                                                {article.images.map((img) => (
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
                                                                    alt={
                                                                        img.image_description
                                                                    }
                                                                />
                                                            </div>
                                                        </div>
                                                    </SwiperSlide>
                                                ))}
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
                                                                {tag.tag_name}
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
            </>
        );

    return null;
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const article = await apiCall("get", `/articles/${ctx.params.articleId}`);

    return {
        props: {
            article,
        },
    };
};

export default ArticlePage;
