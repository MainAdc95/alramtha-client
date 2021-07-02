import { createStyles, makeStyles, Theme, IconButton } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootReducer } from "../../../store/reducers";
import { useRouter } from "next/router";
import useSWR from "swr";

// components
import WithRole from "../../../protectors/withRole";
import Layout from "../../../components/admin/layout";
import HeadLayout from "../../../components/headLayout";

// icons
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import NewsForm from "../../../components/admin/news/newsForm";

const Form = () => {
    const router = useRouter();
    const { data: news } = useSWR(
        router.query.newsId ? `/news/${router.query.newsId}` : null
    );
    const locale = useSelector((state: RootReducer) => state.locale);
    const classes = useStyles({ locale });

    const handleBack = () => {
        router.push("/admin/news");
    };

    return (
        <>
            <HeadLayout title="Admin news form" />
            <WithRole role="is_admin">
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
                            <h1 className={classes.title}>News form</h1>
                        </div>
                    </div>
                    <div className={classes.body}>
                        <NewsForm news={news} />
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
