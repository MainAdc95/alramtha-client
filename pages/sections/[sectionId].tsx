import { useRouter } from "next/router";
import { INews } from "../../types/news";
import HeadLayout from "../../components/headLayout";
import useSWR from "swr";
import { GetServerSideProps } from "next";
import { ISection } from "../../types/section";
import Pagination from "@material-ui/lab/Pagination";
import { CircularProgress, Box } from "@material-ui/core";
import { useEffect, useState } from "react";

// Components
import LargeNews from "../../components/news/largeNews";
import SideBar from "../../components/sideBar";
import { apiCall } from "../../utils/apiCall";

// style sheet
import styles from "../../styles/Section.module.scss";
import GoogleAds from "../../components/googleAds";

interface IProps {
    section: ISection;
}

const Section = ({ section }: IProps) => {
    const router = useRouter();
    const rowsPerPage = 20;
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const { data } = useSWR<{ results: number; news: INews[] }>(
        `/news?p=${page}&r=${rowsPerPage}&type=published&sectionId=${section.section_id}`
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
            <HeadLayout title={section.section_name} />
            <div className={styles.page}>
                <div className={styles.mainContent}>
                    <div className="author-title">
                        <h1>
                            <span style={{ borderColor: section.color }}>
                                {section.section_name}
                            </span>
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
                    <Box mb={2}>
                        <Pagination
                            onChange={handleChangePage}
                            count={count}
                            page={page}
                            shape="rounded"
                            color="primary"
                        />
                    </Box>
                    <GoogleAds />
                </div>
                <div className={styles.sidebar}>
                    <SideBar />
                </div>
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const section = await apiCall("get", `/section/${ctx.params.sectionId}`);

    return {
        props: {
            section,
        },
    };
};

export default Section;
