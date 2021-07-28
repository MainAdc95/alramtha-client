import {
    createStyles,
    makeStyles,
    Theme,
    CircularProgress,
} from "@material-ui/core";
import useSWR from "swr";
import { INews } from "../types/news";
import { ISection } from "../types/section";
import Pagination from "@material-ui/lab/Pagination";
import LargeNews from "./news/largeNews";
import { useEffect, useState } from "react";
import ImageOpt from "./imageOpt";

interface IProps {
    data: any;
}

const SectionNews = ({ data }: IProps) => {
    const classes = useStyles();

    return (
        <div style={{ marginBottom: "25px" }}>
            <div className="author-title">
                <h1>
                    <span
                        style={{
                            borderColor: `${data.color}`,
                        }}
                    >
                        {data.section_name}
                    </span>
                </h1>
            </div>
            <NewsList section={data} />
            <div className={classes.imgContainer}>
                <ImageOpt
                    src={"216927209_307535321123053_8884778464859107853_n.jpg"}
                />
            </div>
        </div>
    );
};

const NewsList = ({ section }: { section: ISection }) => {
    const classes = useStyles();
    const rowsPerPage = 4;
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [activeNews, setActiveNews] = useState<INews[]>([]);
    const { data } = useSWR<{ results: number; news: INews[] }>(
        `/news?p=${page}&r=${rowsPerPage}&type=published&sectionId=${section.section_id}`
    );

    useEffect(() => {
        if (data) {
            setCount(Math.ceil(data.results / rowsPerPage));
            setActiveNews(data.news);
        }
    }, [data]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <div className={classes.root}>
            {!activeNews ? (
                <div className={classes.loadingContainer}>
                    <CircularProgress color="primary" />
                </div>
            ) : (
                <div className={classes.list}>
                    {activeNews?.map((n) => (
                        <LargeNews key={n.news_id} news={n} />
                    ))}
                </div>
            )}
            {!data && (
                <div className={classes.loadingContainer}>
                    <CircularProgress color="primary" />
                </div>
            )}
            <Pagination
                onChange={handleChangePage}
                count={count}
                shape="rounded"
                color="primary"
            />
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginBottom: "30px",
            position: "relative",
        },
        list: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridGap: "20px",
            marginBottom: "20px",
            "@media screen and (max-width: 1000px)": {
                gridTemplateColumns: "1fr",
            },
            "@media screen and (max-width: 800px)": {
                gridTemplateColumns: "1fr 1fr",
            },
            "@media screen and (max-width: 550px)": {
                gridTemplateColumns: "1fr",
            },
        },
        loadingContainer: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        imgContainer: {
            position: "relative",
            width: "100%",
            height: "200px",
        },
    })
);

export default SectionNews;
