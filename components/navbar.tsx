import { createStyles, makeStyles, Theme, Box } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { DateTime } from "luxon";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { ISection } from "../types/section";
import useSWR from "swr";

// components
import GeoLocationInfo from "../components/geoLocationInfo";

// icons
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import ImageOpt from "./imageOpt";

const Navbar = () => {
    const { data: sections } = useSWR("/sections");
    const classes = useStyles();
    const [time, setTime] = useState(DateTime.now());
    const categ = useRef<any>(null);

    // ______________________________________ increment timer
    useEffect(() => {
        const handleCatgBar = (e) => {
            if (window.pageYOffset > 200) {
                if (categ.current) {
                    categ.current.style.position = "fixed";
                    document.body.style.paddingTop = "50px";
                }
            } else if (
                window.pageYOffset <= 200 &&
                categ.current.style.position === "fixed"
            ) {
                if (categ.current) {
                    categ.current.style.position = "static";
                    document.body.style.paddingTop = "0";
                }
            }
        };

        window.addEventListener("scroll", handleCatgBar);

        setInterval(() => {
            setTime(
                DateTime.now().plus({
                    second: 1,
                })
            );
        }, 1000);

        return () => {
            window.removeEventListener("scroll", handleCatgBar);
        };
    }, []);

    return (
        <>
            <div className={classes.root}>
                <AppBar classes={{ root: classes.appbar }} position="static">
                    <Box className={classes.strip}>
                        <Box className={classes.stripSocialMedia}>
                            <Box>
                                <Typography className={classes.stripTxt}>
                                    facebook
                                </Typography>
                            </Box>
                            <Box>
                                <Typography className={classes.stripTxt}>
                                    facebook
                                </Typography>
                            </Box>
                            <Box>
                                <Typography className={classes.stripTxt}>
                                    facebook
                                </Typography>
                            </Box>
                        </Box>
                        <Typography className={classes.stripTxt}>
                            {time.setLocale("ar").toLocaleString({
                                weekday: "short",
                                month: "short",
                                day: "2-digit",
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </Typography>
                    </Box>
                    <Toolbar className={classes.toolbar}>
                        <Link href="/">
                            <a>
                                <div className={classes.logoContianer}>
                                    <ImageOpt
                                        src="/logo.svg"
                                        location="local"
                                        layout="fill"
                                        objectFit="contain"
                                    />
                                </div>
                            </a>
                        </Link>
                        <Box className={classes.adsContainer}>
                            <img className={classes.adsImg} src="/ads.png" />
                        </Box>
                        <Box>
                            <GeoLocationInfo />
                        </Box>
                        {/* <div className={classes.navbarContent}>
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Box>
                                        <Typography>
                                            From the world, we begin, we are
                                            your eyes on the news
                                        </Typography>
                                    </Box>
                                </Box>
                            </div> */}
                    </Toolbar>
                </AppBar>
            </div>
            <div ref={categ} className={classes.sectionsContainer}>
                <Box className={classes.sections}>
                    <Box className={classes.tabList}>
                        <div className={classes.tabItem}>
                            <div className={classes.tabColorStrip}></div>
                            <Link href={"/"}>
                                <a
                                    className={classes.tabLink}
                                    style={{ color: "black" }}
                                >
                                    <HomeIcon />
                                </a>
                            </Link>
                        </div>
                        {sections
                            ?.sort(
                                (a, b) =>
                                    Number(a.section_order) -
                                    Number(b.section_order)
                            )
                            ?.map((section, i) => (
                                <div
                                    className={classes.tabItem}
                                    key={section.section_id}
                                >
                                    <div
                                        className={classes.tabColorStrip}
                                        style={{
                                            backgroundColor: section.color,
                                        }}
                                    ></div>
                                    <Link
                                        href={`/sections/${section.section_id}`}
                                    >
                                        <a className={classes.tabLink}>
                                            {section.section_name}
                                        </a>
                                    </Link>
                                </div>
                            ))}
                    </Box>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="بحث…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{
                                "aria-label": "search",
                            }}
                        />
                    </div>
                </Box>
            </div>
        </>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
        },
        strip: {
            display: "flex",
            justifyContent: "space-between",
            margin: "0 auto",
            height: "30px",
            alignItems: "center",
            width: "1200px",
            padding: theme.spacing(0.5, 0),
            borderBottom: `1px solid rgb(194, 194, 194)`,
        },
        stripSocialMedia: {
            display: "flex",
        },
        stripTxt: {
            fontSize: "13px",
            color: "white",
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        appbar: {
            backgroundColor: "#313131",
            height: "200px",
            width: "100%",
        },
        toolbar: {
            width: "1200px",
            height: "100%",
            display: "flex",
            justifyContent: "space-between",
            margin: "0 auto",
            alignItems: "center",
            padding: theme.spacing(1, 0),
        },
        title: {
            display: "none",
            [theme.breakpoints.up("sm")]: {
                display: "block",
            },
        },
        search: {
            position: "relative",
            border: `1px solid ${theme.palette.primary.main}`,
            borderRadius: theme.shape.borderRadius,
            marginLeft: 0,
            width: "250px",
            height: "30px",
        },
        searchIcon: {
            padding: theme.spacing(0, 1),
            height: "100%",
            position: "absolute",
            color: theme.palette.primary.main,
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            [theme.direction === "ltr" ? "left" : "right"]: "0",
        },
        inputRoot: {
            color: "inherit",
        },
        inputInput: {
            maxHeight: "30px",
            fontSize: "14px",
            width: `${250 - theme.spacing(5)}px`,
            [theme.direction === "ltr"
                ? "paddingLeft"
                : "paddingRight"]: `calc(${theme.spacing(5)}px)`,
            [theme.direction === "ltr"
                ? "paddingRight"
                : "paddingLeft"]: `calc(${theme.spacing(1)}px)`,
        },
        logoContianer: {
            position: "relative",
            height: "140px",
            minWidth: "187px",
        },
        logo: {
            position: "absolute",
            width: "100%",
            height: "100%",
        },
        navbarContent: {
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: "100%",
            height: "100%",
        },
        tabList: {
            display: "flex",
            height: "100%",
            "& div:last-child": {
                [theme.direction === "ltr" ? "marginLeft " : "marginRight"]: 0,
            },
        },
        tabItem: {
            padding: theme.spacing(0, 2),
            [theme.direction === "ltr" ? "marginRight" : "marginLeft"]:
                theme.spacing(0.3),
            display: "flex",
            alignItems: "center",
            position: "relative",
            "&:hover": {
                color: "white",
                "& $tabColorStrip": {
                    height: "100%",
                },
            },
            transition: "all 0.2s ease",
        },
        tabLink: {
            fontSize: theme.typography.body1.fontSize,
            textTransform: "capitalize",
            zIndex: 1,
            justifyContent: "center",
        },
        tabColorStrip: {
            position: "absolute",
            width: "100%",
            height: "5px",
            zIndex: 0,
            left: 0,
            top: 0,
            transition: "all 0.2s ease",
        },
        adsContainer: {
            position: "relative",
            height: "80%",
            width: "50%",
            margin: theme.spacing(0, 3),
            display: "flex",
            justifyContent: "center",
        },
        adsImg: {
            position: "absolute",
            width: "100%",
            height: "100%",
        },
        sectionsContainer: {
            backgroundColor: theme.palette.grey[100],
            top: 0,
            left: 0,
            zIndex: 1000,
            width: "100%",
        },
        sections: {
            display: "flex",
            justifyContent: "space-between",
            color: "black",
            alignItems: "center",
            height: "40px",
            width: "1200px",
            margin: "auto",
        },
    })
);

export default Navbar;
