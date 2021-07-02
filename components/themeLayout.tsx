import { createMuiTheme, ThemeProvider } from "@material-ui/core";

interface IProps {
    children: React.ReactNode;
}

const Theme = ({ children }: IProps) => {
    const theme = createMuiTheme({
        palette: {
            type: "light",
            primary: {
                light: "#3093ff",
                main: "#007aff",
                dark: "#005dc2",
            },
            secondary: {
                light: "#4f4f4f",
                main: "#333333",
                dark: "#000000",
            },
        },
    });

    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default Theme;
