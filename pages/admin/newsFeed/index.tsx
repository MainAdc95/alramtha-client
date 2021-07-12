import {
    createStyles,
    makeStyles,
    Theme,
    Box,
    Tab,
    Tabs,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootReducer } from "../../../store/reducers";
import { useState } from "react";
import ImageOpt from "../../../components/imageOpt";
import { rss } from "../../../data/rss";
import { useEffect } from "react";

// styles
import styles from "../../../styles/NewsFeed.module.scss";

// components
import WithRole from "../../../protectors/withRole";
import Layout from "../../../components/admin/layout";
import HeadLayout from "../../../components/headLayout";

// icons
import AddIcon from "@material-ui/icons/Add";
import { apiCall } from "../../../utils/apiCall";

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const Tags = () => {
    const locale = useSelector((state: RootReducer) => state.locale);
    const classes = useStyles();
    const [provider, setProvider] = useState(0);
    const [service, setService] = useState(0);
    const [selectedProvider, seSelectedtProvider] = useState<any>(null);
    const [selectedService, setSelectedService] = useState<any>(null);
    const [news, setNews] = useState<any>([]);

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
        }
    }, [selectedProvider]);

    useEffect(() => {
        (async () => {
            if (selectedService) {
                const data = await apiCall<string>(
                    "get",
                    `https://api.rss2json.com/v1/api.json?api_key=ocutvneiwjjhyv5ui1z2k8co9ktt8jmt5rmk2hhq&rss_url=${selectedService.link}&count=500`,
                    null,
                    "out"
                );

                // @ts-ignore
                setNews(data?.items || []);
            }
        })();
    }, [selectedService]);

    const handleService = (event: React.ChangeEvent<{}>, newValue: number) => {
        setService(newValue);
        setSelectedService(selectedProvider?.services[newValue]);
    };

    return (
        <>
            <HeadLayout title="Admin news feed" />
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
                            >
                                {rss.map((rss, i) => (
                                    <Tab
                                        disabled={rss.isDisabled}
                                        label={
                                            <ImageOpt
                                                src={rss.icon}
                                                location="local"
                                                width={100}
                                                height={38}
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
                            <UnitedNations news={news} />
                        </div>
                    </div>
                </Layout>
            </WithRole>
        </>
    );
};

const UnitedNations = ({ news }: any) => {
    return (
        <div>
            {news.map((news) => (
                <div className={styles.container}>
                    <div className={styles.imgContainer}>
                        <a href={news.enclosure.link} target="_blank">
                            <img
                                src={news.enclosure.link}
                                className={styles.img}
                                alt=""
                            />
                        </a>
                    </div>
                    <div>
                        <h3 className={styles.title}>{`${news.title}`}</h3>
                        <p className={styles.content}>{news.content}</p>
                        <a
                            href={news.link}
                            className={styles.link}
                            target="_blank"
                        >
                            الرابط
                        </a>
                        <a
                            href={news.guid}
                            className={styles.guide}
                            target="_blank"
                        >
                            الدليل
                        </a>
                        <p className={styles.date}>{news.pubDate}</p>
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
    });
});
export default Tags;
