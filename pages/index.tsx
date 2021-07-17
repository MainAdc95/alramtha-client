import { Grid, Box } from "@material-ui/core";
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
import { ISection } from "../types/section";
import { IStrip } from "../types/strip";
import { IFile } from "../types/file";

// Styles
import styles from "../styles/Home.module.scss";
import SectionNews from "../components/sectionNews";
import ImageOpt from "../components/imageOpt";

interface IProps {
    info: { sections: ISection[]; strips: IStrip[]; files: IFile[] };
}

const Home = ({ info }: IProps) => {
    const { sections, strips, files } = info;

    const { data } =
        useSWR<{
            results: number;
            news: INews[];
        }>("/news");

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
                                <BannerCard data={sections[1]} type={false} />
                            </div>
                            <div
                                className={`${styles.introItem} ${styles.introItem2}`}
                            >
                                <BannerCard data={sections[4]} type={false} />
                            </div>
                            <div
                                className={`${styles.introItem} ${styles.introItem3}`}
                            >
                                <BannerCard data={sections[0]} type={true} />
                            </div>
                            <div
                                className={`${styles.introItem} ${styles.introItem4}`}
                            >
                                <BannerCard data={sections[2]} type={false} />
                            </div>
                            <div
                                className={`${styles.introItem} ${styles.introItem5}`}
                            >
                                <BannerCard data={sections[3]} type={false} />
                            </div>
                            <div
                                className={`${styles.introItem} ${styles.introItem6}`}
                            >
                                <BannerCard data={sections[7]} type={false} />
                            </div>
                            <div
                                className={`${styles.introItem} ${styles.introItem7}`}
                            >
                                <BannerCard data={sections[6]} type={false} />
                            </div>
                            <div
                                className={`${styles.introItem} ${styles.introItem8}`}
                            >
                                <BannerCard data={sections[5]} type={false} />
                            </div>
                            <div
                                className={`${styles.introItem} ${styles.introItem9}`}
                            >
                                <BannerCard data={sections[8]} type={false} />
                            </div>
                        </div>
                    </div>
                    <UrgentNewsStrip strips={strips} />
                    <Box mb={2} mt={2} width="1170px" ml="auto" mr="auto">
                        <Slider slidesPerView={6} spaceBetween={10}>
                            {files.map((file) => (
                                <SwiperSlide
                                    className="file-container"
                                    key={file.file_id}
                                >
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
                                </SwiperSlide>
                            ))}
                        </Slider>
                    </Box>
                    <div className={styles.swiper}>
                        <div className="container">
                            <div className="author-title">
                                <h1>
                                    <span>الاخبار الاكثر قراءة</span>
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
