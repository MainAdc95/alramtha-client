import parse from "html-react-parser";
import { apiCall } from "../../utils/apiCall";
import { GetServerSideProps } from "next";
import Link from "next/link";
import HeadLayout from "../../components/headLayout";
import { useEffect, useState } from "react";
import { transformYoutubeLinks } from "../../utils/parseSmTextEditor";

// Components
import ShareNews from "../../components/news/shareNews";
import SideBar from "../../components/sideBar";
import { Box } from "@material-ui/core";
import SectionNews from "../../components/sectionNews";

// Styles
import styles from "../../styles/News.module.scss";
import { INews } from "../../types/news";
import ImageOpt from "../../components/imageOpt";
import Slider from "../../components/slider";
import { SwiperSlide } from "swiper/react";
import { useRouter } from "next/router";

// icons
import VisibilityIcon from "@material-ui/icons/Visibility";

interface IProps {
    news: INews;
}

const NewsPage = ({ news: n }: IProps) => {
    const router = useRouter();
    const [news, setNews] = useState<INews | null>(n);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!news) return setNews(n);

        if (news)
            (async () => {
                setLoading(true);
                const news = await apiCall<INews>(
                    "get",
                    `/news/${router.query.newsId}`
                );
                setLoading(false);

                setNews(news);
            })();
    }, [router.asPath]);

    useEffect(() => {
        if (news) {
            // @ts-ignore
            window?.twttr?.widgets?.load();
            // @ts-ignore
            window?.instgrm?.Embeds?.process();

            handleSelect();
        }
    }, [news]);

    const handleSelect = async () => {
        if (news)
            try {
                await apiCall("post", `/news/${news.news_id}/read`);
            } catch (err) {
                console.log(err);
            }
    };

    if (news)
        return (
            <>
                <HeadLayout
                    title={news.title}
                    url={`/news/${news.news_id}`}
                    image={news.thumbnail?.sizes?.l}
                    description={news.intro}
                />
                <div className={styles.page}>
                    <div className={`${styles.container}`}>
                        <div className={styles.sideContentContainer}>
                            <div className={styles.mainContent}>
                                <div className={styles.newsContent}>
                                    <div className={styles.newsHeading}>
                                        <h1>{news.title}</h1>
                                        <ul>
                                            <li>
                                                {new Date(
                                                    news.created_at
                                                ).toLocaleString("ar")}
                                            </li>
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
                                                                    alt={
                                                                        news
                                                                            ?.thumbnail
                                                                            ?.image_description ||
                                                                        ""
                                                                    }
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
                                                    loading
                                                        ? ""
                                                        : transformYoutubeLinks(
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
                                        <ShareNews />
                                    </Box>
                                    {news.section && (
                                        <Box mt={5}>
                                            <SectionNews data={news.section} />
                                        </Box>
                                    )}
                                </div>
                            </div>
                            <div className={styles.sidebarContainer}>
                                <SideBar newsId={news.news_id} />
                            </div>
                        </div>
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
