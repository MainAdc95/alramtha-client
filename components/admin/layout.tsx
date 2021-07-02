import { createStyles, makeStyles, Theme } from "@material-ui/core";
import ImageOpt from "../imageOpt";

// components
import Sidebar from "./sidebar";

interface IProps {
    children?: React.ReactNode;
}

const Layout = ({ children }: IProps) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.sidebar}>
                <Sidebar />
            </div>
            <div className={classes.children}>
                <div className="admin-logo">
                    <ImageOpt
                        src="/crownphoenix.svg"
                        width={300}
                        height={80}
                        location="local"
                    />
                </div>
                {children}
            </div>
        </div>
    );
};

const sidebarWidth = 250;

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        root: {
            display: "flex",
            width: "100%",
            maxWidth: "100%",
            minHeight: "100vh",
        },
        sidebar: {
            minWidth: `${sidebarWidth}px`,
            maxWidth: `${sidebarWidth}px`,
        },
        children: {
            width: `calc(100% - ${sidebarWidth}px)`,
            maxWidth: "100%",
            minHeight: "100vh",
            padding: theme.spacing(5),
            paddingTop: "0",
        },
    });
});

export default Layout;

// public

// username = doadmin
// password = pw8qmic44c907kxj
// host = alramsah-do-user-9442462-0.b.db.ondigitalocean.com
// port = 25060
// database = defaultdb
// sslmode = require

// private

// username = doadmin
// password = pw8qmic44c907kxj
// host = private-alramsah-do-user-9442462-0.b.db.ondigitalocean.com
// port = 25060
// database = defaultdb
// sslmode = require
