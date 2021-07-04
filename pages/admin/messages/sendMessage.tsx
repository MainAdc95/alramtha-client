import { createStyles, makeStyles, Theme, IconButton } from "@material-ui/core";
import { useSelector } from "react-redux";
import useSWR from "swr";
import { RootReducer } from "../../../store/reducers";
import { useRouter } from "next/router";

// components
import WithRole from "../../../protectors/withRole";
import Layout from "../../../components/admin/layout";
import HeadLayout from "../../../components/headLayout";

// icons
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import MessageForm from "../../../components/admin/message/messageForm";

const Form = () => {
    const router = useRouter();
    const user = useSelector((state: RootReducer) => state.auth.user);
    const { data: message } = useSWR(
        router.query.messageId && user
            ? `/message/${router.query.messageId}?authId=${user.user_id}`
            : null
    );
    const locale = useSelector((state: RootReducer) => state.locale);
    const classes = useStyles({ locale });

    const handleBack = () => {
        router.push("/admin/messages");
    };

    return (
        <>
            <HeadLayout title="Admin Message Form" />
            <WithRole role="all">
                <Layout>
                    <div className={classes.head}>
                        <div className={classes.backContainer}>
                            <IconButton onClick={handleBack} title="back">
                                {locale === "en" ? (
                                    <ArrowBackIcon />
                                ) : (
                                    <ArrowForwardIcon />
                                )}
                            </IconButton>
                        </div>
                        <div>
                            <h1 className={classes.title}>نموذج الرسالة</h1>
                        </div>
                    </div>
                    <div className={classes.body}>
                        <MessageForm message={message} />
                    </div>
                </Layout>
            </WithRole>
        </>
    );
};

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        head: {
            width: "100%",
            padding: theme.spacing(2, 0),
            marginBottom: theme.spacing(2),
            display: "flex",
            alignItems: "center",
        },
        title: {
            fontWeight: 300,
        },
        backContainer: {
            margin: (props: any) =>
                props.locale === "en"
                    ? theme.spacing(0, 2, 0, 0)
                    : theme.spacing(0, 0, 0, 2),
        },
        body: {
            width: "100%",
            maxWidth: "100%",
        },
    });
});
export default Form;
