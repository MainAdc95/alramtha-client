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
import Link from "next/link";
import { INews } from "../../../types/news";
import { apiImage } from "../../../utils/apiCall";
import ImageOpt from "../../imageOpt";

const useStyles = makeStyles({
    root: {
        "&:hover": {
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
        right: "0",
        position: "sticky",
        // backgroundColor: "rgb(2, 135, 254)",
    },
    stickyHover: {},
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
    sectionContainer: {
        width: "auto",
        color: "white",
        padding: "5px",
        borderRadius: "5px",
        textAlign: "center",
    },
});

interface IProps {
    news: INews;
    handleOpenDel: any;
    handleOpenPublish: any;
    toggleArchive: any;
    query: string;
}

const NewsItem = ({
    news,
    handleOpenDel,
    handleOpenPublish,
    toggleArchive,
    query,
}: IProps) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const delAction = () => {
        handleOpenDel(news);
        handleClose();
    };

    const publishAction = () => {
        handleOpenPublish(news);
        handleClose();
    };

    const archiveAction = () => {
        toggleArchive(news);
        handleClose();
    };

    return (
        <TableRow classes={{ root: classes.root }} key={news.news_id}>
            <TableCell
                classes={{
                    root: classes.tableCell,
                }}
            >
                {news.title}
            </TableCell>
            <TableCell
                classes={{
                    root: classes.tableCell,
                }}
            >
                {news.readers}
            </TableCell>
            <TableCell>
                <div className={classes.imgsContainer}>
                    <div className={classes.imgContainer}>
                        <a
                            href={apiImage(news.thumbnail?.sizes?.l)}
                            target="_blank"
                        >
                            <ImageOpt
                                src={news.thumbnail?.sizes?.s}
                                objectFit="cover"
                                layout="fill"
                            />
                        </a>
                    </div>
                    {news.images.map((image) => (
                        <div
                            key={image.image_id}
                            className={classes.imgContainer}
                        >
                            <a href={apiImage(image?.sizes?.l)} target="_blank">
                                <ImageOpt
                                    src={image?.sizes?.s}
                                    objectFit="cover"
                                    layout="fill"
                                />
                            </a>
                        </div>
                    ))}
                </div>
            </TableCell>
            <TableCell
                classes={{
                    root: classes.tableCell,
                }}
            >
                {news.section ? (
                    <div
                        style={{ backgroundColor: news.section.color }}
                        className={classes.sectionContainer}
                    >
                        <p>{news.section.section_name}</p>
                    </div>
                ) : (
                    <Typography align="center">-</Typography>
                )}
            </TableCell>
            <TableCell style={{ whiteSpace: "nowrap" }}>
                {new Date(news.created_at).toLocaleString("ar")}
            </TableCell>
            <TableCell
                classes={{
                    root: classes.tableCell,
                }}
            >
                {news.created_by?.username || (
                    <Typography align="center">-</Typography>
                )}
            </TableCell>
            <TableCell style={{ whiteSpace: "nowrap" }}>
                {new Date(news.updated_at).toLocaleString("ar")}
            </TableCell>
            <TableCell
                classes={{
                    root: classes.tableCell,
                }}
            >
                {news.updated_by?.username || (
                    <Typography align="center">-</Typography>
                )}
            </TableCell>
            <TableCell
                classes={{
                    root: classes.sticky,
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
                        href={`/admin/news/addNews${query}&newsId=${news.news_id}`}
                    >
                        <MenuItem>
                            <a>تعديل</a>
                        </MenuItem>
                    </Link>
                    {!news.is_archived && (
                        <MenuItem onClick={archiveAction}>حذف</MenuItem>
                    )}
                    {!news.is_published && (
                        <MenuItem onClick={publishAction}>نشر</MenuItem>
                    )}
                    {news.is_archived && (
                        <MenuItem onClick={delAction}>
                            الحذف بشكل نهائي
                        </MenuItem>
                    )}
                </Menu>
            </TableCell>
        </TableRow>
    );
};

export default NewsItem;
