import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { LinearProgress, Box } from "@material-ui/core";
import { useState, useEffect } from "react";
import { ITag } from "../../../types/tag";
import { mutate } from "swr";
import { Pagination } from "@material-ui/lab";
import { apiCall } from "../../../utils/apiCall";
import { useSelector } from "react-redux";
import { RootReducer } from "../../../store/reducers";
import useSWR from "swr";

// components
import TagItem from "./tagItem";
import ActionModal from "../actionModal";

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

const TagList = () => {
    const classes = useStyles();
    const user = useSelector((state: RootReducer) => state.auth.user);
    const [isDel, setDel] = useState<ITag | null>(null);
    const [delLoading, setDelLoading] = useState(false);
    const rowsPerPage = 20;
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const { data, error, isValidating } = useSWR<{
        results: number;
        tags: ITag[];
    }>(`/tags?p=${page}&r=${rowsPerPage}`);

    useEffect(() => {
        if (data) {
            setCount(Math.ceil(data.results / rowsPerPage));
        }
    }, [data]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleOpenDel = (tag: ITag) => {
        setDel(tag);
    };

    const handleCloseDel = () => {
        setDel(null);
    };

    const handleDelete = async () => {
        try {
            setDelLoading(true);
            await apiCall(
                "delete",
                `/tag/${isDel.tag_id}?authId=${user.user_id}`
            );

            mutate(
                `/tags?p=${page + 1}&r=${rowsPerPage}`,
                (data: any) => {
                    return {
                        ...data,
                        tags: data.tags.filter(
                            (p) => p.tag_id !== isDel.tag_id
                        ),
                    };
                },
                false
            );

            setDelLoading(false);
            handleCloseDel();
        } catch (err) {
            setDelLoading(false);
        }
    };

    if (error) return <p>An error has occured while fetching tags.</p>;
    else if (!data) return <p>جار التحميل...</p>;
    else if (!data.tags?.length) return <p>There were no tags found.</p>;
    return (
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
                                اسم الوسم
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
                            <TableCell
                                style={{
                                    minWidth: "50px",
                                }}
                            >
                                أجراءات
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.tags.map((tag) => (
                            <TagItem
                                key={tag.tag_id}
                                tag={tag}
                                handleOpenDel={handleOpenDel}
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
            {isDel && (
                <ActionModal
                    close={handleCloseDel}
                    title="مسح الوسم"
                    msg={`؟${isDel.tag_name} هل انت متاكد انك تريد مسح`}
                    handler={handleDelete}
                    loading={delLoading}
                />
            )}
        </>
    );
};

export default TagList;
