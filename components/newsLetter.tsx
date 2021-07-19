import {
    Box,
    TextField,
    makeStyles,
    Theme,
    createStyles,
    Button,
    CircularProgress,
} from "@material-ui/core";
import { useState } from "react";
import { apiCall } from "../utils/apiCall";
import Error from "./form/error";

const emailRegex =
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

const Newsletter = () => {
    const classes = useStyles();
    const [state, setState] = useState({ email: "" });
    const [isDisabled, setDisabled] = useState(false);
    const [greet, setGreet] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        email: [],
    });

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!handleValidate()) return;

        setLoading(true);
        await apiCall("post", `/news_letter`, state);

        setLoading(false);
        setGreet(true);

        setTimeout(() => {
            setDisabled(true);
        }, 5000);
    };

    const handleValidate = () => {
        const TmpErrors = {
            email: [],
        };

        if (!state.email) TmpErrors.email.push("يرجى ملء البريد الإلكتروني.");

        if (state.email && !emailRegex.test(state.email))
            TmpErrors.email.push("البريد الإلكتروني غير صحيح.");

        setErrors(TmpErrors);

        for (let e of Object.values(TmpErrors)) {
            if (e.length) {
                return false;
            }
        }

        return true;
    };

    if (isDisabled) return null;
    return (
        <Box className={classes.root}>
            {greet ? (
                <p className={classes.greet}>
                    شكرا لك على الاشتراك في نشرتنا الإخبارية.
                </p>
            ) : (
                <>
                    <p className={classes.title}>اشترك في نشرتنا الإخبارية.</p>
                    <TextField
                        value={state.email}
                        name="email"
                        fullWidth
                        label="البريد الإلكتروني"
                        classes={{ root: classes.input }}
                        onChange={handleChange}
                        size="small"
                        variant="filled"
                    />
                    <Error errors={errors.email} />
                    <Box mt={2}>
                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            fullWidth
                            color="primary"
                        >
                            {loading ? (
                                <CircularProgress
                                    style={{ width: "30px", height: "30px" }}
                                />
                            ) : (
                                "ارسال"
                            )}
                        </Button>
                    </Box>
                </>
            )}
        </Box>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: "#313131",
            borderRadius: "5px",
            padding: "15px 10px",
            color: "white",
            marginBottom: "30px",
            boxShadow: `0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)`,
        },
        greet: {
            fontSize: "18px",
            color: "rgb(255, 255, 255)",
        },
        title: {
            fontSize: "18px",
            marginBottom: "20px",
        },
        input: {
            width: "100%",
            "& label.MuiInputLabel-root": {
                color: "black",
            },
            "& label.Mui-focused": {},
            "& .MuiInput-underline:after": {
                borderBottomColor: "rgb(255, 255, 255)",
            },
            "& .MuiInputBase-input": {
                borderRadius: "5px 5px 0 0",
                color: "black",
                backgroundColor: "rgb(255, 255, 255)",
            },
            "& .MuiOutlinedInput-root": {
                backgroundColor: "white",
                "& fieldset": {},
                "&:hover fieldset": {
                    borderColor: "white",
                },
                "&.Mui-focused fieldset": {
                    borderColor: "rgb(255, 255, 255)",
                },
            },
        },
    })
);

export default Newsletter;
