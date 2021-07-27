import {
    createStyles,
    makeStyles,
    Theme,
    Box,
    Typography,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
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
            case "Sunny":
                return "مشمس";
            default:
                return txt;
        }
    };

    if (location && activeCountry)
        return (
            <Box className={classes.root}>
                <Box width="100%" display="flex">
                    {activeCountry && (
                        <Box>
                            <ImageOpt
                                width={50}
                                height={30}
                                location="other"
                                src={activeCountry.flag}
                            />
                        </Box>
                    )}
                    <p className={classes.greet}>
                        مرحبا بقرائنا من{" "}
                        <span className={classes.name}>
                            {activeCountry.name}
                        </span>
                    </p>
                </Box>
                <Box mt={2} width="100%">
                    <h6 className={classes.conditionTitle}>
                        الطقس{" "}
                        {translateCondition(
                            location.weather.current.condition.text
                        )}{" "}
                    </h6>
                    <Box width="100%" mt={1} display="flex">
                        <ImageOpt
                            width={50}
                            height={50}
                            location="other"
                            src={location.weather.current.condition.icon}
                        />
                        <Box ml={2} display="flex" flexDirection="column">
                            <p>
                                درجة الحرارة{" "}
                                <span className={classes.degree}>
                                    {location.weather.current.temp_c}
                                    °c
                                </span>
                            </p>
                            <p style={{ marginTop: "5px" }}>
                                المشعورة{" "}
                                <span className={classes.degree}>
                                    {location.weather.current.feelslike_c}
                                    °c
                                </span>
                            </p>
                        </Box>
                    </Box>
                </Box>
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
            padding: "5px 0",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
        },
        city: {
            marginTop: "10px",
        },
        greet: {
            marginLeft: theme.spacing(2),
            fontSize: "15px",
        },
        name: {
            color: "rgb(2, 135, 254)",
            fontWeight: 900,
        },
        conditionTitle: {
            textAlign: "center",
            fontSize: "16px",
        },
        degree: {
            fontWeight: 900,
            fontSize: "15px",
            marginLeft: "5px",
        },
    })
);

export default GeoLocationInfo;
