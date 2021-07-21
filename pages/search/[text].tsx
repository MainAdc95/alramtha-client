import { useRouter } from "next/router";
import { INews } from "../../types/news";
import HeadLayout from "../../components/headLayout";
import useSWR from "swr";
import { GetServerSideProps } from "next";
import { IFile } from "../../types/file";
import Pagination from "@material-ui/lab/Pagination";
import { Box, CircularProgress, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";

// Components
import LargeNews from "../../components/news/largeNews";
import SideBar from "../../components/sideBar";
import { apiCall } from "../../utils/apiCall";

// style sheet
import styles from "../../styles/Section.module.scss";

// icons
import SearchIcon from "@material-ui/icons/Search";

const Search = () => {
    const router = useRouter();
    const [state, setState] = useState({
        search: "",
        activeSearch: router.query.text,
    });
    const rowsPerPage = 20;
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const { data } = useSWR<{ results: number; news: INews[] }>(
        `/news?p=${page}&r=${rowsPerPage}&type=published&text=${state.activeSearch}`
    );

    useEffect(() => {
        setState({
            ...state,
            activeSearch: String(router.query.text),
            search: String(router.query.text),
        });
    }, []);

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

    // __________________________ search
    const handleSearch = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const searchCall = async () => {
        if (state.search) {
            setState({ ...state, activeSearch: state.search });
        }
    };

    return (
        <>
            <HeadLayout title={String(router.query.text)} />
            <div className={styles.page}>
                <div className={styles.mainContent}>
                    <Box mb={5} display="flex">
                        <Box
                            onClick={searchCall}
                            style={{
                                minHeight: "100%",
                                width: "50px",
                                background: "rgb(2, 135, 254)",
                                borderRadius: "0 5px 5px 0",
                                cursor: "pointer",
                            }}
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            <SearchIcon style={{ color: "white" }} />
                        </Box>
                        <TextField
                            value={state.search}
                            label="بحث"
                            name="search"
                            onChange={handleSearch}
                            fullWidth
                            variant="outlined"
                        />
                    </Box>
                    <Pagination
                        onChange={handleChangePage}
                        count={count}
                        page={page}
                        shape="rounded"
                        color="primary"
                    />
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
                </div>
                <div className={styles.sidebar}>
                    <SideBar />
                </div>
            </div>
        </>
    );
};

export default Search;
