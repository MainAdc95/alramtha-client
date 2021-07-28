import {
    createStyles,
    makeStyles,
    Theme,
    Box,
    Tab,
    Tabs,
    CircularProgress,
    Button,
} from "@material-ui/core";
import { useState } from "react";
import ImageOpt from "../../../components/imageOpt";
import { rss } from "../../../data/rss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { apiCall } from "../../../utils/apiCall";
import { useRouter } from "next/router";
import { addToCreateNews } from "../../../store/actions/news";

// styles
import styles from "../../../styles/NewsFeed.module.scss";

// components
import WithRole from "../../../protectors/withRole";
import Layout from "../../../components/admin/layout";
import HeadLayout from "../../../components/headLayout";
import ImageForm from "../../../components/admin/image/imageForm";

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const NewsFeed = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const classes = useStyles();
    const [provider, setProvider] = useState(0);
    const [service, setService] = useState(0);
    const [selectedProvider, seSelectedtProvider] = useState<any>(null);
    const [selectedService, setSelectedService] = useState<any>(null);
    const [news, setNews] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [activeImg, setActiveImg] = useState<number | null>(null);
    const [thumbnail, setThumbnail] = useState("");
    const [activeNews, setActiveNews] = useState<any>(null);

    // ___________________________________ provider
    useEffect(() => {
        seSelectedtProvider(rss[provider]);
    }, [provider]);

    const handleProvider = (event: React.ChangeEvent<{}>, newValue: number) => {
        setProvider(newValue);
    };

    // ___________________________________ service
    useEffect(() => {
        if (selectedProvider) {
            setSelectedService(selectedProvider?.services[0]);
            setService(0);
        }
    }, [selectedProvider]);

    useEffect(() => {
        (async () => {
            if (selectedService) {
                setLoading(true);
                const data = await apiCall<string>(
                    "get",
                    `/rss/${selectedService.link}`,
                    null
                );

                // @ts-ignore
                setNews(data?.items || []);
                setLoading(false);
            }
        })();
    }, [selectedService]);

    const handleService = (event: React.ChangeEvent<{}>, newValue: number) => {
        setService(newValue);
        setSelectedService(selectedProvider?.services[newValue]);
    };

    // _________________________________ active image
    const handleImg = (index?: number) => {
        setActiveImg(activeImg === null ? index : null);
    };

    // _________________________________ create nwes
    const toggleThumbnail = (url?: string) => {
        setThumbnail(thumbnail ? "" : url);
    };

    const handleAddRss = (index: number) => {
        const foundNews = news[index];

        if (foundNews) {
            const tmpNews = {
                thumbnail: null,
                title: foundNews.title,
                text: foundNews.content,
            };

            if (foundNews.enclosure?.url) {
                setActiveNews(tmpNews);
                return toggleThumbnail(foundNews.enclosure?.url);
            }

            dispatch(addToCreateNews(tmpNews));

            router.push("/admin/news/addNews#rss");
        }
    };

    const sendUrlImg = (image: any) => {
        dispatch(
            addToCreateNews({
                ...activeNews,
                thumbnail: image,
            })
        );

        router.push("/admin/news/addNews#rss");
    };

    return (
        <>
            <HeadLayout title="Admin news feed" />
            <WithRole role="all">
                <Layout>
                    <div className={classes.head}>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            width="100%"
                        >
                            <div>
                                <h1 className={classes.title}>
                                    التغذية الاخبارية
                                </h1>
                            </div>
                        </Box>
                    </div>
                    <div className={classes.body}>
                        <div className={styles.contentNavbar}>
                            <Tabs
                                value={provider}
                                variant="scrollable"
                                onChange={handleProvider}
                                classes={{
                                    indicator: classes.indicator,
                                }}
                            >
                                {rss.map((rss, i) => (
                                    <Tab
                                        disabled={rss.isDisabled}
                                        style={
                                            rss.isDisabled
                                                ? {
                                                      filter: "grayscale(100%)",
                                                      opacity: 0.2,
                                                  }
                                                : null
                                        }
                                        label={
                                            <ImageOpt
                                                draggable={false}
                                                src={rss.icon}
                                                location="local"
                                                width={rss.width}
                                                height={rss.height}
                                            />
                                        }
                                        {...a11yProps(i)}
                                    />
                                ))}
                            </Tabs>
                            {selectedProvider && (
                                <Tabs
                                    value={service}
                                    variant="scrollable"
                                    onChange={handleService}
                                    classes={{
                                        indicator: classes.indicator,
                                    }}
                                >
                                    {selectedProvider.services.map(
                                        (service, i) => (
                                            <Tab
                                                label={service.name}
                                                {...a11yProps(i)}
                                            />
                                        )
                                    )}
                                </Tabs>
                            )}
                        </div>
                        <div style={{ marginTop: "50px" }}>
                            {loading ? (
                                <Box display="flex" justifyContent="center">
                                    <CircularProgress />
                                </Box>
                            ) : !news ? (
                                <p className={classes.msg}>
                                    حدث خطأ اثناء تحميل المعلومات من المصدر.
                                </p>
                            ) : !news.length ? (
                                <p className={classes.msg}>
                                    لم يتم العثور على اي معلومات.
                                </p>
                            ) : (
                                <Rss
                                    handleImg={handleImg}
                                    handleAddRss={handleAddRss}
                                    news={news}
                                />
                            )}
                        </div>
                    </div>
                </Layout>
            </WithRole>
            {activeImg !== null && (
                <div
                    onClick={() => handleImg()}
                    className={styles.activeImgContainer}
                >
                    <img
                        className={styles.activeImg}
                        src={news[activeImg].enclosure.url}
                    />
                </div>
            )}
            {thumbnail && (
                <ImageForm
                    url={thumbnail}
                    sendUrlImg={sendUrlImg}
                    close={toggleThumbnail}
                />
            )}
        </>
    );
};

interface IRssProps {
    news: any;
    handleImg: any;
    handleAddRss: any;
}

const Rss = ({ news, handleImg, handleAddRss }: IRssProps) => {
    return (
        <div className={styles.newsList}>
            {news.map((news, i) => (
                <div key={i} className={styles.container}>
                    <div className={styles.content}>
                        <div
                            className={
                                news.enclosure?.url
                                    ? styles.imgContainer
                                    : styles.emptyImgContainer
                            }
                            onClick={
                                news.enclosure?.url ? () => handleImg(i) : null
                            }
                        >
                            {news.enclosure?.url ? (
                                <img
                                    src={news.enclosure.url}
                                    className={styles.img}
                                    alt=""
                                />
                            ) : (
                                <img
                                    src="/no-photos.svg"
                                    className={styles.noImg}
                                    alt=""
                                />
                            )}
                        </div>
                        <div className={styles.textContainer}>
                            <h3 className={styles.title}>{`${news.title}`}</h3>
                            <a
                                href={news.link}
                                className={styles.link}
                                target="_blank"
                            >
                                الرابط
                            </a>
                            {news.enclosure?.url && (
                                <a
                                    href={news.enclosure.url}
                                    className={styles.link}
                                    target="_blank"
                                >
                                    الصورة
                                </a>
                            )}
                            <p className={styles.date}>{news.pubDate}</p>
                            <p className={styles.content}>{news.content}</p>
                        </div>
                        <div className={styles.controlBar}>
                            <Button
                                onClick={() => handleAddRss(i)}
                                color="primary"
                                variant="contained"
                            >
                                أنشاء خبر
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
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
        indicator: {
            backgroundColor: theme.palette.primary.main,
        },
        msg: {
            textAlign: "center",
            fontSize: "18px",
        },
    });
});

export default NewsFeed;
