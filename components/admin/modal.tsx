import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { useEffect } from "react";
import { Paper } from "@material-ui/core";

// icons
import CloseIcon from "@material-ui/icons/Close";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            zIndex: 10,
            overflowY: "auto",
        },
        wrapper: {
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
            maxWidth: "95%",
            width: (props: any) => props.width,
            outline: "none",
            margin: "50px auto",
        },
        closeIconContainer: {
            position: "fixed",
            top: 20,
            color: "white",
            right: 20,
            zIndex: 4,
            cursor: "pointer",
            width: "40px",
            height: "40px",
        },
        closeIcon: {
            width: "40px",
            height: "40px",
        },
    })
);

interface IProps {
    children?: React.ReactNode;
    closeInfo: {
        close: Function;
        check: boolean;
        msg?: string;
    };
    type: "parent" | "child";
    width?: string;
}

const Modal = ({ children, closeInfo, width, type }: IProps) => {
    const classes = useStyles({ width });

    useEffect(() => {
        if (type === "parent") {
            document.body.style.overflow = "hidden";
        }

        return () => {
            if (type === "parent") {
                document.body.style.overflow = "auto";
            }
        };
    }, []);

    const handleClose = () => {
        if (closeInfo.check) {
            if (
                confirm(
                    closeInfo.msg ||
                        "Are you sure you want to close this window."
                )
            ) {
                close();
                return;
            } else return;
        }

        close();
    };

    const close = () => {
        closeInfo.close();
    };

    return (
        <div onMouseDown={handleClose} className={classes.root}>
            <Paper
                onMouseDown={(e) => e.stopPropagation()}
                className={classes.wrapper}
            >
                {children}
                <div onClick={close} className={classes.closeIconContainer}>
                    <CloseIcon className={classes.closeIcon} />
                </div>
            </Paper>
        </div>
    );
};

export default Modal;
