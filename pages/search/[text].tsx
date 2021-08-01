import { useRouter } from "next/router";
import { INews } from "../../types/news";
import HeadLayout from "../../components/headLayout";
import useSWR from "swr";
import Pagination from "@material-ui/lab/Pagination";
import { Box, CircularProgress, TextField } from "@material-ui/core";
import { useEffect, useState } from "react";

// Components
import LargeNews from "../../components/news/largeNews";
import SideBar from "../../components/sideBar";

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
    const { data, error } = useSWR<{ results: number; news: INews[] }>(
        `/news?p=${page}&r=${rowsPerPage}&type=published&text=${state.activeSearch}`
    );

    useEffect(() => {
        setState({
            ...state,
            activeSearch: String(router.query.text),
            search: String(router.query.text),
        });
    }, [router.query]);

    useEffect(() => {
        setPage(1);
    }, [router.asPath]);

    useEffect(() => {
        if (data) {
            setCount(Math.ceil(data.results / rowsPerPage));
        }
    }, [data]);

    const handleChangePage = (event, newPage) => {
        window.scrollTo(0, 0);
        setPage(newPage);
    };

    // __________________________ search
    const handleSearch = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const searchCall = () => {
        if (state.search) {
            router.push(`/search/${state.search}`, null, { shallow: true });
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
                            onKeyDown={(e: any) => {
                                if (e.keyCode === 13) {
                                    searchCall();
                                }
                            }}
                            fullWidth
                            variant="outlined"
                        />
                    </Box>
                    {error ? (
                        <p>حدث خطأ اثناء احتميل الأخر.</p>
                    ) : !data ? (
                        <div className={styles.loadingContainer}>
                            <CircularProgress color="primary" />
                        </div>
                    ) : !data.news.length ? (
                        <p>لم يتم العثور على اي معلومات.</p>
                    ) : (
                        <>
                            <div className={styles.newsList}>
                                {data?.news.map((item) => (
                                    <div key={item.news_id}>
                                        <LargeNews news={item} />
                                    </div>
                                ))}
                            </div>
                            <Pagination
                                onChange={handleChangePage}
                                count={count}
                                page={page}
                                shape="rounded"
                                color="primary"
                            />
                        </>
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
