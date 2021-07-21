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
import { apiImage } from "../../../utils/apiCall";
import ImageOpt from "../../imageOpt";
import { IFile } from "../../../types/file";
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
    imgsContainer: {
        display: "flex",
        height: "50px",
    },
    imgContainer: {
        width: "50px",
        boxShadow:
            "0px 0px 5px 1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
        height: "50px",
        borderRadius: "50%",
        overflow: "hidden",
        position: "relative",
        marginLeft: "-10px",
        transition: "all 1s ease",
        backgroundColor: "white",
        "&:hover": {
            marginTop: "-20px",
            zIndex: 100,
            transform: "scale(2)",
            borderRadius: "0",
        },
    },
});

interface IProps {
    file: IFile;
    handleOpenDel: any;
}

const FileItem = ({ file, handleOpenDel }: IProps) => {
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
        handleOpenDel(file);
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
            key={file.file_id}
        >
            <TableCell
                classes={{
                    root: classes.tableCell,
                }}
            >
                {file.text}
            </TableCell>
            <TableCell>
                <div className={classes.imgsContainer}>
                    <div
                        key={file.image.image_id}
                        className={classes.imgContainer}
                    >
                        <a
                            href={apiImage(file.image?.sizes?.l)}
                            target="_blank"
                        >
                            <ImageOpt
                                src={file.image?.sizes?.s}
                                objectFit="cover"
                                layout="fill"
                            />
                        </a>
                    </div>
                </div>
            </TableCell>
            <TableCell style={{ whiteSpace: "nowrap" }}>
                {new Date(file.created_at).toLocaleString("ar")}
            </TableCell>
            <TableCell
                classes={{
                    root: classes.tableCell,
                }}
            >
                {file.created_by?.username || (
                    <Typography align="center">-</Typography>
                )}
            </TableCell>
            <TableCell style={{ whiteSpace: "nowrap" }}>
                {new Date(file.updated_at).toLocaleString("ar")}
            </TableCell>
            <TableCell
                classes={{
                    root: classes.tableCell,
                }}
            >
                {file.updated_by?.username || (
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
                    <Link href={`/admin/files/fileForm?fileId=${file.file_id}`}>
                        <MenuItem onClick={handleEdit}>تعديل</MenuItem>
                    </Link>
                    <MenuItem onClick={delAction}>حذف</MenuItem>
                </Menu>
            </TableCell>
        </TableRow>
    );
};

export default FileItem;
