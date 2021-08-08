import { useRouter } from "next/router";
import HeadLayout from "../../components/headLayout";
import useSWR from "swr";
import { GetServerSideProps } from "next";
import { IArticle } from "../../types/article";
import Pagination from "@material-ui/lab/Pagination";
import { Box, CircularProgress } from "@material-ui/core";
import { useEffect, useState } from "react";

// Components
import ArticleItem from "../../components/articles/articleItem";
import SideBar from "../../components/sideBar";
import { apiCall } from "../../utils/apiCall";

// style sheet
import styles from "../../styles/Section.module.scss";
import GoogleAds from "../../components/googleAds";

const Article = () => {
    const router = useRouter();
    const rowsPerPage = 20;
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const { data } = useSWR<{ results: number; articles: IArticle[] }>(
        `/articles?p=${page}&r=${rowsPerPage}&type=published`
    );

    useEffect(() => {
        setPage(1);
    }, [router.asPath]);

    useEffect(() => {
        if (data) {
            setCount(Math.ceil(data.results / rowsPerPage));
        }
    }, [data]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <>
            <HeadLayout title="كتاب وآراء" />
            <div className={styles.page}>
                <div className={styles.mainContent}>
                    <div className="author-title">
                        <h1>
                            <span style={{ borderColor: "rgb(1, 224, 1)" }}>
                                كتاب وآراء
                            </span>
                        </h1>
                    </div>
                    {!data ? (
                        <div className={styles.loadingContainer}>
                            <CircularProgress color="primary" />
                        </div>
                    ) : (
                        <div className={styles.newsList}>
                            {data?.articles.map((item) => (
                                <div key={item.article_id}>
                                    <ArticleItem article={item} />
                                </div>
                            ))}
                        </div>
                    )}
                    <Pagination
                        onChange={handleChangePage}
                        count={count}
                        page={page}
                        shape="rounded"
                        color="primary"
                    />
                    <Box mt={2}>
                        <GoogleAds />
                    </Box>
                </div>
                <div className={styles.sidebar}>
                    <SideBar />
                </div>
            </div>
        </>
    );
};

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//     const article = await apiCall("get", `/article/${ctx.params.articleId}`);

//     return {
//         props: {
//             article,
//         },
//     };
// };

export default Article;
