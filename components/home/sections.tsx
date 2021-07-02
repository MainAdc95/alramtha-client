import {
    createStyles,
    makeStyles,
    Theme,
    Box,
    Typography,
} from "@material-ui/core";
import { sections } from "../../data/sections";

const Sections = () => {
    const classes = useStyles();

    return <Box className={classes.root}></Box>;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
        },
    })
);
