import { useRouter } from "next/router";

// Components
import LargeNews from "../../components/news/largeNews";
import SideBar from "../../components/sideBar";
import { Grid } from "@material-ui/core";
import { small_4, swiper2 } from "../../utils/seeds";
import { GetServerSideProps } from "next";
import { apiCall } from "../../utils/apiCall";
import { INews } from "../../types/news";
import useSWR from "swr";

interface IProps {
    news: INews[];
}

const SectionTags = () => {
    const router = useRouter();
    const { data, error } = useSWR<{ news: INews[] }>(
        `/news?tag=${router.query.tagName}`
    );

    return (
        <>
            <div className="page">
                <div className="container">
                    <Grid container className="grid-root" spacing={1}>
                        <Grid item xs={12} md={8}>
                            <div className="author-title">
                                <h1>
                                    <span>{router.query.tagName}</span>
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
                                                data={item}
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

export default SectionTags;
