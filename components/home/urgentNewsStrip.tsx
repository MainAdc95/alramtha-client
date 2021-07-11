import {
    createStyles,
    makeStyles,
    Theme,
    Box,
    Typography,
} from "@material-ui/core";
import Marquee from "react-fast-marquee";
import Link from "next/link";
import { IStrip, StripType } from "../../types/strip";

interface IProps {
    strips: IStrip[];
}

const UrgentNewsStrip = ({ strips }: IProps) => {
    const classes = useStyles();

    const getColor = (strip: StripType) => {
        switch (strip) {
            case "breakingNews":
                return "red";
            case "announcement":
                return "rgb(2, 135, 254)";
            default:
                "#000";
        }
    };

    return (
        <Box display="flex" className={classes.root}>
            <Box className={classes.badge} display="flex">
                <Typography>أخبار عاجلة</Typography>
                <div className={classes.imgContainer}>
                    <img className={classes.img} src="/urgent.svg" />
                </div>
            </Box>
            <Marquee pauseOnHover speed={60} gradient={false}>
                {strips.map((s) => (
                    <Link key={s.strip_id} href={s.link}>
                        <a className={classes.newsLink} title={s.title}>
                            <p>
                                <span style={{ color: getColor(s.type) }}>
                                    {s.title}
                                </span>{" "}
                                <span className={classes.time}>
                                    {new Date(
                                        s.created_at
                                    ).toLocaleDateString()}
                                </span>
                            </p>
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
        time: {
            fontSize: "10px",
            margin: "0 10px",
        },
    })
);

export default UrgentNewsStrip;
