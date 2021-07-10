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
import { IStrip, StripType } from "../../../types/strip";
import { useSelector } from "react-redux";
import { RootReducer } from "../../../store/reducers";
import useSWR from "swr";

// components
import StripItem from "./stripItem";
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
        headContainer: {
            marginBottom: "30px",
            paddingBottom: "10px",
            borderBottom: "1px solid rgb(173, 173, 173)",
        },
        headText: {
            fontSize: "20px",
        },
    })
);

const StripList = () => {
    const classes = useStyles();
    const user = useSelector((state: RootReducer) => state.auth.user);
    const [isDel, setDel] = useState<IStrip | null>(null);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [delLoading, setDelLoading] = useState(false);
    const [page, setPage] = useState(0);
    const { data: strips, error, isValidating } = useSWR<IStrip[]>(`/strips`);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpenDel = (strip: IStrip) => {
        setDel(strip);
    };

    const handleCloseDel = () => {
        setDel(null);
    };

    const handleDelete = async () => {
        try {
            setDelLoading(true);
            await apiCall(
                "delete",
                `/strip/${isDel.strip_id}?authId=${user.user_id}`
            );

            mutate(
                `/strips`,
                (strips: IStrip[]) =>
                    strips.filter((p) => p.strip_id !== isDel.strip_id),
                false
            );

            setDelLoading(false);
            handleCloseDel();
        } catch (err) {
            setDelLoading(false);
        }
    };

    const translateType = (type: StripType) => {
        switch (type) {
            case "default":
                return "رسائل دائمة";
            case "breakingNews":
                return "أخبار عاجلة";
            case "announcement":
                return "تنويه";
            default:
                return "";
        }
    };

    const types: StripType[] = ["default", "breakingNews", "announcement"];

    if (error) return <p>An error has occured while fetching strips.</p>;
    else if (!strips) return <p>Loading...</p>;
    else if (!strips?.length) return <p>There were no strips found.</p>;
    return (
        <>
            {types.map((type) => (
                <>
                    <div className={classes.headContainer}>
                        <p className={classes.headText}>
                            {translateType(type)}
                        </p>
                    </div>
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
                                        العنوان
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
                                {strips
                                    .filter((s) => s.type === type)
                                    .map((strip) => (
                                        <StripItem
                                            key={strip.strip_id}
                                            strip={strip}
                                            handleOpenDel={handleOpenDel}
                                        />
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 50, 100]}
                        component="div"
                        count={strips.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={handleChangePage}
                        onChangeRowsPerPage={handleChangeRowsPerPage}
                    />
                </>
            ))}
            {isDel && (
                <ActionModal
                    close={handleCloseDel}
                    title="حذف الشريط"
                    msg={`؟ ${isDel.title} هل انت متاكد انك تريد حذف`}
                    handler={handleDelete}
                    loading={delLoading}
                />
            )}
        </>
    );
};

export default StripList;
