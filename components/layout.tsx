import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { useRouter } from "next/router";

// components
import Footer from "./footer";
import Navbar from "./navbar";

interface Props {
    children?: React.ReactNode;
}

const Layout = ({ children }: Props) => {
    const router = useRouter();
    const classes = useStyles();

    if (`/${router.pathname.split("/")[1]}` === "/admin")
        return <>{children}</>;
    else
        return (
            <div className={classes.root}>
                <Navbar />
                {children}
                <Footer />
            </div>
        );
};

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        root: {
            overflowX: "hidden",
        },
    });
});

export default Layout;
