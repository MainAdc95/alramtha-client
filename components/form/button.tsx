import {
    makeStyles,
    createStyles,
    Theme,
    Button as MuButton,
    CircularProgress,
} from "@material-ui/core";
import { CpmcColors, cpmcPalette } from "../../data/theme";

interface IProps {
    text: string;
    loading?: boolean;
    fullWidth?: boolean;
    type?: "submit" | "button";
    variant?: "outlined" | "contained" | "text";
    onClick?: any;
    disabled?: boolean;
    color?: CpmcColors;
    startIcon?: React.ReactNode;
}

const Button = ({
    loading,
    text,
    fullWidth,
    type,
    variant,
    onClick,
    disabled,
    color,
    startIcon,
}: IProps) => {
    const classes = useStyles({ color: color || "purple" });

    return (
        <MuButton
            variant={variant || "text"}
            type={type || "button"}
            className={classes.button}
            fullWidth={fullWidth}
            onClick={onClick}
            disabled={loading || disabled}
            startIcon={startIcon || null}
        >
            {loading ? <CircularProgress className={classes.progress} /> : text}
        </MuButton>
    );
};

const bgColor = (props: any) => cpmcPalette[props.color]?.main;
const textColor = (props: any) => cpmcPalette[props.color]?.text;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            backgroundColor: bgColor,
            color: cpmcPalette.purple.text,
            "&:hover": {
                backgroundColor: bgColor,
                borderColor: bgColor,
                boxShadow: "none",
            },
            "&:active": {
                boxShadow: "none",
                backgroundColor: bgColor,
                borderColor: bgColor,
            },
        },
        progress: {
            color: textColor,
            maxWidth: "35px",
            maxHeight: "35px",
        },
    })
);

export default Button;
