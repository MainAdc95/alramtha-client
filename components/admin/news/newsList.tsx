import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Pagination } from "@material-ui/lab";
import { LinearProgress, Tabs, Tab, Box } from "@material-ui/core";
import { useState, useEffect } from "react";
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
import TransformIcon from "@material-ui/icons/Transform";

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

interface IProps {
    filters: any;
    query: string;
    handleStatus: any;
}

const NewsList = ({ filters, handleStatus, query }: IProps) => {
    const classes = useStyles();
    const user = useSelector((state: RootReducer) => state.auth.user);
    const [isPublish, setPublish] = useState<INews | null>(null);
    const [transArtic, setTransArtic] = useState<INews | null>(null);
    const [value, setValue] = useState(0);
    const rowsPerPage = 20;
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const { data, error, isValidating } = useSWR<{
        results: number;
        news: INews[];
    }>(
        `/news?isAdmin=true&p=${page}&r=${rowsPerPage}${
            filters.section ? `&sectionId=${filters.section.section_id}` : ""
        }&order=${filters.order === "الأحدث" ? "desc" : "asc"}${
            filters.search ? `&text=${filters.search}` : ""
        }&type=${
            value === 0 ? "published" : value === 1 ? "draft" : "archived"
        }`
    );
    const [isDel, setDel] = useState<INews | null>(null);
    const [delLoading, setDelLoading] = useState(false);
    const [publishLoading, setPublishLoading] = useState(false);
    const [transArticLoading, setTransArticLoading] = useState(false);
    // archive
    const [isArch, setArch] = useState<INews | null>(null);
    const [archiveLoading, setArchiveLoading] = useState(false);

    useEffect(() => {
        switch (filters.status) {
            case "published":
                setValue(0);
                break;
            case "draft":
                setValue(1);
                break;
            case "deleted":
                setValue(2);
                break;
            default:
                break;
        }
    }, []);

    useEffect(() => {
        if (data) {
            setCount(Math.ceil(data.results / rowsPerPage));
        }
    }, [data]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
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

    const toggleTransArtic = (news?: INews) => {
        if (transArtic) {
            return setTransArtic(null);
        }

        setTransArtic(news);
    };

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        switch (newValue) {
            case 0:
                handleStatus("published");
                break;
            case 1:
                handleStatus("draft");
                break;
            case 2:
                handleStatus("deleted");
                break;
            default:
                break;
        }

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
                `/news?isAdmin=true&p=${page}&r=${rowsPerPage}${
                    filters.section
                        ? `&sectionId=${filters.section.section_id}`
                        : ""
                }&order=${filters.order === "الأحدث" ? "desc" : "asc"}${
                    filters.search ? `&text=${filters.search}` : ""
                }&type=${
                    value === 0
                        ? "published"
                        : value === 1
                        ? "draft"
                        : "archived"
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

    const handleTransArtic = async () => {
        try {
            setTransArticLoading(true);
            await apiCall(
                "post",
                `/news/${transArtic.news_id}/transform_article?authId=${user.user_id}`
            );

            mutate(
                `/news?isAdmin=true&p=${page}&r=${rowsPerPage}${
                    filters.section
                        ? `&sectionId=${filters.section.section_id}`
                        : ""
                }&order=${filters.order === "الأحدث" ? "desc" : "asc"}${
                    filters.search ? `&text=${filters.search}` : ""
                }&type=${
                    value === 0
                        ? "published"
                        : value === 1
                        ? "draft"
                        : "archived"
                }`,
                (data: { news: INews[] }) => {
                    return {
                        ...data,
                        news: data.news.filter(
                            (p) => p.news_id !== transArtic.news_id
                        ),
                    };
                }
            );

            setTransArticLoading(false);
            toggleTransArtic();
        } catch (err) {
            setTransArticLoading(false);
        }
    };

    // ___________________________________ archive
    const toggleArchive = (news?: INews) => {
        if (isArch) {
            return setArch(null);
        }

        setArch(news);
    };

    const handleArchive = async () => {
        try {
            setArchiveLoading(true);
            await apiCall(
                "put",
                `/news/archive/${isArch.news_id}?authId=${user.user_id}`
            );

            mutate(
                `/news?isAdmin=true&p=${page}&r=${rowsPerPage}${
                    filters.section
                        ? `&sectionId=${filters.section.section_id}`
                        : ""
                }&order=${filters.order === "الأحدث" ? "desc" : "asc"}${
                    filters.search ? `&text=${filters.search}` : ""
                }&type=${
                    value === 0
                        ? "published"
                        : value === 1
                        ? "draft"
                        : "archived"
                }`,
                (data: { news: INews[] }) => {
                    return {
                        ...data,
                        news: data.news.filter(
                            (p) => p.news_id !== isArch.news_id
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

    const handlePublish = async () => {
        try {
            setPublishLoading(true);

            await apiCall(
                "put",
                `/news/publish_news/${isPublish.news_id}?authId=${user.user_id}`
            );

            mutate(
                `/news?isAdmin=true&p=${page}&r=${rowsPerPage}${
                    filters.section
                        ? `&sectionId=${filters.section.section_id}`
                        : ""
                }&order=${filters.order === "الأحدث" ? "desc" : "asc"}${
                    filters.search ? `&text=${filters.search}` : ""
                }&type=${
                    value === 0
                        ? "published"
                        : value === 1
                        ? "draft"
                        : "archived"
                }`
            );

            togglePublish();
        } catch (err) {
            console.log(err);
        } finally {
            setPublishLoading(false);
        }
    };

    if (error) return <p>لقد حدث خطأ أثناء تحميل الأخبار.</p>;
    else if (!data) return <p>جار التحميل...</p>;
    return (
        <>
            <Box mb={3}>
                <Tabs value={value} onChange={handleChange} variant="fullWidth">
                    <Tab label="الاخبار المنشورة" {...a11yProps(0)} />
                    <Tab label="مسودة الاخبار" {...a11yProps(1)} />
                    <Tab label="الاخبار المحذوفة" {...a11yProps(2)} />
                </Tabs>
            </Box>
            {!data.news?.length ? (
                <p>لم يتم العثور على اي أخبار.</p>
            ) : (
                <>
                    <Box display="flex" mb={4}>
                        <Pagination
                            color="secondary"
                            onChange={handleChangePage}
                            page={page}
                            count={count}
                        />
                    </Box>
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
                                        عنوان الخبر
                                    </TableCell>
                                    <TableCell className={classes.mediumCell}>
                                        عدد القراء
                                    </TableCell>
                                    <TableCell className={classes.mediumCell}>
                                        صورة
                                    </TableCell>
                                    <TableCell className={classes.mediumCell}>
                                        القسم
                                    </TableCell>
                                    <TableCell className={classes.smallCell}>
                                        تاريخ الانشاء
                                    </TableCell>
                                    <TableCell className={classes.smallCell}>
                                        انشئت بواسطة
                                    </TableCell>
                                    <TableCell className={classes.smallCell}>
                                        تاريخ التحديث
                                    </TableCell>
                                    <TableCell className={classes.smallCell}>
                                        حدثت بواسطة
                                    </TableCell>
                                    <TableCell style={{ minWidth: "50px" }}>
                                        أجراءات
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.news.map((news) => (
                                    <NewsItem
                                        key={news.news_id}
                                        news={news}
                                        handleOpenDel={handleOpenDel}
                                        toggleArchive={toggleArchive}
                                        handleOpenPublish={togglePublish}
                                        query={query}
                                        toggleTransArtic={toggleTransArtic}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Box display="flex" mt={4}>
                        <Pagination
                            color="secondary"
                            onChange={handleChangePage}
                            page={page}
                            count={count}
                        />
                    </Box>
                </>
            )}
            {isDel && (
                <ActionModal
                    close={handleCloseDel}
                    title="حذف الخبر"
                    msg={`هل انت متاكد انك تريد مسح ${isDel.title}؟`}
                    handler={handleDelete}
                    loading={delLoading}
                />
            )}
            {isArch && (
                <ActionModal
                    close={toggleArchive}
                    title="حذف الخبر"
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
                    title="نشر الخبر"
                    msg={`هل انت متاكد انك تريد نشر  ${isPublish.title}؟`}
                    handler={handlePublish}
                    loading={publishLoading}
                />
            )}
            {transArtic && (
                <ActionModal
                    close={toggleTransArtic}
                    btnIcon={<TransformIcon />}
                    type="confirmation"
                    btnTxt="تحويل"
                    title="تحويل الخبر الى مقالة"
                    msg={`هل انت متاكد انك تريد تحويل  (${transArtic.title}) الى مقالة؟`}
                    handler={handleTransArtic}
                    loading={transArticLoading}
                />
            )}
        </>
    );
};

export default NewsList;
