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
import { INewsLetter } from "../../../types/newsLetter";
import { mutate } from "swr";
import { apiCall } from "../../../utils/apiCall";
import { useSelector } from "react-redux";
import { RootReducer } from "../../../store/reducers";
import useSWR from "swr";

// components
import NewsLetterItem from "./newsLetterItem";
import ActionModal from "../actionModal";

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

const NewsLetterList = () => {
    const classes = useStyles();
    const user = useSelector((state: RootReducer) => state.auth.user);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const { data, error, isValidating } = useSWR<{
        results: number;
        newsLetter: INewsLetter[];
    }>(`/news_letter?p=${page + 1}&r=${rowsPerPage}&authId=${user.user_id}`);
    const [isDel, setDel] = useState<INewsLetter | null>(null);
    const [delLoading, setDelLoading] = useState(false);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpenDel = (newsLetter: INewsLetter) => {
        setDel(newsLetter);
    };

    const handleCloseDel = () => {
        setDel(null);
    };

    const handleDelete = async () => {
        try {
            setDelLoading(true);
            await apiCall(
                "delete",
                `/news_letter/${isDel.news_letter_id}?authId=${user.user_id}`
            );

            mutate(
                `/news_letter?p=${page + 1}&r=${rowsPerPage}?authId=${
                    user.user_id
                }`,
                (data: { newsLetter: INewsLetter[] }) => {
                    return {
                        ...data,
                        newsLetter: data.newsLetter.filter(
                            (p) => p.news_letter_id !== isDel.news_letter_id
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

    if (error) return <p>حدث خطأ أثناء تحميل الاشتراكات.</p>;
    else if (!data) return <p>جار التحميل...</p>;
    return (
        <>
            {!data.newsLetter?.length ? (
                <p>لم يتم العثور على اي بريد الكتروني</p>
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
                                        البريد الإلكتروني
                                    </TableCell>
                                    <TableCell className={classes.smallCell}>
                                        تاريخ الانشاء
                                    </TableCell>

                                    <TableCell
                                        style={{
                                            minWidth: "50px",
                                            maxWidth: "50px",
                                        }}
                                    >
                                        أجراءات
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data.newsLetter.map((newsLetter) => (
                                    <NewsLetterItem
                                        key={newsLetter.news_letter_id}
                                        newsLetter={newsLetter}
                                        handleOpenDel={handleOpenDel}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 50, 100]}
                        component="div"
                        labelRowsPerPage="صفوف لكل صفحة:"
                        count={data.results}
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
                    title="حذف البريد الاكتروني"
                    msg={`هل انت متاكد انك تريد مسح ${isDel.email}؟`}
                    handler={handleDelete}
                    loading={delLoading}
                />
            )}
        </>
    );
};

export default NewsLetterList;
