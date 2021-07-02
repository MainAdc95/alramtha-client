import {
    CircularProgress,
    createStyles,
    makeStyles,
    Theme,
} from "@material-ui/core";

interface IProps {
    width: number;
    type: "page" | "inline";
}

const Loader = ({ width, type }: IProps) => {
    const classes = useStyles();

    return (
        <div
            className={classes.root}
            style={{ height: type === "page" ? "100vh" : "initial" }}
        >
            <div className={classes.container}>
                <CircularProgress
                    style={{
                        width,
                        height: width,
                    }}
                />
            </div>
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        root: {
            display: "flex",
            justifyContent: "center",
        },
        container: {
            margin: "auto",
        },
    });
});

export default Loader;
