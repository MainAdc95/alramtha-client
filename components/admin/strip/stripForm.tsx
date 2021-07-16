import {
    createStyles,
    makeStyles,
    Theme,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    TextField as MuiTextField,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { apiCall } from "../../../utils/apiCall";
import { RootReducer } from "../../../store/reducers";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { IStrip, StripType } from "../../../types/strip";

// components
import TextField from "../../form/input";
import Button from "../../form/button";
import Error from "../../form/error";

interface IProps {
    strip?: IStrip;
}

interface IState {
    title: string;
    type: StripType | "";
    link: string;
    duration: string;
}

interface IError {
    title: string[];
    duration: string[];
    type: string[];
}

const StripForm = ({ strip }: IProps) => {
    const classes = useStyles();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const user = useSelector((state: RootReducer) => state.auth.user);
    const [errors, setErrors] = useState<IError>({
        title: [],
        duration: [],
        type: [],
    });
    const [state, setState] = useState<IState>({
        title: "",
        type: "",
        link: "",
        duration: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (strip) {
            setState({
                ...state,
                title: strip.title || "",
                link: strip.link || "",
                type: strip.type || "",
                duration: strip.duration || "",
            });
        }
    }, [strip]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!handleValidate()) return;

        try {
            setLoading(true);

            if (!strip) {
                await apiCall("post", `/strips?authId=${user.user_id}`, state);
            } else {
                await apiCall(
                    "put",
                    `/strip/${strip.strip_id}?authId=${user.user_id}`,
                    state
                );
            }

            router.push("/admin/strips");
        } catch (err) {
            setErrors((prevErrors) => ({ ...prevErrors, ...err }));
        } finally {
            setLoading(false);
        }
    };

    const handleValidate = () => {
        const TmpErrors: IError = {
            title: [],
            type: [],
            duration: [],
        };

        if (!state.title.trim()) {
            TmpErrors.title.push("Please fill in strip name.");
        }

        if (!state.type.trim()) {
            TmpErrors.type.push("Please choose strip type.");
        }

        if (!state.duration.trim()) {
            TmpErrors.duration.push("Please choose duration.");
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

    // ____________________________ date
    const handleDateChange = (e) => {
        setState({ ...state, duration: e.target.value });
    };

    return (
        <>
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
                <div>
                    <div className={classes.double}>
                        <div>
                            <div className={classes.formGroup}>
                                <TextField
                                    name="title"
                                    label="عنوان"
                                    state={state}
                                    setState={setState}
                                    required={true}
                                    errors={errors}
                                    variant="outlined"
                                />
                            </div>
                            <div className={classes.formGroup}>
                                <TextField
                                    name="link"
                                    label="رابط"
                                    state={state}
                                    setState={setState}
                                    variant="outlined"
                                />
                            </div>
                        </div>
                        <div>
                            <div className={classes.formGroup}>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend">
                                        نوع الشريط
                                    </FormLabel>
                                    <RadioGroup
                                        aria-label="type"
                                        name="type"
                                        value={state.type}
                                        onChange={handleChange}
                                    >
                                        <FormControlLabel
                                            value="default"
                                            control={<Radio />}
                                            label="رسائل دائمة"
                                        />
                                        <FormControlLabel
                                            value="breakingNews"
                                            control={<Radio />}
                                            label="أخبار عاجلة"
                                        />
                                        <FormControlLabel
                                            value="announcement"
                                            control={<Radio />}
                                            label="تنويه"
                                        />
                                    </RadioGroup>
                                </FormControl>
                                <Error errors={errors.type} />
                            </div>
                            <div className={classes.formGroup}>
                                <MuiTextField
                                    label="المدة الزمنية"
                                    type="datetime-local"
                                    value={state.duration}
                                    onChange={handleDateChange}
                                    className={classes.textField}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                                <Error errors={errors.duration} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <Button
                            fullWidth
                            type="submit"
                            color="purple"
                            variant="contained"
                            loading={loading}
                            text={strip ? "احفظ التغييرات" : "اضافة الشريط"}
                        />
                    </div>
                </div>
            </form>
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
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
        colorBox: {
            width: "100%",
            height: "50px",
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[5],
        },
    })
);

export default StripForm;
