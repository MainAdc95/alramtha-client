import { useRouter } from "next/router";
import { INews } from "../../types/news";
import HeadLayout from "../../components/headLayout";
import useSWR from "swr";
import { GetServerSideProps } from "next";

// Components
import LargeNews from "../../components/news/largeNews";
import SideBar from "../../components/sideBar";
import { Grid } from "@material-ui/core";
import { apiCall } from "../../utils/apiCall";
import { ISection } from "../../types/section";

interface IProps {
    section: ISection;
}

const SectionTags = ({ section }: IProps) => {
    const router = useRouter();
    const { data } = useSWR<{ news: INews[] }>(
        router.query.sectionId
            ? `/news?p=1&type=published&sectionId=${router.query.sectionId}`
            : null
    );

    return (
        <>
            <HeadLayout title={section.section_name} />
            <div className="page">
                <div className="container">
                    <Grid container className="grid-root" spacing={1}>
                        <Grid item xs={12} md={8}>
                            <div className="author-title">
                                <h1>
                                    <span>{section.section_name}</span>
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
    const section = await apiCall("get", `/section/${ctx.params.sectionId}`);

    return {
        props: {
            section,
        },
    };
};

export default SectionTags;
