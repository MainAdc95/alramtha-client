import {
    createStyles,
    makeStyles,
    Theme,
    Box,
    Switch,
    FormControlLabel,
} from "@material-ui/core";
import { useEffect, useState, useRef, useCallback } from "react";
import { apiCall } from "../../../utils/apiCall";
import { RootReducer } from "../../../store/reducers";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { IPoll } from "../../../types/poll";

// components
import TextField from "../../form/input";
import Button from "../../form/button";
import Error from "../../form/error";

// icons
import RemoveIcon from "@material-ui/icons/Remove";

interface IProps {
    poll?: IPoll;
}

interface IError {
    title: string[];
    options: string[];
}

const randomString = () => Math.random().toString(36).substr(2, 9);

const useStateWithCallbackLazy = (initialValue) => {
    const callbackRef = useRef(null);
    const [state, setState] = useState({
        value: initialValue,
        revision: randomString(),
    });

    useEffect(() => {
        if (callbackRef.current) {
            callbackRef.current(state.value);

            callbackRef.current = null;
        }
    }, [state.revision, state.value]);

    const setValueWithCallback = useCallback((newValue, callback) => {
        callbackRef.current = callback;

        return setState({
            value: newValue,
            revision: randomString(),
        });
    }, []);

    return [state.value, setValueWithCallback];
};

const PollForm = ({ poll }: IProps) => {
    const classes = useStyles();
    const optionsContainer = useRef<HTMLDivElement | null>(null);
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const user = useSelector((state: RootReducer) => state.auth.user);
    const [option, setOption] = useState({
        option: "",
        error: "",
    });
    const [errors, setErrors] = useState<IError>({
        title: [],
        options: [],
    });
    const [state, setState] = useStateWithCallbackLazy({
        title: "",
        options: [{ name: "نعم" }, { name: "لا" }],
        is_active: true,
    });

    useEffect(() => {
        if (poll) {
            setState({
                ...state,
                title: poll.title,
                options: poll.options as any,
                is_active: poll.is_active,
            });
        }
    }, [poll]);

    const handleSubmit = async () => {
        if (!handleValidate()) return;

        try {
            setLoading(true);

            if (!poll) {
                await apiCall("post", `/polls?authId=${user.user_id}`, state);
            } else {
                await apiCall(
                    "put",
                    `/poll/${poll.poll_id}?authId=${user.user_id}`,
                    state
                );
            }

            router.push("/admin/polls");
        } catch (err) {
            setErrors((prevErrors) => ({ ...prevErrors, ...err }));
        } finally {
            setLoading(false);
        }
    };

    const handleValidate = () => {
        const TmpErrors: IError = {
            title: [],
            options: [],
        };

        if (!state.title.trim()) {
            TmpErrors.title.push("Please fill in question.");
        }

        if (!(state.options.length >= 2)) {
            TmpErrors.options.push("Please enter at least two options.");
        }

        setErrors(TmpErrors);

        for (let e of Object.values(TmpErrors)) {
            if (e.length) {
                window.scrollTo(0, 0);
                return false;
            }
        }

        return true;
    };

    // ____________________________________ handle op title
    const handleOption = (e: any) => {
        setOption({
            ...option,
            [e.target.name]: e.target.value,
        });

        validateOption(e.target.value);
    };

    const addOption = () => {
        if (validateOption(option.option)) return;

        setState(
            {
                ...state,
                options: [...state.options, { name: option.option }],
            },
            () => {
                if (optionsContainer.current) {
                    optionsContainer.current.scrollTo(
                        0,
                        optionsContainer.current.scrollHeight
                    );
                }
            }
        );

        setOption({ ...option, option: "" });
    };

    const removeOption = (index: any) => {
        setState({
            ...state,
            options: state.options.filter((s, i) => i !== index),
        });
    };

    const validateOption = (val: string) => {
        if (!val) {
            setOption((prev: any) => ({
                ...prev,
                error: "Please fill in answer.",
            }));

            return true;
        }

        setOption((prev: any) => ({ ...prev, error: "" }));
        return false;
    };

    const handleSwitch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    return (
        <>
            <div>
                <div>
                    <div className={classes.double}>
                        <div>
                            <div className={classes.formGroup}>
                                <TextField
                                    name="title"
                                    label="السؤال"
                                    state={state}
                                    multiline={true}
                                    setState={setState}
                                    required={true}
                                    errors={errors}
                                    variant="outlined"
                                />
                            </div>
                            <div className={classes.formGroup}>
                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={state.is_active}
                                            onChange={handleSwitch}
                                            name="is_active"
                                            color="primary"
                                        />
                                    }
                                    label="فعال"
                                />
                            </div>
                        </div>
                        <div>
                            {state.options.length ? (
                                <div
                                    ref={optionsContainer}
                                    style={{
                                        border: "1px solid rgba(102, 45, 145, 0.9)",
                                        borderRadius: "5px",
                                    }}
                                    className={classes.optionsWrapper}
                                >
                                    {state.options.map((op, i) => (
                                        <div
                                            key={i}
                                            className={classes.optionContainer}
                                        >
                                            <p>{op.name}</p>
                                            <div style={{ direction: "ltr" }}>
                                                <Button
                                                    onClick={() =>
                                                        removeOption(i)
                                                    }
                                                    text="حذف"
                                                    startIcon={<RemoveIcon />}
                                                    color="red"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : null}
                            <div className={classes.formGroup}>
                                <TextField
                                    name="option"
                                    label="الجواب"
                                    value={option.option}
                                    onChange={handleOption}
                                    onKeyDown={(e: any) => {
                                        if (e.keyCode === 13) {
                                            addOption();
                                        }
                                    }}
                                    errors={{
                                        option: option.error
                                            ? [option.error]
                                            : [],
                                    }}
                                    variant="outlined"
                                />
                                <Box mt={2}>
                                    <Button
                                        fullWidth
                                        type="button"
                                        color="purple"
                                        variant="contained"
                                        onClick={addOption}
                                        loading={loading}
                                        text={"أضافة جواب"}
                                    />
                                </Box>
                                <Error errors={errors.options} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <Button
                            fullWidth
                            type="button"
                            color="purple"
                            variant="contained"
                            loading={loading}
                            onClick={() => handleSubmit()}
                            text={poll ? "احفظ التغييرات" : "أضافة الاستطلاع"}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        grid: {
            flexGrow: 1,
        },
        formControl: {
            margin: theme.spacing(3),
        },
        formGroup: {
            padding: theme.spacing(0, 0, 3, 0),
        },
        double: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridGap: theme.spacing(10),
        },
        colorBox: {
            width: "100%",
            height: "50px",
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[5],
        },
        optionsWrapper: {
            margin: theme.spacing(0, 0, 3, 0),
            maxHeight: "350px",
            overflow: "auto",
            padding: "0 10px",
            paddingBottom: "0px",
            paddingTop: "15px",
        },
        optionContainer: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "15px",
        },
    })
);

export default PollForm;
