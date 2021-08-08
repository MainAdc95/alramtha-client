import { useRouter } from "next/router";
import { INews } from "../../types/news";
import HeadLayout from "../../components/headLayout";
import useSWR from "swr";
import { GetServerSideProps } from "next";
import { IFile } from "../../types/file";
import Pagination from "@material-ui/lab/Pagination";
import { CircularProgress, Box } from "@material-ui/core";
import React, { useEffect, useState } from "react";

// Components
import LargeNews from "../../components/news/largeNews";
import SideBar from "../../components/sideBar";
import { apiCall } from "../../utils/apiCall";

// style sheet
import styles from "../../styles/Section.module.scss";
import GoogleAds from "../../components/googleAds";

interface IProps {
    file: IFile;
}

const File = ({ file }: IProps) => {
    const router = useRouter();
    const rowsPerPage = 20;
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const { data } = useSWR<{ results: number; news: INews[] }>(
        `/news?p=${page}&r=${rowsPerPage}&type=published&fileId=${file.file_id}`
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
            <HeadLayout title={file.text} />
            <div className={styles.page}>
                <div className={styles.mainContent}>
                    <div className="author-title">
                        <h1>
                            <span>{file.text}</span>
                        </h1>
                    </div>
                    {!data ? (
                        <div className={styles.loadingContainer}>
                            <CircularProgress color="primary" />
                        </div>
                    ) : (
                        <div className={styles.newsList}>
                            {data?.news.map((item) => (
                                <div key={item.news_id}>
                                    <LargeNews news={item} />
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const file = await apiCall("get", `/file/${ctx.params.fileId}`);

    return {
        props: {
            file,
        },
    };
};

export default File;
