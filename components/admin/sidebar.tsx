import { createStyles, makeStyles, Theme, Divider } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { tabs } from "../../data/adminTabs";
import { RootReducer } from "../../store/reducers";
import ImageOpt from "../../components/imageOpt";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Role } from "../../types/user";
import { signoutCall } from "../../store/actions/auth";

const Sidebar = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const classes = useStyles();
    const [active, setActive] = useState<string | null>(null);
    const user = useSelector((state: RootReducer) => state.auth.user);

    useEffect(() => {
        setActive(router.pathname);
    }, [router.pathname]);

    const handleRole = (role: Role) => {
        switch (role) {
            case "is_super_admin":
                if (user.is_super_admin) return true;

                return false;
            case "is_admin":
                if (user.is_super_admin || user.is_admin) return true;

                return false;
            case "is_admin_assistant":
                if (
                    user.is_super_admin ||
                    user.is_admin ||
                    user.is_admin_assistant
                )
                    return true;

                return false;
            case "is_editor":
                if (
                    user.is_super_admin ||
                    user.is_admin ||
                    user.is_editor ||
                    user.is_admin_assistant
                )
                    return true;

                return false;
            case "is_reporter":
                if (user.is_super_admin || user.is_admin || user.is_reporter)
                    return true;

                return false;
            case "is_writer":
                if (
                    user.is_super_admin ||
                    user.is_admin ||
                    user.is_admin_assistant ||
                    user.is_writer ||
                    user.is_editor
                )
                    return true;

                return false;
            case "all":
                if (
                    user.is_super_admin ||
                    user.is_admin ||
                    user.is_reporter ||
                    user.is_editor ||
                    user.is_admin_assistant ||
                    user.is_writer
                )
                    return true;

                return false;
            default:
                false;
        }
    };

    const handleSignout = () => {
        dispatch(signoutCall());
    };

    return (
        <div className={classes.root}>
            <Link href="/">
                <a>
                    <div className={classes.listItem}>
                        <div className={classes.listImgContainer}>
                            <ImageOpt
                                src="/home.svg"
                                alt="home"
                                width={40}
                                location="local"
                                height={40}
                            />
                        </div>
                        <a>العودة إلى الرمسة</a>
                    </div>
                </a>
            </Link>
            <Divider />
            {tabs.map((tab, i) => {
                if (handleRole(tab.role as Role))
                    return (
                        <Link key={i} href={tab.link}>
                            <a
                                style={
                                    tab.isDisabled
                                        ? {
                                              backgroundColor:
                                                  "rgb(231, 231, 231)",
                                              pointerEvents: "none",
                                          }
                                        : null
                                }
                            >
                                <div
                                    className={`${classes.listItem}${
                                        tab.link === active
                                            ? ` ${classes.active}`
                                            : ""
                                    }`}
                                >
                                    <div className={classes.listImgContainer}>
                                        <ImageOpt
                                            src={tab.icon}
                                            alt=""
                                            width={40}
                                            location="local"
                                            height={40}
                                        />
                                    </div>
                                    <a>{tab.name}</a>
                                </div>
                            </a>
                        </Link>
                    );

                return null;
            })}
            <Divider />
            <div onClick={handleSignout} className={classes.listItem}>
                <div className={classes.listImgContainer}>
                    <ImageOpt
                        src="/signout.svg"
                        alt="home"
                        width={40}
                        location="local"
                        height={40}
                    />
                </div>
                <a>تسجيل خروج</a>
            </div>
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        root: {
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            boxShadow: theme.shadows[10],
            overflowY: "auto",
            backgroundColor: "white",
            // position: "sticky",
            // top: 0,
        },
        listItem: {
            width: "100%",
            padding: theme.spacing(1, 2),
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            "&:hover": {
                backgroundColor: "rgb(245, 245, 245)",
            },
        },
        listImgContainer: {
            [theme.direction === "ltr" ? "marginLeft" : "marginRight"]:
                theme.spacing(2),
        },
        active: {
            backgroundColor: "rgb(240, 240, 240)",
        },
    });
});

export default Sidebar;
