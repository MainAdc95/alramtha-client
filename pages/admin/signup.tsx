import { createStyles, makeStyles, Theme, Box } from "@material-ui/core";
import ImageOpt from "../../components/imageOpt";
import Signedout from "../../protectors/signedOut";

// components
import SignupForm from "../../components/signup/signupForm";
import HeadLayout from "../../components/headLayout";

const Signin = () => {
    const classes = useStyles();

    return (
        <>
            <HeadLayout title="Admin Signup" />
            <Signedout>
                <div className={classes.root}>
                    <div className={classes.formContainer}>
                        <Box
                            mb={2}
                            display="flex"
                            justifyContent="center"
                            width="100%"
                        >
                            <div
                                className={classes.logoContainer}
                                title="Crown Phoenix Marketing Consultency L.L.C"
                            >
                                <ImageOpt
                                    src="/cpmcLogo.svg"
                                    alt="crown phoenix marketing consultency"
                                    width={120}
                                    height={120}
                                    location="local"
                                    draggable={false}
                                />
                            </div>
                        </Box>
                        <SignupForm />
                    </div>
                </div>
            </Signedout>
        </>
    );
};

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        root: {
            display: "flex",
            justifyContent: "center",
            minHeight: "100vh",
            padding: theme.spacing(12, 0, 8, 0),
        },
        formContainer: {
            backgroundColor: "white",
            position: "relative",
            boxShadow: theme.shadows[10],
            padding: theme.spacing(8, 2, 2, 2),
            borderRadius: theme.shape.borderRadius,
            margin: "auto",
            [theme.breakpoints.down("xs")]: {
                width: "95%",
            },
            width: "590px",
        },
        logoContainer: {
            position: "absolute",
            bottom: "calc(100% - 60px)",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "white",
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            boxShadow: theme.shadows[10],
            zIndex: 2,
        },
    });
});

export default Signin;
