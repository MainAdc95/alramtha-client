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
import { IArticle } from "../../../types/article";
import { mutate } from "swr";
import { apiCall } from "../../../utils/apiCall";
import { useSelector } from "react-redux";
import { RootReducer } from "../../../store/reducers";
import useSWR from "swr";

// components
import ArticleItem from "./articleItem";
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

const ArticleList = () => {
    const classes = useStyles();
    const user = useSelector((state: RootReducer) => state.auth.user);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const [isPublish, setPublish] = useState<IArticle | null>(null);
    const [value, setValue] = useState(0);
    const { data, error, isValidating } = useSWR<{
        results: number;
        articles: IArticle[];
    }>(
        `/articles?p=${page + 1}&r=${rowsPerPage}&type=${
            value === 0 ? "published" : value === 1 ? "draft" : "archived"
        }`
    );
    const [isDel, setDel] = useState<IArticle | null>(null);
    const [delLoading, setDelLoading] = useState(false);
    const [publishLoading, setPublishLoading] = useState(false);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    // archive
    const [isArch, setArch] = useState<IArticle | null>(null);
    const [archiveLoading, setArchiveLoading] = useState(false);

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpenDel = (article: IArticle) => {
        setDel(article);
    };

    const handleCloseDel = () => {
        setDel(null);
    };

    const togglePublish = (article?: IArticle) => {
        if (isPublish) {
            return setPublish(null);
        }

        setPublish(article);
    };

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const handleDelete = async () => {
        try {
            setDelLoading(true);
            await apiCall(
                "delete",
                `/articles/${isDel.article_id}?authId=${user.user_id}`
            );

            mutate(
                `/articles?p=${page + 1}&r=${rowsPerPage}&type=${
                    value === 0
                        ? "published"
                        : value === 1
                        ? "draft"
                        : "archived"
                }`,
                (data: { articles: IArticle[] }) => {
                    return {
                        ...data,
                        articles: data.articles.filter(
                            (p) => p.article_id !== isDel.article_id
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
                `/articles/publish_article/${isPublish.article_id}?authId=${user.user_id}`
            );

            mutate(
                `/articles?p=${page + 1}&r=${rowsPerPage}&type=${
                    value === 0
                        ? "published"
                        : value === 1
                        ? "draft"
                        : "archived"
                }`
            );

            togglePublish();
        } catch (err) {
        } finally {
            setPublishLoading(false);
        }
    };

    // ___________________________________ archive
    const toggleArchive = (article?: IArticle) => {
        if (isArch) {
            return setArch(null);
        }

        setArch(article);
    };

    const handleArchive = async () => {
        try {
            setArchiveLoading(true);
            await apiCall(
                "put",
                `/articles/archive/${isArch.article_id}?authId=${user.user_id}`
            );

            mutate(
                `/articles?p=${page + 1}&r=${rowsPerPage}&type=${
                    value === 0
                        ? "published"
                        : value === 1
                        ? "draft"
                        : "archived"
                }`,
                (data: { articles: IArticle[] }) => {
                    return {
                        ...data,
                        articles: data.articles.filter(
                            (p) => p.article_id !== isArch.article_id
                        ),
                    };
                }
            );

            toggleArchive();
        } catch (err) {
            console.log(err);
        } finally {
            setArchiveLoading(false);
        }
    };

    if (error) return <p>An error has occured while fetching article.</p>;
    else if (!data) return <p>Loading...</p>;
    return (
        <>
            <Box mb={3}>
                <Tabs value={value} onChange={handleChange} variant="fullWidth">
                    <Tab label="المقالات المنشورة" {...a11yProps(0)} />
                    <Tab label="مسودة المقالات" {...a11yProps(1)} />
                    <Tab label="المقالات المحذوفة" {...a11yProps(2)} />
                </Tabs>
            </Box>
            {!data.articles?.length ? (
                <p>لم يتم العثور على المقالات</p>
            ) : (
                <>
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
                                        عنوان المقالة
                                    </TableCell>
                                    <TableCell className={classes.mediumCell}>
                                        صورة
                                    </TableCell>
                                    <TableCell className={classes.smallCell}>
                                        نشرت
                                    </TableCell>
                                    <TableCell className={classes.smallCell}>
                                        أنشئت في
                                    </TableCell>
                                    <TableCell className={classes.smallCell}>
                                        تم الأنشاء بواسطة
                                    </TableCell>
                                    <TableCell className={classes.smallCell}>
                                        تم التحديث في
                                    </TableCell>
                                    <TableCell className={classes.smallCell}>
                                        تم التحديث بواسطة
                                    </TableCell>
                                    <TableCell style={{ minWidth: "50px" }}>
                                        أجراءات
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.articles.map((article) => (
                                    <ArticleItem
                                        key={article.article_id}
                                        article={article}
                                        handleOpenDel={handleOpenDel}
                                        handleOpenPublish={togglePublish}
                                        toggleArchive={toggleArchive}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 50, 100]}
                        component="div"
                        count={data.results}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        labelRowsPerPage="صفوف لكل صفحة:"
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </>
            )}
            {isDel && (
                <ActionModal
                    close={handleCloseDel}
                    title="حذف المقالة"
                    msg={`هل انت متاكد انك تريد مسح ${isDel.title}؟`}
                    handler={handleDelete}
                    loading={delLoading}
                />
            )}
            {isArch && (
                <ActionModal
                    close={toggleArchive}
                    title="حذف المقالة"
                    msg={`هل انت متاكد انك تريد مسح ${isArch.title}؟`}
                    handler={handleArchive}
                    loading={archiveLoading}
                />
            )}
            {isPublish && (
                <ActionModal
                    close={togglePublish}
                    btnIcon={<CheckIcon />}
                    type="confirmation"
                    btnTxt="نشر"
                    title="نشر المقالة"
                    msg={`هل انت متاكد انك تريد نشر  ${isPublish.title}؟`}
                    handler={handlePublish}
                    loading={publishLoading}
                />
            )}
        </>
    );
};

export default ArticleList;
