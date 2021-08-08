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
import Link from "next/link";
import ImageOpt from "../imageOpt";

const ArticleList = () => {
    const router = useRouter();
    const rowsPerPage = 4;
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
        <div style={{ marginTop: "30px" }} className={styles.mainContent}>
            <div className="author-title">
                <h1>
                    <span
                        style={{
                            borderColor: `rgb(1, 224, 1)`,
                        }}
                    >
                        <Link href={`/articles`}>
                            <a>
                                <ImageOpt
                                    src="/next.svg"
                                    location="local"
                                    width={20}
                                    height={20}
                                />
                                <strong>كتاب وآراء</strong>
                            </a>
                        </Link>
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
    );
};

export default ArticleList;
