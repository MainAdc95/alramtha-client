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
    Box,
    Divider,
    Typography,
} from "@material-ui/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootReducer } from "../../../store/reducers";
import useSWR from "swr";
import { IMessage } from "../../../types/message";

// components
import MessageItem from "./messageItem";
import Modal from "../modal";
import HTMLReactParser from "html-react-parser";

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

const MessageList = () => {
    const classes = useStyles();
    const [isDetails, setDetails] = useState<IMessage | null>(null);
    const user = useSelector((state: RootReducer) => state.auth.user);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(0);
    const { data, error, isValidating } = useSWR<{
        count: number;
        messages: IMessage[];
    }>(`/messages?p=${page + 1}&r=${rowsPerPage}&authId=${user.user_id}`);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleToggleDetails = (message: IMessage) => {
        if (isDetails) {
            return setDetails(null);
        }

        setDetails(message);
    };

    if (error) return <p>An error has occured while fetching messages.</p>;
    else if (!data) return <p>Loading...</p>;
    else if (!data.messages?.length)
        return <p>There were no messages found.</p>;
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
                                Subject
                            </TableCell>
                            <TableCell className={classes.smallCell}>
                                Images
                            </TableCell>
                            <TableCell className={classes.smallCell}>
                                Sent at
                            </TableCell>
                            <TableCell className={classes.smallCell}>
                                Sent by
                            </TableCell>
                            <TableCell style={{ minWidth: "50px" }}>
                                Actions
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.messages.map((message) => (
                            <MessageItem
                                key={message.message_id}
                                message={message}
                                handleToggleDetails={handleToggleDetails}
                            />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                component="div"
                count={data.count}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
            {isDetails && (
                <MessageDetails
                    message={isDetails}
                    close={handleToggleDetails}
                />
            )}
        </>
    );
};

const MessageDetails = ({
    message,
    close,
}: {
    message: IMessage;
    close: any;
}) => {
    return (
        <Modal width="90%" type="parent" closeInfo={{ close, check: false }}>
            <Typography variant="h6">{message.subject}</Typography>
            <Box>
                <Box mb={2} mt={2}>
                    <Divider />
                </Box>
            </Box>
            <div>{HTMLReactParser(message.text)}</div>
        </Modal>
    );
};

export default MessageList;
