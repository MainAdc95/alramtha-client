import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { TablePagination, LinearProgress } from "@material-ui/core";
import { useState } from "react";
import { mutate } from "swr";
import { apiCall } from "../../../utils/apiCall";
import { IFile } from "../../../types/file";
import { useSelector } from "react-redux";
import { RootReducer } from "../../../store/reducers";
import useSWR from "swr";

// components
import FileItem from "./fileItem";
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

const FileList = () => {
    const classes = useStyles();
    const user = useSelector((state: RootReducer) => state.auth.user);
    const [isDel, setDel] = useState<IFile | null>(null);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [delLoading, setDelLoading] = useState(false);
    const [page, setPage] = useState(0);
    const { data: files, error, isValidating } = useSWR<IFile[]>(`/files`);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpenDel = (file: IFile) => {
        setDel(file);
    };

    const handleCloseDel = () => {
        setDel(null);
    };

    const handleDelete = async () => {
        try {
            setDelLoading(true);
            await apiCall(
                "delete",
                `/file/${isDel.file_id}?authId=${user.user_id}`
            );

            mutate(
                `/files`,
                (files: IFile[]) =>
                    files.filter((p) => p.file_id !== isDel.file_id),
                false
            );

            setDelLoading(false);
            handleCloseDel();
        } catch (err) {
            setDelLoading(false);
        }
    };

    if (error) return <p>An error has occured while fetching files.</p>;
    else if (!files) return <p>Loading...</p>;
    else if (!files?.length) return <p>There were no files found.</p>;
    return (
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
                                الاسم
                            </TableCell>
                            <TableCell className={classes.smallCell}>
                                صورة الملف
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
                        {files.map((file) => (
                            <FileItem
                                key={file.file_id}
                                file={file}
                                handleOpenDel={handleOpenDel}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                component="div"
                count={files.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
            {isDel && (
                <ActionModal
                    close={handleCloseDel}
                    title="حذف الملف"
                    msg={`؟ ${isDel.text} هل انت متاكد انك تريد حذف`}
                    handler={handleDelete}
                    loading={delLoading}
                />
            )}
        </>
    );
};

export default FileList;
