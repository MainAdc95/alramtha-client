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
import { ISection } from "../../../types/section";
import Link from "next/link";

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
    section: ISection;
    handleOpenDel: any;
    handleOpenEdit: any;
}

const SectionItem = ({ section, handleOpenDel, handleOpenEdit }: IProps) => {
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
        handleOpenDel(section);
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
        handleOpenEdit(section);
    };

    return (
        <TableRow
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            classes={{ root: classes.root }}
            key={section.section_id}
        >
            <TableCell
                classes={{
                    root: classes.tableCell,
                }}
            >
                {section.section_name}
            </TableCell>
            <TableCell
                classes={{
                    root: classes.smallCell,
                }}
            >
                <div className={classes.colorBoxContainer}>
                    <p>{section.color}</p>
                    <div
                        className={classes.colorBox}
                        style={{ backgroundColor: section.color }}
                    ></div>
                </div>
            </TableCell>
            <TableCell style={{ whiteSpace: "nowrap" }}>
                {`${new Date(
                    section.created_at
                ).toLocaleDateString()}, ${new Date(
                    section.created_at
                ).toLocaleTimeString()}`}
            </TableCell>
            <TableCell
                classes={{
                    root: classes.tableCell,
                }}
            >
                {section.created_by?.username || (
                    <Typography align="center">-</Typography>
                )}
            </TableCell>
            <TableCell style={{ whiteSpace: "nowrap" }}>
                {`${new Date(
                    section.updated_at
                ).toLocaleDateString()}, ${new Date(
                    section.updated_at
                ).toLocaleTimeString()}`}
            </TableCell>
            <TableCell
                classes={{
                    root: classes.tableCell,
                }}
            >
                {section.updated_by?.username || (
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
                    <Link
                        href={`/admin/sections/addSection?sectionId=${section.section_id}`}
                    >
                        <a>
                            <MenuItem onClick={handleEdit}>Edit</MenuItem>
                        </a>
                    </Link>
                    <MenuItem onClick={delAction}>Delete</MenuItem>
                </Menu>
            </TableCell>
        </TableRow>
    );
};

export default SectionItem;
