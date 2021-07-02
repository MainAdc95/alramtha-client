import {
    createStyles,
    makeStyles,
    Theme,
    Box,
    Typography,
} from "@material-ui/core";
import Marquee from "react-fast-marquee";
import Link from "next/link";

const news = [
    {
        title: "wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww",
    },
    {
        title: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    },
    {
        title: "vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv",
    },
];

const UrgentNewsStrip = () => {
    const classes = useStyles();

    return (
        <Box display="flex" className={classes.root}>
            <Box className={classes.badge} display="flex">
                <Typography>Urgent news</Typography>
                <div className={classes.imgContainer}>
                    <img className={classes.img} src="/urgent.svg" />
                </div>
            </Box>
            <Marquee pauseOnHover speed={60} gradient={false}>
                {news.map((n, i) => (
                    <Link key={i} href={n.title}>
                        <a className={classes.newsLink} title={n.title}>
                            {n.title}
                        </a>
                    </Link>
                ))}
            </Marquee>
        </Box>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            boxShadow: theme.shadows[4],
        },
        newsLink: {
            margin: theme.spacing(0, 3),
        },
        imgContainer: {
            width: "30px",
            height: "30px",
            [theme.direction === "ltr" ? "marginLeft" : "marginRight"]:
                theme.spacing(1),
        },
        img: {
            width: "100%",
            height: "100%",
        },
        badge: {
            whiteSpace: "nowrap",
            backgroundColor: theme.palette.error.main,
            padding: theme.spacing(1),
            color: "white",
            display: "flex",
            alignItems: "center",
        },
    })
);

export default UrgentNewsStrip;
