import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {
    TablePagination,
    LinearProgress,
    Tabs,
    Tab,
    Box,
} from "@material-ui/core";
import { useState } from "react";
import { INews } from "../../../types/news";
import { mutate } from "swr";
import { apiCall } from "../../../utils/apiCall";
import { useSelector } from "react-redux";
import { RootReducer } from "../../../store/reducers";
import useSWR from "swr";

// components
import NewsItem from "./newsItem";
import ActionModal from "../actionModal";

// icons
import CheckIcon from "@material-ui/icons/Check";

function a11yProps(index: any) {
    return {
        id: `${index}`,
        "aria-controls": `${index}`,
    };
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        tableContainer: {
            boxShadow: theme.shadows[5],
            width: "100%",
            position: "relative",
        },
        mediumCell: {
            minWidth: "250px",
            maxWidth: "250px",
        },
        smallCell: {
            minWidth: "150px",
        },
        loading: {
            position: "absolute",
            left: 0,
            top: 0,
            width: "100%",
        },
    })
);

const NewsList = () => {
    const classes = useStyles();
    const user = useSelector((state: RootReducer) => state.auth.user);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [isPublish, setPublish] = useState<INews | null>(null);
    const [value, setValue] = useState(0);
    const { data, error, isValidating } = useSWR<{
        results: number;
        news: INews[];
    }>(
        `/news?p=${page + 1}&r=${rowsPerPage}&type=${
            value === 0 ? "published" : "draft"
        }`
    );
    const [isDel, setDel] = useState<INews | null>(null);
    const [delLoading, setDelLoading] = useState(false);
    const [publishLoading, setPublishLoading] = useState(false);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpenDel = (news: INews) => {
        setDel(news);
    };

    const handleCloseDel = () => {
        setDel(null);
    };

    const togglePublish = (news?: INews) => {
        if (isPublish) {
            return setPublish(null);
        }

        setPublish(news);
    };

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const handleDelete = async () => {
        try {
            setDelLoading(true);
            await apiCall(
                "delete",
                `/news/${isDel.news_id}?authId=${user.user_id}`
            );

            mutate(
                `/news?p=${page + 1}&r=${rowsPerPage}&type=${
                    value === 0 ? "published" : "draft"
                }`,
                (data: { news: INews[] }) => {
                    return {
                        ...data,
                        news: data.news.filter(
                            (p) => p.news_id !== isDel.news_id
                        ),
                    };
                }
            );

            setDelLoading(false);
            handleCloseDel();
        } catch (err) {
            setDelLoading(false);
        }
    };

    const handlePublish = async () => {
        try {
            setPublishLoading(true);

            await apiCall(
                "put",
                `/news/publish_news/${isPublish.news_id}?authId=${user.user_id}`
            );

            mutate(
                `/news?p=${page + 1}&r=${rowsPerPage}&type=${
                    value === 0 ? "published" : "draft"
                }`
            );

            togglePublish();
        } catch (err) {
        } finally {
            setPublishLoading(false);
        }
    };

    if (error) return <p>An error has occured while fetching news.</p>;
    else if (!data) return <p>Loading...</p>;
    return (
        <>
            <Box mb={3}>
                <Tabs value={value} onChange={handleChange} variant="fullWidth">
                    <Tab label="Published" {...a11yProps(0)} />
                    <Tab label="Draft" {...a11yProps(1)} />
                </Tabs>
            </Box>
            {!data.news?.length ? (
                <p>There were no news found.</p>
            ) : (
                <>
                    {" "}
                    <TableContainer
                        className={classes.tableContainer}
                        component={Paper}
                    >
                        <Table>
                            {isValidating && (
                                <div className={classes.loading}>
                                    <LinearProgress />
                                </div>
                            )}
                            <TableHead>
                                <TableRow>
                                    <TableCell className={classes.smallCell}>
                                        Title
                                    </TableCell>
                                    <TableCell className={classes.mediumCell}>
                                        Image
                                    </TableCell>
                                    <TableCell className={classes.smallCell}>
                                        Published
                                    </TableCell>
                                    <TableCell className={classes.smallCell}>
                                        Created at
                                    </TableCell>
                                    <TableCell className={classes.smallCell}>
                                        Created by
                                    </TableCell>
                                    <TableCell className={classes.smallCell}>
                                        Updated at
                                    </TableCell>
                                    <TableCell className={classes.smallCell}>
                                        Updated by
                                    </TableCell>
                                    <TableCell style={{ minWidth: "50px" }}>
                                        Actions
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.news.map((news) => (
                                    <NewsItem
                                        key={news.news_id}
                                        news={news}
                                        handleOpenDel={handleOpenDel}
                                        handleOpenPublish={togglePublish}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 50, 100]}
                        component="div"
                        count={data.news.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </>
            )}
            {isDel && (
                <ActionModal
                    close={handleCloseDel}
                    title="Delete news"
                    msg={`Are you sure you want to delete ${isDel.title} ?`}
                    handler={handleDelete}
                    loading={delLoading}
                />
            )}
            {isPublish && (
                <ActionModal
                    close={togglePublish}
                    btnIcon={<CheckIcon />}
                    type="confirmation"
                    btnTxt="publish"
                    title="Publish news"
                    msg={`Are you sure you want to publish ${isPublish.title} ?`}
                    handler={handlePublish}
                    loading={publishLoading}
                />
            )}
        </>
    );
};

export default NewsList;
