import { useState } from "react";
import { Typography, Box } from "@material-ui/core";
import Link from "next/link";
import { apiCall } from "../../utils/apiCall";

// components
import Button from "../form/button";

const EmailVerfication = ({ userId, email }) => {
    const [timer, setTimer] = useState(0);

    const resendEmail = async () => {
        setTimer(60);

        const i = setInterval(() => {
            setTimer((prevState) => {
                if (!((prevState as number) - 1)) clearInterval(i);
                return prevState - 1;
            });
        }, 1000);

        await apiCall("post", `/auth/resend_activate_account_email/${userId}`);
    };

    return (
        <Box width="100%" borderRadius={5} style={{ textAlign: "center" }}>
            <Typography variant="h4">Please verify your email.</Typography>
            <Box mt={3} mb={3}>
                <Typography>
                    You are almost there, We have sent an email to
                </Typography>
                <Typography>
                    <b>{email}</b>
                </Typography>
            </Box>
            <Box mb={5}>
                <Typography>
                    Just follow the steps in the email to complete your signup.
                    If you don't see it, you may need to check your spam folder.
                </Typography>
            </Box>
            <Box mb={3}>
                <Box mb={1}>
                    <Typography>Still can't find the email?</Typography>
                </Box>
                <Button
                    text={!timer ? "resend email" : `${timer}`}
                    onClick={resendEmail}
                    variant="contained"
                    color="pink"
                    disabled={timer ? true : false}
                />
            </Box>
            <Box>
                <Typography>
                    Need help?{" "}
                    <Link href="/contactUs">
                        <a>Contact us</a>
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default EmailVerfication;
