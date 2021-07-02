// Main
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import Image from "next/image";
import { apiCall } from "../../utils/apiCall";
// import { getStaticProps, getStaticPath } from "next";
import parse from "html-react-parser";
import useSWR from "swr";

// Components
import Author from "../../components/news/author";
import ShareNews from "../../components/news/shareNews";
import SideBar from "../../components/sideBar";
import { Grid, Box } from "@material-ui/core";
import { small_4, swiper2 } from "../../utils/seeds"; // Delete this replace with IProps interface

// Styles
import styles from "../../styles/News.module.scss";

// interface IProps {
//     relatedNews: INews[];
//     news: INews;
//     tags: ICategory[];
// }
// {relatedNews, news, tags}
// PUT HERE-------!
//                !
//                !
const NewsPage = () => {
    const [news, setState] = useState(null);
    const router = useRouter();
    const { newsId } = router.query;

    useEffect(() => {
        if (swiper2) {
            const find = swiper2.find((i) => i.id === newsId);
            setState(find);
        }
    }, [newsId]);

    if (news)
        return (
            <>
                <div className={styles.page}>
                    <div className={`container ${styles.container}`}>
                        <Grid container className="grid-root">
                            <Grid item xs={12} md={8}>
                                <div className={styles.newsContent}>
                                    <div className={styles.newsHeading}>
                                        <h1>{news.title}</h1>
                                        <ul>
                                            <li>30 Nov, 2020</li>
                                            <li>by jane Smith</li>
                                            <li>news Num 0</li>
                                            <li>view 331</li>
                                        </ul>
                                    </div>

                                    <ShareNews />
                                    <Box width="100%">
                                        <div className={styles.newsImg}>
                                            <Image
                                                src={news.src}
                                                layout="fill"
                                            />
                                        </div>

                                        <blockquote
                                            className={styles.newsQoute}
                                        >
                                            <p>
                                                معدل المواليد في أستراليا بشكل
                                                حاد خلال العقود الأربعة المقبلة
                                                ، مما يؤدي إلى مشاكل وطنية إذا
                                                لم تعد الهجرة قوية
                                            </p>
                                        </blockquote>

                                        <Box width="100%" p="0 20px">
                                            <p style={{ marginBottom: "20px" }}>
                                                {/* {parse(news.content)} */}
                                                {news.text}
                                            </p>
                                        </Box>
                                        <div className={styles.newsTags}>
                                            <ul>
                                                <li>
                                                    <a>{news.category}</a>
                                                </li>
                                            </ul>
                                        </div>
                                        <ShareNews />
                                        <Box mt={3}>
                                            {/* <Author
                                                data={small_4}
                                                styles={styles}
                                            /> */}
                                        </Box>
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

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//     const info = await apiCall("get", `/homeInfo`);

//     return {
//         props: {
//             info,
//         },
//     };
// };

export default NewsPage;
