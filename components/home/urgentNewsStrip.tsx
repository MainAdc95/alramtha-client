import { createStyles, makeStyles, Theme, Box } from "@material-ui/core";
import { useState, useEffect } from "react";
import Marquee from "react-marquee-slider";
import Link from "next/link";
import { IStrip, StripType } from "../../types/strip";

interface IProps {
    strips: IStrip[];
}

const UrgentNewsStrip = ({ strips }: IProps) => {
    const classes = useStyles();
    const [vol, setVol] = useState(50);

    useEffect(() => {
        const handler = () => {
            let extra = 0;

            if (window.innerWidth <= 1200) {
                strips.forEach(() => (extra += 0.5));
                setVol(extra);
            } else if (window.innerWidth <= 500) {
                strips.forEach(() => (extra += 0.2));
                setVol(extra);
            } else if (window.innerWidth > 1200) {
                strips.forEach(() => (extra += 2));
                setVol(extra);
            }
        };

        handler();

        window.addEventListener("resize", handler);

        return () => {
            window.removeEventListener("resize", handler);
        };
    }, []);

    const handleVol = (v?: number) => {
        setVol(v);
    };

    return (
        <Box
            onMouseOver={() => handleVol(0)}
            onMouseLeave={() => handleVol(50)}
            display="flex"
            className={classes.root}
        >
            {strips?.length ? (
                // @ts-ignore
                <Marquee direction="ltr" velocity={vol}>
                    {strips.map((s) => {
                        if (s.type === "default") return null;

                        if (
                            new Date(s.duration).getTime() >
                            new Date().getTime()
                        )
                            return (
                                <Strip
                                    key={s.strip_id}
                                    strip={s}
                                    classes={classes}
                                />
                            );

                        return null;
                    })}
                </Marquee>
            ) : null}
        </Box>
    );
};

const Strip = ({ strip, classes }: { strip?: IStrip; classes: any }) => {
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

    const translateType = (type: StripType) => {
        switch (type) {
            case "default":
                return "رسائل دائمة";
            case "breakingNews":
                return "خبر عاجل";
            case "announcement":
                return "تنويه";
            default:
                return "";
        }
    };

    return (
        <Link href={strip.link}>
            <a className={classes.newsLink} title={strip.title}>
                <p>
                    <span
                        style={{ backgroundColor: getColor(strip.type) }}
                        className={classes.stripType}
                    >
                        {translateType(strip.type)}
                    </span>
                    <span
                        style={{
                            color: getColor(strip.type),
                            fontSize: "14px",
                        }}
                    >
                        {strip.title}
                    </span>{" "}
                    <span className={classes.time}>
                        {new Date(strip.created_at).toLocaleString("ar")}
                    </span>
                </p>
            </a>
        </Link>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            alignItems: "center",
            width: "100%",
            margin: "auto",
            boxShadow: theme.shadows[2],
        },
        newsLink: {
            display: "flex",
            padding: theme.spacing(1.5, 2),
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
            fontSize: "12px",
            margin: "0 10px",
        },
        marquee: {
            backgroundColor: "pink",
        },
        stripType: {
            padding: "2px 5px",
            display: "inline-block",
            borderRadius: "5px",
            color: "white",
            margin: "0 10px",
            fontSize: "10px",
            fontWeight: 900,
            boxShadow:
                "0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
        },
    })
);

export default UrgentNewsStrip;
