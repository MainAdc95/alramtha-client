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
import { ISection } from "../../../types/section";
import useSWR, { mutate } from "swr";
import { apiCall } from "../../../utils/apiCall";
import { useSelector } from "react-redux";
import { RootReducer } from "../../../store/reducers";

// components
import SectionItem from "./sectionItem";
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

interface IProps {
    sections: ISection[];
    loading: boolean;
}

const SectionList = ({ sections, loading }: IProps) => {
    const classes = useStyles();
    const user = useSelector((state: RootReducer) => state.auth.user);
    const [isDel, setDel] = useState<ISection | null>(null);
    const [isEdit, setEdit] = useState<ISection | null>(null);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [delLoading, setDelLoading] = useState(false);
    const [page, setPage] = useState(0);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleOpenDel = (section: ISection) => {
        setDel(section);
    };

    const handleCloseDel = () => {
        setDel(null);
    };

    const handleOpenEdit = (section: ISection) => {
        setEdit(section);
    };

    const handleCloseEdit = () => {
        setEdit(null);
    };

    const handleDelete = async () => {
        try {
            setDelLoading(true);
            await apiCall(
                "delete",
                `/section/${isDel.section_id}?authId=${user.user_id}`
            );

            mutate(
                "/sections",
                (section: ISection[]) => {
                    return section.filter(
                        (p) => p.section_id !== isDel.section_id
                    );
                },
                false
            );

            setDelLoading(false);
            handleCloseDel();
        } catch (err) {
            setDelLoading(false);
        }
    };

    return (
        <>
            <TableContainer
                className={classes.tableContainer}
                component={Paper}
            >
                <Table>
                    {loading && (
                        <div className={classes.loading}>
                            <LinearProgress />
                        </div>
                    )}
                    <TableHead>
                        <TableRow>
                            <TableCell className={classes.smallCell}>
                                أسم القسم
                            </TableCell>
                            <TableCell className={classes.smallCell}>
                                اللون
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
                        {sections
                            .slice(
                                page * rowsPerPage,
                                page * rowsPerPage + rowsPerPage
                            )
                            .map((section) => (
                                <SectionItem
                                    key={section.section_id}
                                    section={section}
                                    handleOpenDel={handleOpenDel}
                                    handleOpenEdit={handleOpenEdit}
                                />
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                component="div"
                count={sections.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                labelRowsPerPage="صفوف لكل صفحة:"
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
            {isDel && (
                <ActionModal
                    close={handleCloseDel}
                    title="Delete section"
                    msg={`؟${isDel.section_name} هل انت متاكد انك تريد مسح`}
                    handler={handleDelete}
                    loading={delLoading}
                />
            )}
        </>
    );
};

export default SectionList;
