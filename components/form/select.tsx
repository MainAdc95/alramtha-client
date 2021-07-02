import {
    makeStyles,
    createStyles,
    Theme,
    Box,
    Select as MuSelect,
    MenuItem,
    InputLabel,
    FormControl,
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
    children?: React.ReactNode[];
}

const Select = ({
    width,
    variant,
    size,
    errors,
    name,
    label,
    setState,
    state,
    required,
    value,
    children,
}: IProps) => {
    const classes = useStyles();

    // __________________________ event handlers

    // text
    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    return (
        <Box width={width ? width : "100%"}>
            <FormControl
                size={size || "small"}
                variant={variant || "outlined"}
                fullWidth
                className={classes.root}
                error={errors ? !!errors[name]?.length : false}
            >
                <InputLabel>{label}</InputLabel>
                <MuSelect
                    value={value != undefined ? value : state[name]}
                    name={name}
                    label={label}
                    onChange={handleChange}
                    required={required}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {children}
                </MuSelect>
            </FormControl>
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

export default Select;
