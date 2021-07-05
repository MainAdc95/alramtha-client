// Main
import Link from "next/link";
import Image from "next/image";
// impoer ImageOpt from "./imageOpt";
import SmallNews from "./news/smallNews";
import { Box, Grid } from "@material-ui/core";
import { small_3, categories, fleckr } from "../utils/seeds";
import useSWR from "swr";

// Styles
import styles from "../styles/Footer.module.scss";
import ImageOpt from "./imageOpt";
import { ITag } from "../types/tag";
import { INews } from "../types/news";

const Footer = () => {
    const { data, error, isValidating } =
        useSWR<{
            results: number;
            tags: ITag[];
        }>(`/tags?p=1&r=10`);
    const { data: news } = useSWR<{
        results: number;
        news: INews[];
    }>("/news?p=1&r=3&type=published");

    const tagNews = (tag_id) => {
        if (news) {
            const tempState = [];
            const find = news.news.map((n) => {
                n.tags.map((i) => {
                    if (i.tag_id === tag_id) tempState.push(tag_id);
                });
            });

            return tempState.length;
        }
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <Box mt="25px">
                    <Grid container className="grid-root">
                        <Grid item xs={12} md={4}>
                            <div className={styles.footerItem}>
                                <Box
                                    mt="25px"
                                    mb="30px"
                                    display="flex"
                                    justifyContent="flex-start"
                                >
                                    <div
                                        style={{
                                            position: "relative",
                                            height: "150px",
                                            width: "150px",
                                        }}
                                    >
                                        <ImageOpt
                                            src="/logo.svg"
                                            layout="fill"
                                            location="local"
                                            objectFit="cover"
                                        />
                                    </div>{" "}
                                </Box>
                                <Box
                                    mb="25px"
                                    height="80px"
                                    display="flex"
                                    flexDirection="column"
                                    alignItems="flex-start"
                                    justifyContent="space-between"
                                >
                                    <p style={{ color: "white" }}>
                                        أدخل عنوان بريدك الإلكتروني لتلقي
                                        التحديثات اليومية
                                    </p>

                                    <input
                                        style={{ width: "90%" }}
                                        className="form-input"
                                    />
                                </Box>
                            </div>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <div className={styles.footerItem}>
                                <h2 className={styles.footerTitle}>القائمة</h2>

                                <div className={styles.hotCategories}>
                                    <ul>
                                        {data &&
                                            data.tags.map((i) => (
                                                <Link
                                                    href={`/tags/${i.tag_id}`}
                                                    key={i.tag_id}
                                                >
                                                    <li>
                                                        <a>{i.tag_name}</a>
                                                        <span>
                                                            ({tagNews(i.tag_id)}
                                                            )
                                                        </span>
                                                    </li>
                                                </Link>
                                            ))}
                                    </ul>
                                </div>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <div className={styles.footerItem}>
                                <h2 className={styles.footerTitle}>
                                    الاكثر قراءة
                                </h2>

                                <div className={styles.randomNews}>
                                    <ul>
                                        {news &&
                                            news.news.map((item) => (
                                                <SmallNews
                                                    key={item.news_id}
                                                    data={item}
                                                />
                                            ))}
                                    </ul>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </Box>

                <div className={styles.bottomFooter}>
                    <Grid container className="grid-root">
                        <Grid item xs={12} sm={6}>
                            <p>
                                © Copyright - alramsah.com. All Rights Reserved
                            </p>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <ul>
                                <Link href="/contactUs">
                                    <li>تواصل معنا</li>
                                </Link>{" "}
                                <Link href="/">
                                    <li>الصفحة الرأيسية</li>
                                </Link>
                            </ul>
                        </Grid>
                    </Grid>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
