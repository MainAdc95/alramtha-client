import { Typography, createStyles, makeStyles, Theme } from "@material-ui/core";
import ErrorOutlineIcon from "@material-ui/icons/ErrorOutline";

interface IProps {
    errors: string[];
}

const Error = ({ errors }: IProps) => {
    const classes = useStyles();

    if (errors && errors.length)
        return (
            <div className={classes.root}>
                {errors.map((err, i) => (
                    <div className={classes.errContainer} key={i}>
                        <span className={classes.icon}>
                            <ErrorOutlineIcon />
                        </span>
                        <Typography className={classes.text}>{err}</Typography>
                    </div>
                ))}
            </div>
        );

    return null;
};

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        root: {
            display: "flex",
            flexDirection: "column",
        },
        errContainer: {
            display: "flex",
            padding: `${theme.spacing(0.5)}px 0`,
        },
        text: {
            color: theme.palette.error.main,
        },
        icon: {
            display: "inline-block",
            color: theme.palette.error.main,

            margin: `${
                theme.direction === "ltr"
                    ? `0 ${theme.spacing(1)}px 0 0`
                    : `0 0 0 ${theme.spacing(1)}px`
            }`,
        },
    });
});

export default Error;
