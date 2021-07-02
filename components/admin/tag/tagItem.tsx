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
} from "@material-ui/core";
import { ITag } from "../../../types/tag";
import Link from "next/link";

const useStyles = makeStyles({
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
    sticky: {
        zIndex: 1,
    },
    stickyHover: {
        zIndex: 1,
        right: "0",
        position: "sticky",
    },
});

interface IProps {
    tag: ITag;
    handleOpenDel: any;
}

const TagItem = ({ tag, handleOpenDel }: IProps) => {
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
        handleOpenDel(tag);
        handleClose();
    };

    const handleMouseOver = () => {
        setHover(true);
    };

    const handleMouseLeave = () => {
        setHover(false);
    };

    const handleEdit = () => {
        handleClose();
    };

    return (
        <TableRow
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            classes={{ root: classes.root }}
            key={tag.tag_id}
        >
            <TableCell
                classes={{
                    root: classes.tableCell,
                }}
            >
                {tag.tag_name}
            </TableCell>
            <TableCell style={{ whiteSpace: "nowrap" }}>
                {`${new Date(tag.created_at).toLocaleDateString()}, ${new Date(
                    tag.created_at
                ).toLocaleTimeString()}`}
            </TableCell>
            <TableCell
                classes={{
                    root: classes.tableCell,
                }}
            >
                {tag.created_by?.username || (
                    <Typography align="center">-</Typography>
                )}
            </TableCell>
            <TableCell style={{ whiteSpace: "nowrap" }}>
                {`${new Date(tag.updated_at).toLocaleDateString()}, ${new Date(
                    tag.updated_at
                ).toLocaleTimeString()}`}
            </TableCell>
            <TableCell
                classes={{
                    root: classes.tableCell,
                }}
            >
                {tag.updated_by?.username || (
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
                        aria-controls="simple-menu"
                        aria-haspopup="true"
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
                    <Link href={`/admin/tags/addTag?tagId=${tag.tag_id}`}>
                        <MenuItem onClick={handleEdit}>تعديل</MenuItem>
                    </Link>
                    <MenuItem onClick={delAction}>حذف</MenuItem>
                </Menu>
            </TableCell>
        </TableRow>
    );
};

export default TagItem;
