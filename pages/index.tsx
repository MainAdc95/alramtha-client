import { Grid } from "@material-ui/core";
import useSWR from "swr";
import { apiCall } from "../utils/apiCall";
import HeadLayout from "../components/headLayout";
import { INews } from "../types/news";
import Slider from "../components/slider";
import { SwiperSlide } from "swiper/react";

// components
import UrgentNewsStrip from "../components/home/urgentNewsStrip";
import LargeNews from "../components/news/largeNews";
import BannerCard from "../components/news/bannerCard";
import SideBar from "../components/sideBar";
import Image from "next/image";
import { GetServerSideProps } from "next";

// Styles
import styles from "../styles/Home.module.scss";
import SectionNews from "../components/sectionNews";

interface IProps {
    info: any;
}

const Home = ({ info }: IProps) => {
    const { sections } = info;

    const { data } =
        useSWR<{
            results: number;
            news: INews[];
        }>("/news");
    console.log(sections);
    return (
        <>
            <HeadLayout />
            <div>
                <div className={styles.page}>
                    <div className={styles.introSection}>
                        <div className={styles.introContent}>
                            <div
                                className={`${styles.introItem} ${styles.introItem1}`}
                            >
                                <BannerCard data={sections[0]} type={false} />
                            </div>
                            <div
                                className={`${styles.introItem} ${styles.introItem2}`}
                            >
                                <BannerCard data={sections[1]} type={false} />
                            </div>
                            <div
                                className={`${styles.introItem} ${styles.introItem3}`}
                            >
                                <BannerCard data={sections[2]} type={true} />
                            </div>
                            <div
                                className={`${styles.introItem} ${styles.introItem4}`}
                            >
                                <BannerCard data={sections[3]} type={false} />
                            </div>
                            <div
                                className={`${styles.introItem} ${styles.introItem5}`}
                            >
                                <BannerCard data={sections[4]} type={false} />
                            </div>
                            <div
                                className={`${styles.introItem} ${styles.introItem6}`}
                            >
                                <BannerCard data={sections[5]} type={false} />
                            </div>
                            <div
                                className={`${styles.introItem} ${styles.introItem7}`}
                            >
                                <BannerCard data={sections[6]} type={false} />
                            </div>
                            <div
                                className={`${styles.introItem} ${styles.introItem8}`}
                            >
                                <BannerCard data={sections[7]} type={false} />
                            </div>
                            <div
                                className={`${styles.introItem} ${styles.introItem9}`}
                            >
                                <BannerCard data={sections[8]} type={false} />
                            </div>
                        </div>
                    </div>

                    <UrgentNewsStrip />
                    <div className={styles.swiper}>
                        <div className="container">
                            <div className="author-title">
                                <h1>
                                    <span>الاخبار اليوم المميزه</span>
                                </h1>
                            </div>
                            <div className={styles.swiperWrapper}>
                                <Slider slidesPerView={4}>
                                    {data &&
                                        data.news.map((item) => (
                                            <SwiperSlide key={item.news_id}>
                                                <LargeNews
                                                    data={item}
                                                    styles={{
                                                        padding: "18px 20px",
                                                        borderBottom:
                                                            "1px solid #f0f0f0",
                                                        backgroundColor:
                                                            "#fafafa",
                                                    }}
                                                />
                                            </SwiperSlide>
                                        ))}
                                </Slider>
                            </div>
                        </div>
                    </div>
                    <div className={styles.section}>
                        <div className="container">
                            <Grid container className="grid-root" spacing={1}>
                                <Grid item xs={12} md={8}>
                                    <SectionNews
                                        data={sections[0]}
                                        styles={styles}
                                    />
                                    <div className="adv-wide-box">
                                        <Image src="/news1.jpg" layout="fill" />
                                    </div>

                                    <SectionNews
                                        data={sections[1]}
                                        styles={styles}
                                    />

                                    <SectionNews
                                        data={sections[2]}
                                        styles={styles}
                                    />
                                    <div className="adv-wide-box">
                                        <Image src="/news1.jpg" layout="fill" />
                                    </div>

                                    <SectionNews
                                        data={sections[3]}
                                        styles={styles}
                                    />

                                    <SectionNews
                                        data={sections[4]}
                                        styles={styles}
                                    />

                                    <div className="adv-wide-box">
                                        <Image src="/news1.jpg" layout="fill" />
                                    </div>

                                    <SectionNews
                                        data={sections[5]}
                                        styles={styles}
                                    />

                                    <SectionNews
                                        data={sections[6]}
                                        styles={styles}
                                    />

                                    <div className="adv-wide-box">
                                        <Image src="/news1.jpg" layout="fill" />
                                    </div>
                                    <SectionNews
                                        data={sections[7]}
                                        styles={styles}
                                    />

                                    <SectionNews
                                        data={sections[8]}
                                        styles={styles}
                                    />

                                    <div className="adv-wide-box">
                                        <Image src="/news1.jpg" layout="fill" />
                                    </div>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <SideBar />
                                </Grid>
                            </Grid>
                        </div>
                    </div>

                    <div className={styles.section}>
                        <div className="container">
                            <Grid container className="grid-root">
                                <Grid item xs={12} md={8}>
                                    <div className="author-title">
                                        <h1>
                                            <span>أخر الأخبار</span>
                                        </h1>
                                    </div>

                                    <div>
                                        <Grid
                                            container
                                            className={`grid-root`}
                                            spacing={3}
                                        >
                                            {data &&
                                                data.news.map((item) => (
                                                    <Grid
                                                        item
                                                        xs={12}
                                                        md={6}
                                                        key={item.news_id}
                                                    >
                                                        <LargeNews
                                                            data={item}
                                                            styles={{
                                                                padding:
                                                                    "18px 20px",
                                                                borderBottom:
                                                                    "1px solid #f0f0f0",
                                                                backgroundColor:
                                                                    "#fafafa",
                                                            }}
                                                        />
                                                    </Grid>
                                                ))}
                                        </Grid>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

// ("رياضة, اقتصاد, ثقافة, سياحة, تكنولوجيا, سياسة, تحقيق, منوعات, كتاب وآراء");

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const info = await apiCall("get", `/homeInfo`);

    return {
        props: {
            info,
        },
    };
};

export default Home;
