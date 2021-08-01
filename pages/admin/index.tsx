import {
    createStyles,
    makeStyles,
    Theme,
    Box,
    CircularProgress,
} from "@material-ui/core";
import { Line, Pie } from "react-chartjs-2";

// components
import WithRole from "../../protectors/withRole";
import Layout from "../../components/admin/layout";
import HeadLayout from "../../components/headLayout";
import useSWR from "swr";
import { useSelector } from "react-redux";
import { RootReducer } from "../../store/reducers";
import LargeNews from "../../components/news/largeNews";

const months = [
    "يناير",
    "فبراير",
    "مارس",
    "أبريل",
    "مايو",
    "يونيو",
    "يوليو",
    "أغسطس",
    "سبتمبر",
    "أكتوبر",
    "نوفمبر",
    "ديسمبر",
];

const ms = [...Array(12)].map((d, i) => i + 1);

const days = [...Array(30)].map((d, i) => i + 1);

const Admin = () => {
    const classes = useStyles();
    const user = useSelector((state: RootReducer) => state.auth.user);
    const { data } = useSWR(
        user?.user_id ? `/statistics?authId=${user?.user_id}` : ""
    );

    const sections = {
        labels: data?.sections?.map((s) => s.section_name),
        datasets: [
            {
                label: "عدد الاخبار حسب الأقسام",
                data: data?.sections?.map((s) =>
                    s.news.reduce((v, n) => {
                        return n + v;
                    }, 0)
                ),
                fill: true,
                backgroundColor: "rgba(2, 136, 254, 0.2)",
                borderColor: "rgb(2, 135, 254)",
                borderWidth: 1,
                hoverBorderColor: "black",
                scaleStepWidth: 1,
            },
        ],
    };

    const generateNewsPerDay = (news: any) => {
        const data = [];

        for (let d of days) {
            const date = new Date();
            date.setDate(date.getDate() - d + 1);

            const date2 = new Date();
            date2.setDate(date2.getDate() - d);

            const dataSet = news.filter(
                (n) =>
                    new Date(n.created_at) < date &&
                    new Date(n.created_at) > date2
            );

            data.push(dataSet.length);
        }

        return data;
    };

    const newsPerDay = {
        labels: days,
        datasets: [
            {
                label: "عدد الأخبار المنشورة يوميا",
                data: data?.news ? generateNewsPerDay(data.newsPerDay) : [],
                fill: true,
                backgroundColor: "rgba(102, 45, 145, 0.2)",
                borderColor: "rgb(102, 45, 145)",
                borderWidth: 1,
                hoverBackgroundColor: "black",
                hoverBorderColor: "black",
                tension: 0.4,
                scaleStepWidth: 1,
            },
        ],
    };

    const generateData = (news: any) => {
        const data = [];

        for (let m of ms) {
            const dataSet = news.filter(
                (n) => new Date(n.created_at).getMonth() === m
            );

            const total = dataSet.reduce((v, n) => {
                return n.readers + v;
            }, 0);

            data.push(total);
        }

        return data;
    };

    const news = {
        labels: months,
        datasets: [
            {
                label: "عدد الأخبار لهذه السنة",
                data: data?.news ? generateData(data.news) : [],
                fill: true,
                backgroundColor: "#9e005c3b",
                borderColor: "#9E005D90",
                borderWidth: 1,
                hoverBackgroundColor: "black",
                hoverBorderColor: "black",
                scaleStepWidth: 1,
                tension: 0.4,
            },
        ],
    };

    return (
        <>
            <HeadLayout title="Admin" />
            <WithRole role="is_admin">
                <Layout>
                    {!data ? (
                        <Box mt={10} display="flex" justifyContent="center">
                            <CircularProgress />
                        </Box>
                    ) : (
                        <>
                            <Box className={classes.double}>
                                <div className={classes.newPerDayContainer}>
                                    <Line data={newsPerDay} />
                                </div>
                                <div>
                                    <Line data={news} />
                                </div>
                            </Box>
                            <Box className={classes.double}>
                                <div>
                                    <Pie data={sections} />
                                </div>
                                <Box>
                                    <Box mb={2}>
                                        <h3>أكثر 20 خبر قراءة لهذا الشهر</h3>
                                    </Box>
                                    <div className={classes.newsList}>
                                        {data?.latestNews?.map((n) => (
                                            <LargeNews news={n} />
                                        ))}
                                    </div>
                                </Box>
                            </Box>
                        </>
                    )}
                </Layout>
            </WithRole>
        </>
    );
    return null;
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
        double: {
            display: "grid",
            [theme.breakpoints.up("lg")]: {
                gridTemplateColumns: "1fr 1fr",
            },
            gridTemplateColumns: "1fr",
            gridGap: "20px",
            marginBottom: "20px",
        },
        newsList: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridGap: "20px",
            maxHeight: "800px",
            overflowY: "auto",
        },
        newPerDayContainer: {
            margin: "20px 0",
        },
    });
});

export default Admin;
