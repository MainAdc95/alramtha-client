import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { useState } from "react";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import {
    makeStyles,
    Typography,
    Button,
    Menu,
    MenuItem,
    Box,
    Theme,
    createStyles,
} from "@material-ui/core";
import { IPoll } from "../../../types/poll";
import Link from "next/link";

// icons
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            "&:hover": {
                boxShadow:
                    "0px 0px 5px 1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
                backgroundColor: "rgb(245, 245, 245)",
            },
        },
        tableCell: {
            maxWidth: "200px",
            whiteSpace: "nowrap",
            overflowX: "hidden",
            textOverflow: "ellipsis",
        },
        smallCell: {
            width: "160px",
            maxWidth: "160px",
        },
        sticky: {
            zIndex: 1,
        },
        stickyHover: {
            zIndex: 1,
            right: "0",
            position: "sticky",
        },
        colorBoxContainer: {
            display: "flex",
            justifyContent: "space-between",
        },
        colorBox: {
            width: "60px",
            height: "30px",
            boxShadow: theme.shadows[5],
            borderRadius: theme.shape.borderRadius,
        },
    })
);

interface IProps {
    poll: IPoll;
    handleOpenDel: any;
}

const PollItem = ({ poll, handleOpenDel }: IProps) => {
    const classes = useStyles();
    const [isHover, setHover] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const delAction = () => {
        handleOpenDel(poll);
        handleClose();
    };

    const handleMouseOver = () => {
        setHover(true);
    };

    const handleMouseLeave = () => {
        setHover(false);
    };

    return (
        <TableRow
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            classes={{ root: classes.root }}
            key={poll.poll_id}
        >
            <TableCell
                classes={{
                    root: classes.tableCell,
                }}
            >
                {poll.title}
            </TableCell>
            <TableCell
                classes={{
                    root: classes.smallCell,
                }}
            >
                {(() => {
                    let number = 0;

                    poll.options.forEach((o) => (number += o.votes));

                    return number;
                })()}
            </TableCell>
            <TableCell
                classes={{
                    root: classes.smallCell,
                }}
            >
                {poll.is_active ? (
                    <CheckIcon color="primary" />
                ) : (
                    <ClearIcon color="secondary" />
                )}
            </TableCell>
            <TableCell style={{ whiteSpace: "nowrap" }}>
                {new Date(poll.created_at).toLocaleString("ar")}
            </TableCell>
            <TableCell
                classes={{
                    root: classes.tableCell,
                }}
            >
                {poll.created_by?.username || (
                    <Typography align="center">-</Typography>
                )}
            </TableCell>
            <TableCell style={{ whiteSpace: "nowrap" }}>
                {new Date(poll.updated_at).toLocaleString("ar")}
            </TableCell>
            <TableCell
                classes={{
                    root: classes.tableCell,
                }}
            >
                {poll.updated_by?.username || (
                    <Typography align="center">-</Typography>
                )}
            </TableCell>
            <TableCell
                classes={{
                    root: isHover ? classes.stickyHover : classes.sticky,
                }}
            >
                <Box width={45}>
                    <Button
                        style={{ minWidth: "100%" }}
                        size="small"
                        variant="contained"
                        color="secondary"
                        onClick={handleClick}
                    >
                        <MoreHorizIcon />
                    </Button>
                </Box>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    onClose={handleClose}
                >
                    <Link href={`/admin/polls/addPoll?pollId=${poll.poll_id}`}>
                        <a>
                            <MenuItem>تعديل</MenuItem>
                        </a>
                    </Link>
                    <MenuItem onClick={delAction}>حذف</MenuItem>
                </Menu>
            </TableCell>
        </TableRow>
    );
};

export default PollItem;
