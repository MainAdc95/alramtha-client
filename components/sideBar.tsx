// Main
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
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
import { apiCall } from "../utils/apiCall";
import { useDispatch, useSelector } from "react-redux";
import { votePoll } from "../store/actions/poll";
import { RootReducer } from "../store/reducers";
import NewsLetter from "./newsLetter";
import ImageOpt from "./imageOpt";

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

interface IProps {
    newsId?: string;
}

const SideBar = ({ newsId }: IProps) => {
    const { data } =
        useSWR<{
            results: number;
            tags: ITag[];
        }>(`/tags?p=1&r=30`);
    const { data: news } = useSWR("/news?p=1&r=5&type=published");
    const { data: mvNews } = useSWR(
        `/news?p=1&r=5&type=published&mvn=true${
            newsId ? `&newsId=${newsId}` : ""
        }`
    );
    const { data: poll } = useSWR<IPoll>("/poll/active");
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
                <NewsLetter />
                <Tabs value={value} onChange={handleChange} variant="fullWidth">
                    <Tab
                        label="الاكثر شهره"
                        style={selected(0)}
                        className="tabs-styles"
                    />
                    <Tab
                        label="الاحدث"
                        style={selected(1)}
                        className="tabs-styles"
                    />
                </Tabs>
                <Box mt="30px">
                    <TabPanel value={value} index={0}>
                        <div>
                            <ul>
                                {mvNews &&
                                    mvNews.news.map((item) => (
                                        <SmallNews
                                            key={item.news_id}
                                            news={item}
                                        />
                                    ))}
                            </ul>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <div>
                            <ul>
                                {news &&
                                    news.news.map((item) => (
                                        <SmallNews
                                            key={item.news_id}
                                            news={item}
                                        />
                                    ))}
                            </ul>
                        </div>
                    </TabPanel>
                </Box>
                <div className="side-bar-adv">
                    <ImageOpt
                        src={
                            "216189601_570914960941599_8493229825136087917_n.jpg"
                        }
                    />
                </div>
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
                    <ImageOpt
                        src={
                            "216189601_570914960941599_8493229825136087917_n.jpg"
                        }
                    />
                </div>
            </div>
        </StickyBox>
    );
};

const isVoted = (poll: IPoll, pollId: string, optionId: string) => {
    if (poll.poll_id === pollId) {
        if (poll.options.map((o) => o.option_id).includes(optionId))
            return true;
    }

    return false;
};

const Poll = ({ poll }: { poll: IPoll }) => {
    const dispatch = useDispatch();
    const votedPolls = useSelector(
        (state: RootReducer) => state.polls.votedPolls
    );
    const classes = useStyles();
    const [vote, setVote] = useState<string | null>(null);
    const [isDisabled, setDisabled] = useState(false);
    const [plus, setPlus] = useState<number | null>(null);

    useEffect(() => {
        if (poll) {
            setPlus(null);
        }
    }, [poll]);

    useEffect(() => {
        if (poll) {
            for (const v of votedPolls) {
                if (isVoted(poll, v.poll_id, v.option_id)) {
                    setVote(v.option_id);
                    setDisabled(true);
                    break;
                }
            }
        }
    }, [poll, votedPolls]);

    const handleVote = (optionId?: string) => {
        if (!isDisabled && optionId) setVote(optionId);
    };

    const handleSubmit = async () => {
        setDisabled(true);
        const number = Math.ceil(Math.random() * (15 - 5) + 5);
        setPlus(number);
        await apiCall("post", `/poll/vote/${vote}`, { number });
        dispatch(votePoll(poll.poll_id, vote));
    };

    if (poll)
        return (
            <>
                <p className={classes.sectionTitle}>استطلاعات الرأي</p>
                <Box className={classes.root}>
                    <p className={classes.title}>{poll.title}</p>
                    <p className={classes.date}>
                        تاريخ النشر:{" "}
                        {new Date(poll.created_at).toLocaleString("ar")}
                    </p>
                    <Box>
                        {poll.options
                            .sort(
                                (a, b) =>
                                    new Date(a.created_at).getTime() -
                                    new Date(b.created_at).getTime()
                            )
                            .map((o) => (
                                <div className={classes.optionWrapper}>
                                    <Box
                                        style={
                                            isDisabled
                                                ? {
                                                      cursor: "default",
                                                      color: "black",
                                                  }
                                                : vote === o.option_id
                                                ? {
                                                      backgroundColor: "white",
                                                      color: "black",
                                                  }
                                                : { cursor: "pointer" }
                                        }
                                        className={classes.optionContainer}
                                        onClick={() => handleVote(o.option_id)}
                                        key={o.option_id}
                                    >
                                        <div
                                            className={
                                                classes.percentageBackground
                                            }
                                            style={
                                                isDisabled
                                                    ? {
                                                          width: `${
                                                              ((vote ===
                                                              o.option_id
                                                                  ? o.votes +
                                                                    (plus
                                                                        ? plus
                                                                        : 0)
                                                                  : o.votes) /
                                                                  poll.options.reduce(
                                                                      (
                                                                          total,
                                                                          o
                                                                      ) =>
                                                                          total +
                                                                          Number(
                                                                              o.votes
                                                                          ),
                                                                      plus
                                                                          ? plus
                                                                          : 0
                                                                  )) *
                                                              100
                                                          }%`,
                                                      }
                                                    : { width: "0px" }
                                            }
                                        ></div>
                                        <Box
                                            display="flex"
                                            justifyContent="space-between"
                                        ></Box>
                                        <p>{o.name}</p>
                                    </Box>
                                    {vote && isDisabled && (
                                        <p className={classes.votes}>
                                            {Math.ceil(
                                                ((vote === o.option_id
                                                    ? o.votes +
                                                      (plus ? plus : 0)
                                                    : o.votes) /
                                                    poll.options.reduce(
                                                        (total, o) =>
                                                            total +
                                                            Number(o.votes),
                                                        plus ? plus : 0
                                                    )) *
                                                    100
                                            )}{" "}
                                            %
                                        </p>
                                    )}
                                </div>
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
                            <p
                                style={{
                                    fontWeight: 900,
                                }}
                            >
                                اجمالي عدد الاصوات{" "}
                                {poll.options.reduce(
                                    (total, o) => total + Number(o.votes),
                                    plus ? plus : 0
                                )}
                            </p>
                        )}
                    </Box>
                </Box>
            </>
        );

    return null;
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: "rgb(2, 135, 254)",
            borderRadius: "0 0 5px 5px",
            padding: "10px 20px",
            color: "white",
            marginBottom: "30px",
            paddingBottom: "30px",
            boxShadow: `0px 2px 4px -1px rgb(0 0 0 / 20%), 0px 4px 5px 0px rgb(0 0 0 / 14%), 0px 1px 10px 0px rgb(0 0 0 / 12%)`,
        },
        optionWrapper: {
            width: "100%",
            display: "flex",
        },
        title: {
            fontWeight: 800,
            fontSize: 16,
            marginBottom: "8px",
        },
        date: {
            marginBottom: "15px",
        },
        optionContainer: {
            position: "relative",
            overflow: "hidden",
            width: "100%",
            zIndex: 2,
            padding: "2px 5px",
            border: "1px solid white",
            borderRadius: "5px",
            marginBottom: "25px",
        },
        percentageBackground: {
            height: "100%",
            top: 0,
            left: 0,
            position: "absolute",
            backgroundColor: "rgba(255, 255, 255, 0.548)",
            zIndex: -1,
            transition: "all 1s ease",
        },
        votes: {
            margin: "0 5px 0 10px",
            whiteSpace: "nowrap",
            fontWeight: 900,
        },
        sectionTitle: {
            textAlign: "center",
            padding: "10px",
            backgroundColor: "#313131",
            borderRadius: "5px 5px 0 0",
            color: "white",
            fontSize: "18px",
        },
    })
);

export default SideBar;
