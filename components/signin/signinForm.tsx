import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { signinSuccess, signinRemoveError } from "../../store/actions/auth";
import Error from "../form/error";

// components
import Button from "../form/button";
import TextField from "../form/input";
import HeadLayout from "../headLayout";
import { apiCall } from "../../utils/apiCall";
import { IUser } from "../../types/user";

interface IState {
    identifier: string;
    password: string;
}

interface IError {
    all: string;
    identifier: string[];
    password: string[];
}

const SigninForm = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<IError>({
        all: "",
        identifier: [],
        password: [],
    });
    const [state, setState] = useState<IState>({
        identifier: "",
        password: "",
    });

    useEffect(() => {
        return () => {
            dispatch(signinRemoveError());
        };
    }, []);

    // -------------------------- submit
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!handleValidate()) return;

        try {
            setLoading(true);

            const user = await apiCall<IUser>("post", `/auth/signin`, state);

            dispatch(signinSuccess(user));
        } catch (err) {
            if (typeof err === "string")
                return setErrors((prevErrors) => ({ ...prevErrors, all: err }));

            setErrors((prevErrors) => ({ ...prevErrors, ...err }));
        } finally {
            setState({ ...state, identifier: "", password: "" });

            setLoading(false);
        }
    };

    const handleValidate = () => {
        const TmpErrors: IError = {
            all: "",
            identifier: [],
            password: [],
        };

        if (!state.identifier) {
            TmpErrors.identifier.push("Please fill in email / username.");
        }

        if (!state.password)
            TmpErrors.password.push("Please fill in password.");

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
            <div>
                <form onSubmit={handleSubmit}>
                    <Error errors={errors.all ? [errors.all] : []} />
                    <div className={classes.formGroup}>
                        <TextField
                            name="identifier"
                            label="Email / Username"
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
                        <Button
                            type="submit"
                            variant="contained"
                            loading={loading}
                            text="signin"
                        />
                    </div>
                </form>
            </div>
        </>
    );
};

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        formGroup: {
            display: "flex",
            flexDirection: "column",
            padding: theme.spacing(1, 0),
        },
    });
});

export default SigninForm;
