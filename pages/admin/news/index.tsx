import { createStyles, makeStyles, Theme, Box } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootReducer } from "../../../store/reducers";
import { INews } from "../../../types/news";
import useSWR from "swr";
import Link from "next/link";

// components
import WithRole from "../../../protectors/withRole";
import Layout from "../../../components/admin/layout";
import Button from "../../../components/form/button";
import HeadLayout from "../../../components/headLayout";
import NewsList from "../../../components/admin/news/newsList";

// icons
import AddIcon from "@material-ui/icons/Add";

const News = () => {
    const locale = useSelector((state: RootReducer) => state.locale);
    const classes = useStyles({ locale });

    return (
        <>
            <HeadLayout title="Admin news" />
            <WithRole role="is_admin">
                <Layout>
                    <div className={classes.head}>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            width="100%"
                        >
                            <div>
                                <h1 className={classes.title}>أرشيف الأخبار</h1>
                            </div>
                            <Link href="/admin/news/addNews">
                                <a className="ltr">
                                    <Button
                                        startIcon={<AddIcon />}
                                        text="أضافة خبر"
                                    />
                                </a>
                            </Link>
                        </Box>
                    </div>
                    <div className={classes.body}>
                        <NewsList />
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
        body: {
            width: "100%",
            maxWidth: "100%",
        },
    });
});
export default News;
