import { createStyles, makeStyles, Theme } from "@material-ui/core";
import HeadLayout from "./headLayout";
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
                <HeadLayout>
                    <meta
                        name="author"
                        content="CPMC (Crown Phoenix Marketing Consultancy L.L.C)"
                    />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0"
                    ></meta>
                </HeadLayout>
                <Navbar />
                {children}
                <Footer />
            </div>
        );
};

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        root: {},
    });
});

export default Layout;
