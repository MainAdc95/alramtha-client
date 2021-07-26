import ImageOpt from "../../imageOpt";
import { useState } from "react";
import {
    makeStyles,
    Button,
    Menu,
    MenuItem,
    Theme,
    createStyles,
} from "@material-ui/core";
import { IImage } from "../../../types/image";

// icons
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            position: "relative",
            boxShadow:
                "0px 3px 3px -2px rgb(0 0 0 / 20%), 0px 3px 4px 0px rgb(0 0 0 / 14%), 0px 1px 8px 0px rgb(0 0 0 / 12%)",
            "&:hover": {
                boxShadow:
                    "0px 3px 3px -2px rgb(0 0 0 / 50%), 0px 3px 4px 0px rgb(0 0 0 / 30%), 0px 1px 8px 0px rgb(0 0 0 / 20%)",
                "& $toolbar": {
                    opacity: 1,
                },
            },
            // "&:after": {
            //     content: "",
            //     display: "block",
            //     paddingBottom: "50%",
            // },
        },
        toolbar: {
            position: "absolute",
            alignItems: "center",
            zIndex: 1,
            opacity: 0,
            padding: "10px",
            backgroundColor: "white",
            display: "flex",
            width: "100%",
            justifyContent: "space-between",
            boxShadow: theme.shadows[10],
        },
        imgContainer: {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
        },
    })
);

interface IProps {
    image: IImage;
    handleOpenDel: any;
}

const ImageItem = ({ image, handleOpenDel }: IProps) => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const delAction = () => {
        handleOpenDel(image);
        handleClose();
    };

    return (
        <div className={`${classes.root} admin-image-item`}>
            <div>
                <div className={classes.toolbar}>
                    <div>
                        <Button
                            style={{ minWidth: "100%" }}
                            size="small"
                            variant="contained"
                            color="secondary"
                            onClick={handleClick}
                        >
                            <MoreHorizIcon />
                        </Button>
                    </div>
                </div>
                <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    anchorOrigin={{ vertical: "top", horizontal: "right" }}
                    transformOrigin={{ vertical: "top", horizontal: "right" }}
                    onClose={handleClose}
                >
                    <MenuItem onClick={delAction}>حذف</MenuItem>
                </Menu>
            </div>
            <div className={classes.imgContainer}>
                <ImageOpt
                    src={image?.sizes?.s}
                    layout="fill"
                    objectFit="cover"
                />
            </div>
        </div>
    );
};

export default ImageItem;
