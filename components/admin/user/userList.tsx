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
import { IUser } from "../../../types/user";
import { mutate } from "swr";
import { apiCall } from "../../../utils/apiCall";
import { useSelector } from "react-redux";
import { RootReducer } from "../../../store/reducers";
import useSWR from "swr";

// components
import UserItem from "./userItem";
import UserForm from "./userForm";
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

const UserList = () => {
    const classes = useStyles();
    const user = useSelector((state: RootReducer) => state.auth.user);
    const [isDel, setDel] = useState<IUser | null>(null);
    const [isEdit, setEdit] = useState<IUser | null>(null);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [delLoading, setDelLoading] = useState(false);
    const [page, setPage] = useState(0);
    const { data, error, isValidating } = useSWR<{
        results: number;
        users: IUser[];
    }>(`/users?p=${page + 1}&r=${rowsPerPage}&authId=${user.user_id}`);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpenDel = (user: IUser) => {
        setDel(user);
    };

    const handleCloseDel = () => {
        setDel(null);
    };

    const handleToggleEdit = (user: IUser) => {
        if (isEdit) {
            return setEdit(null);
        }

        setEdit(user);
    };

    if (error) return <p>An error has occured while fetching users.</p>;
    else if (!data) return <p>Loading...</p>;
    else if (!data.users?.length) return <p>There were no users found.</p>;
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
                                الصورة الرمزية
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
                            <TableCell className={classes.smallCell}>
                                البريد الالكتروني
                            </TableCell>
                            <TableCell className={classes.smallCell}>
                                رقم الهاتف
                            </TableCell>
                            <TableCell className={classes.smallCell}>
                                أنشئت في
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
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                component="div"
                count={data.results}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
            {isEdit && (
                <UserForm
                    close={handleToggleEdit}
                    user={isEdit}
                    mutateUrl={`/users?p=${page + 1}&r=${rowsPerPage}&authId=${
                        user.user_id
                    }`}
                />
            )}
        </>
    );
};

export default UserList;
