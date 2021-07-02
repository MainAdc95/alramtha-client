import {
    createStyles,
    makeStyles,
    Theme,
    Box,
    Typography,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootReducer } from "../store/reducers";

const GeoLocationInfo = () => {
    const classes = useStyles();
    const location = useSelector((state: RootReducer) => state.location);

    if (location)
        return (
            <Box className={classes.root}>
                <Typography>{location.city}</Typography>
            </Box>
        );

    return null;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            height: "100%",
        },
        name: {},
        imgContainer: {},
        img: {},
    })
);

export default GeoLocationInfo;
