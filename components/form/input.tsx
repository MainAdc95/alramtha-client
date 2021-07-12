import {
    makeStyles,
    createStyles,
    Theme,
    TextField as MuTextField,
    Box,
} from "@material-ui/core";
import { cpmcPalette } from "../../data/theme";
import Error from "./error";

interface IProps {
    name: string;
    label: string;
    state?: any;
    setState?: any;
    errors?: any;
    size?: "small" | "medium";
    width?: string;
    type?: "password" | "text" | "number";
    variant?: "outlined" | "standard" | "filled";
    required?: boolean;
    onChange?: any;
    value?: any;
    placeholder?: string;
    onKeyDown?: any;
}

const TextField = ({
    width,
    type,
    variant,
    size,
    errors,
    name,
    label,
    setState,
    state,
    required,
    onChange,
    value,
    placeholder,
    onKeyDown,
    ...params
}: IProps) => {
    const classes = useStyles();

    // __________________________ event handlers

    // text
    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    return (
        <Box dir="rtl" width={width ? width : "100%"}>
            <MuTextField
                {...params}
                onKeyDown={onKeyDown}
                type={type === "password" ? type : "text"}
                variant={variant || "outlined"}
                required={required}
                size={size || "small"}
                name={name}
                label={label}
                value={value != undefined ? value : state ? state[name] : null}
                onChange={onChange === "none" ? null : onChange || handleChange}
                className={classes.root}
                placeholder={placeholder}
                error={errors ? !!errors[name]?.length : false}
            />
            {errors && <Error errors={errors[name]} />}
        </Box>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            "& label.Mui-focused": {
                color: cpmcPalette.purple.main,
            },
            "& .MuiInput-underline:after": {
                borderBottomColor: cpmcPalette.purple.main,
            },
            "& .MuiOutlinedInput-root": {
                "& fieldset": {
                    borderColor: cpmcPalette.purple.main,
                },
                "&:hover fieldset": {
                    borderColor: cpmcPalette.purple.light,
                },
                "&.Mui-focused fieldset": {
                    borderColor: cpmcPalette.purple.main,
                },
            },
        },
    })
);

export default TextField;
