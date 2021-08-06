import { createStyles, makeStyles, Theme, Box } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { DateTime } from "luxon";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";

// components
import GeoLocationInfo from "../components/geoLocationInfo";

// icons
import SearchIcon from "@material-ui/icons/Search";
import HomeIcon from "@material-ui/icons/Home";
import ImageOpt from "./imageOpt";
import GoogleAds from "./googleAds";

const Navbar = () => {
    const router = useRouter();
    const { data: sections } = useSWR("/sections");
    const [search, setSearch] = useState("");
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

    // __________________________ search
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const searchCall = () => {
        if (search) {
            router.push(`/search/${search}`);
        }
    };

    return (
        <>
            <div className={classes.root}>
                <div className={classes.appbar}>
                    <Box className={classes.strip}>
                        <div className={classes.stripContent}>
                            <Typography className={classes.stripTxt}>
                                {time.setLocale("ar").toLocaleString({
                                    weekday: "short",
                                    month: "short",
                                    day: "2-digit",
                                    hour: "2-digit",
                                    minute: "2-digit",
                                })}
                            </Typography>
                        </div>
                    </Box>
                    <div className={classes.toolbar}>
                        <Box>
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
                            <p className={classes.motto}>
                                من العالم المبتدأ ... ونحن الخبر
                            </p>
                        </Box>
                        <Box className={classes.adsContainer}>
                            <GoogleAds />
                        </Box>
                        <Box>
                            <GeoLocationInfo />
                        </Box>
                    </div>
                </div>
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
                        <div className={classes.tabItem}>
                            <div
                                className={classes.tabColorStrip}
                                style={{
                                    backgroundColor: "rgb(1, 224, 1)",
                                }}
                            ></div>
                            <Link href={`/articles`}>
                                <a className={classes.tabLink}>كتاب وآراء</a>
                            </Link>
                        </div>
                    </Box>
                    <div className={classes.search}>
                        <div
                            onClick={searchCall}
                            className={classes.searchIcon}
                        >
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="بحث…"
                            value={search}
                            onChange={handleSearch}
                            onKeyDown={(e: any) => {
                                if (e.keyCode === 13) {
                                    searchCall();
                                }
                            }}
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
            height: "40px",
            alignItems: "center",
            width: "100%",
            zIndex: 5,
            boxShadow:
                "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
            backgroundColor: "black",
        },
        stripContent: {
            margin: "0 auto",
            width: "1200px",
            maxWidth: "95%",
        },
        stripSocialMedia: {
            display: "flex",
        },
        stripTxt: {
            fontSize: "16px",
            color: "white",
            fontWeight: 100,
            textAlign: "right",
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        appbar: {
            backgroundColor: "#313131",
            display: "flex",
            flexDirection: "column",
            height: "200px",
            width: "100%",
        },
        toolbar: {
            width: "1200px",
            maxWidth: "95%",
            height: "160px",
            display: "flex",
            alignItems: "flex-start",
            margin: "0 auto",
            [theme.breakpoints.down("xs")]: {
                justifyContent: "space-around",
            },
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
            cursor: "pointer",
            padding: theme.spacing(0, 1),
            height: "100%",
            position: "absolute",
            zIndex: 100,
            color: theme.palette.primary.main,
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
            height: "130px",
            minWidth: "177px",
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
            marginRight: "20px",
            "& div:last-child": {
                [theme.direction === "ltr" ? "marginLeft " : "marginRight"]: 0,
            },
        },
        tabItem: {
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
            padding: theme.spacing(0, 2),
            fontSize: theme.typography.body1.fontSize,
            textTransform: "capitalize",
            height: "100%",
            zIndex: 1,
            lineHeight: "40px",
            justifyContent: "center",
            whiteSpace: "nowrap",
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
            width: "100%",
            display: "flex",
            alignItems: "center",
            height: "100%",
            [theme.breakpoints.down("xs")]: {
                display: "none",
            },
        },
        sectionsContainer: {
            backgroundColor: theme.palette.grey[100],
            top: 0,
            left: 0,
            overflowX: "auto",
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
            maxWidth: "95%",
            margin: "auto",
        },
        motto: {
            textAlign: "center",
            marginTop: "5px",
            fontWeight: 900,
            color: "white",
            fontSize: "12px",
        },
    })
);

export default Navbar;
