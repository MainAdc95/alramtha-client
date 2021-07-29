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
import { IUser } from "../../../types/user";
import { useSelector } from "react-redux";
import { Pagination } from "@material-ui/lab";
import { RootReducer } from "../../../store/reducers";
import useSWR from "swr";

// components
import UserItem from "./userItem";
import UserForm from "./userForm";

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

const UserList = () => {
    const classes = useStyles();
    const user = useSelector((state: RootReducer) => state.auth.user);
    const [isDel, setDel] = useState<IUser | null>(null);
    const [isEdit, setEdit] = useState<IUser | null>(null);
    const rowsPerPage = 10;
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const { data, error, isValidating } = useSWR<{
        results: number;
        users: IUser[];
    }>(`/users?p=${page}&r=${rowsPerPage}&authId=${user.user_id}`);

    useEffect(() => {
        if (data) {
            setCount(Math.ceil(data.results / rowsPerPage));
        }
    }, [data]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleToggleEdit = (user: IUser) => {
        if (isEdit) {
            return setEdit(null);
        }

        setEdit(user);
    };

    if (error) return <p>لقد حدث خطأ أثناء تحميل الأعضاء.</p>;
    else if (!data) return <p>جار التحميل...</p>;
    else if (!data.users?.length) return <p>لم يتم العثور على أي اعضاء.</p>;
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
                                الصوره الشخصيه
                            </TableCell>
                            <TableCell className={classes.smallCell}>
                                اسم المستخدم
                            </TableCell>
                            <TableCell className={classes.smallCell}>
                                الأسم الأول
                            </TableCell>
                            <TableCell className={classes.smallCell}>
                                الأسم الأخير
                            </TableCell>
                            <TableCell>البريد الالكتروني</TableCell>
                            <TableCell className={classes.smallCell}>
                                رقم الهاتف
                            </TableCell>
                            <TableCell className={classes.smallCell}>
                                تاريخ الانشاء
                            </TableCell>
                            <TableCell style={{ minWidth: "50px" }}>
                                أجراءات
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.users.map((user) => (
                            <UserItem
                                key={user.user_id}
                                user={user}
                                handleOpenEdit={handleToggleEdit}
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
            {isEdit && (
                <UserForm
                    close={handleToggleEdit}
                    user={isEdit}
                    mutateUrl={`/users?p=${page}&r=${rowsPerPage}&authId=${user.user_id}`}
                />
            )}
        </>
    );
};

export default UserList;
