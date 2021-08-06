import { Box } from "@material-ui/core";
import { apiCall } from "../utils/apiCall";
import HeadLayout from "../components/headLayout";
import { INews } from "../types/news";
import Slider from "../components/slider";
import { SwiperSlide } from "swiper/react";
import Link from "next/link";

// components
import UrgentNewsStrip from "../components/home/urgentNewsStrip";
import LargeNews from "../components/news/largeNews";
import BannerCard from "../components/news/bannerCard";
import SideBar from "../components/sideBar";
import { GetServerSideProps } from "next";
import { ISection } from "../types/section";
import { IStrip } from "../types/strip";
import { IFile } from "../types/file";

// Styles
import styles from "../styles/Home.module.scss";
import SectionNews from "../components/sectionNews";
import ImageOpt from "../components/imageOpt";
import { IArticle } from "../types/article";
import GoogleAds from "../components/googleAds";

// tmrNews === todays most read news

interface IProps {
    info: {
        sections: ISection[];
        strips: IStrip[];
        files: IFile[];
        tmrNews: INews[];
        article: IArticle;
    };
}

const Home = ({ info }: IProps) => {
    const { sections, strips, tmrNews, article, files } = info;

    return (
        <>
            <HeadLayout />
            <div>
                <div className={styles.page}>
                    <div className={styles.introSection}>
                        <div className={styles.introContent}>
                            <div className={styles.introContainer}>
                                <div
                                    className={`${styles.introItem} ${styles.introItem1}`}
                                >
                                    <BannerCard
                                        data={sections[1]}
                                        type={false}
                                    />
                                </div>
                                <div
                                    className={`${styles.introItem} ${styles.introItem2}`}
                                >
                                    <BannerCard
                                        data={sections[4]}
                                        type={false}
                                    />
                                </div>
                                <div
                                    className={`${styles.introItem} ${styles.introItem3}`}
                                >
                                    <BannerCard
                                        data={sections[0]}
                                        type={true}
                                    />
                                </div>
                                <div
                                    className={`${styles.introItem} ${styles.introItem4}`}
                                >
                                    <BannerCard
                                        data={sections[2]}
                                        type={false}
                                    />
                                </div>
                                <div
                                    className={`${styles.introItem} ${styles.introItem5}`}
                                >
                                    <BannerCard
                                        data={sections[3]}
                                        type={false}
                                    />
                                </div>
                                <div
                                    className={`${styles.introItem} ${styles.introItem6}`}
                                >
                                    <BannerCard
                                        data={sections[7]}
                                        type={false}
                                    />
                                </div>
                                <div
                                    className={`${styles.introItem} ${styles.introItem7}`}
                                >
                                    <BannerCard
                                        data={sections[6]}
                                        type={false}
                                    />
                                </div>
                                <div
                                    className={`${styles.introItem} ${styles.introItem8}`}
                                >
                                    <BannerCard
                                        data={sections[5]}
                                        type={false}
                                    />
                                </div>
                                <div
                                    className={`${styles.introItem} ${styles.introItem9}`}
                                >
                                    {article && (
                                        <div className="banner-card">
                                            <ImageOpt
                                                src={
                                                    (
                                                        article.thumbnail ||
                                                        article.created_by
                                                            .avatar
                                                    )?.sizes?.m
                                                }
                                                objectFit="cover"
                                                layout="fill"
                                            />
                                            <Link
                                                href={`/articles/${article.article_id}`}
                                            >
                                                <div className="overlay">
                                                    <a
                                                        style={{
                                                            backgroundColor:
                                                                "rgb(1, 224, 1)",
                                                        }}
                                                    >
                                                        كتاب وآراء
                                                    </a>
                                                    <div className="card-content">
                                                        <Link
                                                            href={`/articles/${article.article_id}`}
                                                        >
                                                            <p>
                                                                {article.title}
                                                            </p>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <UrgentNewsStrip strips={strips} />
                    <Box className={styles.filesContainer}>
                        <Slider
                            slidesPerView={6}
                            spaceBetween={10}
                            breakingpoints={{
                                0: {
                                    slidesPerView: 2,
                                },
                                450: {
                                    slidesPerView: 3,
                                },
                                600: {
                                    slidesPerView: 4,
                                },
                                750: {
                                    slidesPerView: 5,
                                },
                                900: {
                                    slidesPerView: 6,
                                },
                                1050: {
                                    slidesPerView: 7,
                                },
                                1200: {
                                    slidesPerView: 8,
                                },
                            }}
                        >
                            {files.map((file) => (
                                <SwiperSlide
                                    className="file-container"
                                    key={file.file_id}
                                >
                                    <Link href={`/files/${file.file_id}`}>
                                        <a>
                                            <div className="file-wrapper"></div>
                                            <Box width="100%" height="100%">
                                                <ImageOpt
                                                    src={file.image?.sizes?.s}
                                                    objectFit="cover"
                                                    layout="fill"
                                                />
                                                <p
                                                    style={{
                                                        zIndex: 2,
                                                        color: "white",
                                                        position: "absolute",
                                                        bottom: "5px",
                                                        right: "5px",
                                                        fontWeight: 900,
                                                        fontSize: "18px",
                                                    }}
                                                >
                                                    {file.text}
                                                </p>
                                                <div
                                                    style={{
                                                        position: "absolute",
                                                        left: 0,
                                                        top: 0,
                                                        width: "100%",
                                                        height: "100%",
                                                        backgroundImage:
                                                            "linear-gradient(360deg, #0000008b 0%, transparent 100%)",
                                                    }}
                                                ></div>
                                            </Box>
                                        </a>
                                    </Link>
                                </SwiperSlide>
                            ))}
                        </Slider>
                    </Box>
                    <div className={styles.swiper}>
                        <div className="container">
                            <div className="author-title">
                                <h1>
                                    <span>
                                        اكثر 10 اخبار قراءة لهذا الأسبوع
                                    </span>
                                </h1>
                            </div>
                            <div className={styles.swiperWrapper}>
                                <Slider
                                    slidesPerView={4}
                                    breakingpoints={{
                                        0: {
                                            slidesPerView: 2,
                                        },
                                        750: {
                                            slidesPerView: 3,
                                        },
                                        1000: {
                                            slidesPerView: 4,
                                        },
                                    }}
                                >
                                    {tmrNews &&
                                        tmrNews.map((item) => (
                                            <SwiperSlide key={item.news_id}>
                                                <LargeNews news={item} />
                                            </SwiperSlide>
                                        ))}
                                </Slider>
                            </div>
                        </div>
                    </div>
                    <GoogleAds />
                    <div className={styles.mainSection}>
                        <aside className={styles.aside}>
                            <SideBar />
                        </aside>
                        <div className={styles.content}>
                            {sections
                                ?.sort(
                                    (a, b) =>
                                        Number(a.section_order) -
                                        Number(b.section_order)
                                )
                                .map((s) => (
                                    <SectionNews key={s.section_id} data={s} />
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const info = await apiCall("get", `/homeInfo`);

    return {
        props: {
            info,
        },
    };
};

export default Home;
