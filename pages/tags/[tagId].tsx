import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { apiCall } from "../../utils/apiCall";
import { INews } from "../../types/news";
import useSWR from "swr";
import HeadLayout from "../../components/headLayout";
import { ITag } from "../../types/tag";

// Components
import LargeNews from "../../components/news/largeNews";
import SideBar from "../../components/sideBar";
import { Grid } from "@material-ui/core";

interface IProps {
    tag: ITag;
}

const Tags = ({ tag }: IProps) => {
    const router = useRouter();
    const { data } = useSWR<{ news: INews[] }>(
        `/news?p=1&r=20&type=published&tag=${router.query.tagId}`
    );

    return (
        <>
            <HeadLayout title={tag.tag_name} />
            <div className="page">
                <div className="container">
                    <Grid container className="grid-root" spacing={1}>
                        <Grid item xs={12} md={8}>
                            <div className="author-title">
                                <h1>
                                    <span>{tag.tag_name}</span>
                                </h1>
                            </div>

                            <div className="content-area">
                                <Grid
                                    container
                                    className="grid-root"
                                    spacing={1}
                                >
                                    {data?.news.map((item) => (
                                        <Grid
                                            item
                                            xs={12}
                                            md={6}
                                            key={item.news_id}
                                        >
                                            <LargeNews
                                                news={item}
                                                styles={{
                                                    padding: "18px 20px",
                                                    borderBottom:
                                                        "1px solid #f0f0f0",
                                                    backgroundColor: "#fafafa",
                                                }}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <SideBar />
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const tag = await apiCall("get", `/tag/${ctx.params.tagId}`);

    return {
        props: {
            tag,
        },
    };
};

export default Tags;
