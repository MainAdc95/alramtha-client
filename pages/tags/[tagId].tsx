import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { apiCall } from "../../utils/apiCall";
import { INews } from "../../types/news";
import useSWR from "swr";
import HeadLayout from "../../components/headLayout";
import { ITag } from "../../types/tag";
import Pagination from "@material-ui/lab/Pagination";
import { CircularProgress } from "@material-ui/core";
import { useEffect, useState } from "react";
import { IArticle } from "../../types/article";

// Components
import LargeNews from "../../components/news/largeNews";
import SideBar from "../../components/sideBar";
import ArticleItem from "../../components/articles/articleItem";

// style sheet
import styles from "../../styles/Section.module.scss";

interface IProps {
    tag: ITag;
}

const Tags = ({ tag }: IProps) => {
    const router = useRouter();
    const nRowsPerPage = 20;
    const [nPage, setNpage] = useState(1);
    const [nCount, setNcount] = useState(0);
    const { data: nData } = useSWR<{ results: number; news: INews[] }>(
        `/news?p=${nPage}&r=${nRowsPerPage}&type=published&tag=${router.query.tagId}`
    );
    // article
    const aRowsPerPage = 20;
    const [aPage, setApage] = useState(1);
    const [aCount, setAcount] = useState(0);
    const { data: aData } = useSWR<{ results: number; articles: IArticle[] }>(
        `/articles?p=${nPage}&r=${aRowsPerPage}&type=published&tag=${router.query.tagId}`
    );

    useEffect(() => {
        setNpage(1);
    }, [router.asPath]);

    useEffect(() => {
        if (nData) {
            setNcount(Math.ceil(nData.results / nRowsPerPage));
        }
    }, [nData]);

    const handleChangeNpage = (event, newPage) => {
        setNpage(newPage);
    };

    useEffect(() => {
        if (aData) {
            setAcount(Math.ceil(aData.results / aRowsPerPage));
        }
    }, [aData]);

    const handleChangeApage = (event, newPage) => {
        setApage(newPage);
    };

    return (
        <>
            <HeadLayout title={tag.tag_name} />
            <div className={styles.page}>
                <div className={styles.mainContent}>
                    <div className="author-title">
                        <h1>
                            <span>{tag.tag_name} (اخبار)</span>
                        </h1>
                    </div>
                    {!nData ? (
                        <div className={styles.loadingContainer}>
                            <CircularProgress color="primary" />
                        </div>
                    ) : (
                        <div className={styles.newsList}>
                            {nData?.news.map((item) => (
                                <div key={item.news_id}>
                                    <LargeNews news={item} />
                                </div>
                            ))}
                        </div>
                    )}
                    <Pagination
                        onChange={handleChangeNpage}
                        count={nCount}
                        page={nPage}
                        shape="rounded"
                        color="primary"
                    />
                    <div style={{ marginTop: "50px" }} className="author-title">
                        <h1>
                            <span>{tag.tag_name} (مقالات)</span>
                        </h1>
                    </div>
                    {!aData ? (
                        <div className={styles.loadingContainer}>
                            <CircularProgress color="primary" />
                        </div>
                    ) : (
                        <div className={styles.newsList}>
                            {aData?.articles.map((item) => (
                                <div key={item.article_id}>
                                    <ArticleItem article={item} />
                                </div>
                            ))}
                        </div>
                    )}
                    <Pagination
                        onChange={handleChangeApage}
                        count={aCount}
                        page={aPage}
                        shape="rounded"
                        color="primary"
                    />
                </div>
                <div className={styles.sidebar}>
                    <SideBar />
                </div>
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const tag = await apiCall("get", `/tag/${ctx.params.tagId}`);

    return {
        props: {
            tag,
        },
    };
};

export default Tags;
