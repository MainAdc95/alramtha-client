import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Error from "../form/error";
import { apiCall } from "../../utils/apiCall";

// components
import Button from "../form/button";
import TextField from "../form/input";
import HeadLayout from "../headLayout";
import EmailVerfication from "./emailVerfication";

interface IState {
    first_name: string;
    last_name: string;
    username: string;
    email: string;
    password: string;
    phone: string;
    password2: string;
}

interface IError {
    all: string;
    first_name: string[];
    last_name: string[];
    username: string[];
    email: string[];
    password: string[];
    phone: string[];
    password2: string[];
}

const SigninForm = () => {
    const dispatch = useDispatch();
    const classes = useStyles();
    const [userId, setUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<IError>({
        all: "",
        first_name: [],
        last_name: [],
        username: [],
        email: [],
        password: [],
        phone: [],
        password2: [],
    });
    const [state, setState] = useState<IState>({
        first_name: "",
        last_name: "",
        username: "",
        email: "",
        password: "",
        phone: "",
        password2: "",
    });

    // _________________________________ submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!handleValidate()) return;

        try {
            setLoading(true);

            const { user_id } = await apiCall("post", `/auth/signup`, state);

            setUserId(user_id);
        } catch (err) {
            if (typeof err === "string")
                return setErrors((prevErrors) => ({ ...prevErrors, all: err }));

            setErrors((prevErrors) => ({ ...prevErrors, ...err }));
        } finally {
            setLoading(false);
        }
    };

    const handleValidate = () => {
        const TmpErrors: IError = {
            all: "",
            first_name: [],
            last_name: [],
            username: [],
            email: [],
            password: [],
            phone: [],
            password2: [],
        };

        if (!state.first_name)
            TmpErrors.first_name.push("Please fill in first name.");

        if (!state.last_name)
            TmpErrors.last_name.push("Please fill in last name.");

        if (!state.username)
            TmpErrors.username.push("Please fill in username.");

        if (!state.email) TmpErrors.email.push("Please fill in email.");

        if (!state.phone) TmpErrors.phone.push("Please fill in phone.");

        if (!state.password)
            TmpErrors.password.push("Please fill in password.");

        if (!state.password2)
            TmpErrors.password2.push("Please fill in verify password.");

        setErrors(TmpErrors);

        for (let e of Object.values(TmpErrors)) {
            if (e.length) {
                window.scrollTo(0, 0);
                return false;
            }
        }

        return true;
    };

    return (
        <>
            <HeadLayout title="Signin" />
            {userId ? (
                <EmailVerfication userId={userId} email={state.email} />
            ) : (
                <div>
                    <form onSubmit={handleSubmit}>
                        <Error errors={errors.all ? [errors.all] : []} />
                        <div className={classes.doubleInputContainer}>
                            <div className={classes.formGroup}>
                                <TextField
                                    name="first_name"
                                    label="First name"
                                    state={state}
                                    setState={setState}
                                    errors={errors}
                                />
                            </div>
                            <div className={classes.formGroup}>
                                <TextField
                                    name="last_name"
                                    label="Last name"
                                    state={state}
                                    setState={setState}
                                    errors={errors}
                                />
                            </div>
                        </div>
                        <div className={classes.formGroup}>
                            <TextField
                                name="username"
                                label="Username"
                                state={state}
                                setState={setState}
                                errors={errors}
                            />
                        </div>
                        <div className={classes.formGroup}>
                            <TextField
                                name="email"
                                label="Email"
                                state={state}
                                setState={setState}
                                errors={errors}
                            />
                        </div>
                        <div className={classes.formGroup}>
                            <TextField
                                name="phone"
                                label="Phone"
                                state={state}
                                setState={setState}
                                errors={errors}
                            />
                        </div>
                        <div className={classes.formGroup}>
                            <TextField
                                name="password"
                                label="Password"
                                type="password"
                                state={state}
                                setState={setState}
                                errors={errors}
                            />
                        </div>
                        <div className={classes.formGroup}>
                            <TextField
                                name="password2"
                                label="Verify password"
                                type="password"
                                state={state}
                                setState={setState}
                                errors={errors}
                            />
                        </div>
                        <div className={classes.formGroup}>
                            <Button
                                type="submit"
                                variant="contained"
                                loading={loading}
                                text="signin"
                            />
                        </div>
                    </form>
                </div>
            )}
        </>
    );
};

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        formGroup: {
            width: "100%",
            display: "flex",
            flexDirection: "column",
            padding: theme.spacing(1, 0),
        },
        doubleInputContainer: {
            [theme.breakpoints.up("sm")]: {
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gridGap: theme.spacing(3),
            },
        },
    });
});

export default SigninForm;
