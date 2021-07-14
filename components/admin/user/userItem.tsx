import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { useState } from "react";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { makeStyles, Button, Menu, MenuItem, Box } from "@material-ui/core";
import { IUser } from "../../../types/user";
import ImageOpt from "../../imageOpt";

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
    avatarContainer: {
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        position: "relative",
        boxShadow:
            "0px 0px 5px 1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
        overflow: "hidden",
    },
    imgContainer: {
        width: "50px",
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
    user: IUser;
    handleOpenEdit: any;
}

const UserItem = ({ user, handleOpenEdit }: IProps) => {
    const classes = useStyles();
    const [isHover, setHover] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMouseOver = () => {
        setHover(true);
    };

    const handleMouseLeave = () => {
        setHover(false);
    };

    const handleEdit = () => {
        handleClose();
        handleOpenEdit(user);
    };

    return (
        <TableRow
            onMouseOver={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            classes={{ root: classes.root }}
            key={user.user_id}
        >
            <TableCell
                classes={{
                    root: classes.tableCell,
                }}
            >
                <div className={classes.avatarContainer}>
                    <ImageOpt
                        src={user.avatar?.sizes?.s}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
            </TableCell>
            <TableCell
                classes={{
                    root: classes.tableCell,
                }}
            >
                {user.username}
            </TableCell>
            <TableCell
                classes={{
                    root: classes.tableCell,
                }}
            >
                {user.first_name}
            </TableCell>
            <TableCell
                classes={{
                    root: classes.tableCell,
                }}
            >
                {user.last_name}
            </TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell
                classes={{
                    root: classes.tableCell,
                }}
            >
                {user.phone}
            </TableCell>
            <TableCell style={{ whiteSpace: "nowrap" }}>
                {`${new Date(user.created_at).toLocaleDateString()}, ${new Date(
                    user.created_at
                ).toLocaleTimeString()}`}
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
                    <MenuItem onClick={handleEdit}>تعديل</MenuItem>
                </Menu>
            </TableCell>
        </TableRow>
    );
};

export default UserItem;
