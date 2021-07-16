// Main
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import PropTypes from "prop-types";
import {
    Tabs,
    Tab,
    Box,
    Button,
    Theme,
    createStyles,
    makeStyles,
} from "@material-ui/core";
import SmallNews from "./news/smallNews";
import { ITag } from "../types/tag";
import StickyBox from "react-sticky-box";
import { IPoll } from "../types/poll";
import { SettingsInputSvideoTwoTone } from "@material-ui/icons";
import { apiCall } from "../utils/apiCall";

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && children}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

const SideBar = () => {
    const { data } =
        useSWR<{
            results: number;
            tags: ITag[];
        }>(`/tags?p=1&r=20`);
    const { data: news } = useSWR("/news?p=1&r=5&type=published");
    const { data: poll } = useSWR<IPoll>("/poll/active");
    console.log(poll);
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const selected = (num) => {
        if (num === value)
            return {
                backgroundColor: "#0287fe",
                color: "white",
            };
        else return { backgroundColor: "black", color: "white" };
    };

    return (
        <StickyBox offsetTop={80} offsetBottom={20}>
            <div className="news-side-bar">
                <Poll poll={poll} />
                <Tabs value={value} onChange={handleChange} variant="fullWidth">
                    <Tab
                        label="الاكثر شهره"
                        style={selected(0)}
                        className="tabs-styles"
                    />
                    <Tab
                        label="الاجدد"
                        style={selected(1)}
                        className="tabs-styles"
                    />
                </Tabs>
                <Box mt="30px">
                    <TabPanel value={value} index={0}>
                        <div style={{ minHeight: "100px" }}>
                            <ul style={{ width: "100%" }}>
                                {news &&
                                    news.news.map((item) => (
                                        <SmallNews
                                            key={item.news_id}
                                            data={item}
                                        />
                                    ))}
                            </ul>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <div style={{ minHeight: "100px" }}>
                            <ul>
                                {news &&
                                    news.news.map((item) => (
                                        <SmallNews
                                            key={item.news_id}
                                            data={item}
                                        />
                                    ))}
                            </ul>
                        </div>
                    </TabPanel>
                </Box>
                <div style={{ margin: "3rem 0" }}>
                    <div className="author-title">
                        <h1>
                            <span
                                style={{
                                    borderColor: "#33a3f1",
                                }}
                            >
                                وسوم
                            </span>
                        </h1>
                    </div>
                    <div className="side-bar-tags">
                        {data &&
                            data.tags.map((i) => (
                                <Link href={`/tags/${i.tag_id}`} key={i.tag_id}>
                                    <a>{i.tag_name}</a>
                                </Link>
                            ))}
                    </div>
                </div>
                <div className="side-bar-adv">
                    <Image src="/news1.jpg" layout="fill" objectFit="cover" />
                </div>
            </div>
        </StickyBox>
    );
};

const Poll = ({ poll }: { poll: IPoll }) => {
    const classes = useStyles();
    const [vote, setVote] = useState<string | null>(null);
    const [isDisabled, setDisabled] = useState(false);

    const handleVote = (optionId?: string) => {
        if (!isDisabled && optionId) setVote(optionId);
    };

    const handleSubmit = async () => {
        setDisabled(true);
        await apiCall("post", `/poll/vote/${vote}`);
    };

    if (poll)
        return (
            <Box className={classes.root}>
                <p className={classes.title}>{poll.title}</p>
                <Box>
                    {poll.options
                        .sort(
                            (a, b) =>
                                new Date(a.created_at).getTime() -
                                new Date(b.created_at).getTime()
                        )
                        .map((o) => (
                            <Box
                                style={
                                    vote === o.option_id
                                        ? {
                                              backgroundColor: `rgb(2, 135, 254)`,
                                              color: "white",
                                          }
                                        : null
                                }
                                className={classes.optionContainer}
                                onClick={() => handleVote(o.option_id)}
                                key={o.option_id}
                            >
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                >
                                    <p>{o.name}</p>
                                    {vote && isDisabled && (
                                        <p>
                                            {vote === o.option_id
                                                ? o.votes + 1
                                                : o.votes}
                                        </p>
                                    )}
                                </Box>
                            </Box>
                        ))}
                    {!isDisabled && (
                        <Box mb={1}>
                            <Button
                                disabled={!Boolean(vote)}
                                color="secondary"
                                variant="contained"
                                onClick={handleSubmit}
                                fullWidth
                            >
                                صوت
                            </Button>
                        </Box>
                    )}
                    {isDisabled && (
                        <p>
                            عدد الاصوات{" "}
                            {(() => {
                                let number = 0;

                                if (vote) number++;

                                poll.options.forEach(
                                    (o) => (number += o.votes)
                                );

                                return number;
                            })()}
                        </p>
                    )}
                </Box>
            </Box>
        );

    return null;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            marginBottom: "20px",
        },
        title: {
            fontWeight: 800,
            fontSize: 16,
            paddingBottom: "15px",
        },
        optionContainer: {
            padding: "10px",
            border: "1px solid rgb(168, 168, 168)",
            marginBottom: "10px",
            cursor: "pointer",
        },
    })
);

export default SideBar;
