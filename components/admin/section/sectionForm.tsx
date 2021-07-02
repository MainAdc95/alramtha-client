import {
    createStyles,
    makeStyles,
    Theme,
    Popover,
    Button as MuButton,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { apiCall } from "../../../utils/apiCall";
import { RootReducer } from "../../../store/reducers";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { ISection } from "../../../types/section";
import { ChromePicker } from "react-color";

// components
import TextField from "../../form/input";
import Button from "../../form/button";

interface IProps {
    section?: ISection;
}

interface IState {
    section_name: string;
    color: string;
}

interface IError {
    section_name: string[];
    color: string[];
}

const SectionForm = ({ section }: IProps) => {
    const classes = useStyles();
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const user = useSelector((state: RootReducer) => state.auth.user);
    const [errors, setErrors] = useState<IError>({
        section_name: [],
        color: [],
    });
    const [state, setState] = useState<IState>({
        section_name: "",
        color: "#333",
    });

    useEffect(() => {
        if (section) {
            setState({
                ...state,
                section_name: section.section_name,
                color: section.color,
            });
        }
    }, [section]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!handleValidate()) return;

        try {
            setLoading(true);

            if (!section) {
                await apiCall(
                    "post",
                    `/sections?authId=${user.user_id}`,
                    state
                );
            } else {
                await apiCall(
                    "put",
                    `/section/${section.section_id}?authId=${user.user_id}`,
                    state
                );
            }

            router.push("/admin/sections");
        } catch (err) {
            setErrors((prevErrors) => ({ ...prevErrors, ...err }));
        } finally {
            setLoading(false);
        }
    };

    const handleValidate = () => {
        const TmpErrors: IError = {
            section_name: [],
            color: [],
        };

        if (!state.section_name.trim()) {
            TmpErrors.section_name.push("Please fill in section name.");
        }

        if (!state.color) {
            TmpErrors.color.push("Please pick a color.");
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

    const handleChangeColor = (color: any, event: any) => {
        setState({ ...state, color: color.hex });
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
                <div>
                    <div className={classes.double}>
                        <div className={classes.formGroup}>
                            <TextField
                                name="section_name"
                                label="Title"
                                state={state}
                                setState={setState}
                                required={true}
                                errors={errors}
                                variant="outlined"
                            />
                        </div>
                        <div className={classes.formGroup}>
                            <MuButton
                                className={classes.colorBox}
                                onClick={handleClick}
                                style={{ backgroundColor: state.color }}
                            ></MuButton>
                            <Popover
                                open={open}
                                anchorEl={anchorEl}
                                onClose={handleClose}
                                anchorOrigin={{
                                    vertical: "center",
                                    horizontal: "right",
                                }}
                                transformOrigin={{
                                    vertical: "center",
                                    horizontal: "left",
                                }}
                            >
                                <ChromePicker
                                    onChange={handleChangeColor}
                                    color={state.color}
                                    disableAlpha
                                />
                            </Popover>
                        </div>
                    </div>
                    <div>
                        <Button
                            fullWidth
                            type="submit"
                            color="purple"
                            variant="contained"
                            loading={loading}
                            text={section ? "edit section" : "add section"}
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
        colorBox: {
            width: "100%",
            height: "50px",
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[5],
        },
    })
);

export default SectionForm;
