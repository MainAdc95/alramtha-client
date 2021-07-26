import {
    createStyles,
    makeStyles,
    Theme,
    Box,
    Typography,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { RootReducer } from "../store/reducers";
import { countries } from "../data/countries";
import ImageOpt from "./imageOpt";

const GeoLocationInfo = () => {
    const classes = useStyles();
    const location = useSelector((state: any) => state.location);
    const [activeCountry, setCountry] = useState<any>(null);

    useEffect(() => {
        if (location) {
            const foundCountry = countries.find(
                (c) => c.alpha2Code === location.country_code
            );

            if (foundCountry) setCountry(foundCountry);
        }
    }, [location]);

    const translateCondition = (txt: String) => {
        switch (txt) {
            case "Clear":
                return "صافي";
            default:
                return txt;
        }
    };

    const translateCity = (txt: String) => {
        switch (txt) {
            case "Abu Dhabi":
                return "أبو ظبي";
            default:
                return txt;
        }
    };

    if (location)
        return (
            <Box className={classes.root}>
                {activeCountry && (
                    <Box>
                        <ImageOpt
                            width={100}
                            height={50}
                            location="other"
                            src={activeCountry.flag}
                        />
                    </Box>
                )}
                <Typography className={classes.city}>
                    {translateCity(location.city)}
                </Typography>
                <p>
                    الطقس{" "}
                    {translateCondition(
                        location.weather.current.condition.text
                    )}{" "}
                    {location.weather.current.temp_c} °c
                </p>
                <ImageOpt
                    width={50}
                    height={50}
                    location="other"
                    src={location.weather.current.condition.icon}
                />
            </Box>
        );

    return null;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            color: "white",
            width: "100%",
            margin: "auto",
            whiteSpace: "nowrap",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        },
        city: {
            marginTop: "10px",
        },
        name: {},
        imgContainer: {},
        img: {},
    })
);

export default GeoLocationInfo;
