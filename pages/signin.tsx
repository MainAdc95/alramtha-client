import { createStyles, makeStyles, Theme } from "@material-ui/core";

// components
import SigninForm from "../components/signin/signinForm";

const Signin = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.formContainer}>
                <SigninForm />
            </div>
        </div>
    );
};

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        root: {
            display: "flex",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "50px",
        },
        formContainer: {
            margin: "auto",
            [theme.breakpoints.down("xs")]: {
                width: "90%",
            },
            width: "500px",
        },
    });
});

export default Signin;
