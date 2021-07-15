import { apiCall } from "../utils/apiCall";
import { Grid, Box } from "@material-ui/core";


// components
import { GetServerSideProps } from "next";
import { ISection } from "../types/section";
import { IStrip } from "../types/strip";
import { IFile } from "../types/file";
import SmallNews from "../components/news/smallNews";
import { INews } from "../types/news";


interface IProps {
    info: { sections: ISection[]; strips: IStrip[]; files: IFile[] };
}


const Announcement = ({ info }: IProps) => {
    const { sections } = info;


    return (
        <div>
            <div className="announcement-page">
                <div className="container">
                    <div className="sections">
                        <Grid container className="grid-root" spacing={3}>
                            {(sections as (ISection & {news: INews[]})[]).map(section => (
                                <Grid item key={section.section_id} xs={12} sm={6} md={4}>
                                    <div className="section-item">
                                        <ul>
                                            {section.news?.map(n => (
                                                <SmallNews key={n.news_id}
                                                data={n} />
                                            ))}
                                        </ul>
                                    </div>
                                </Grid>
                            ))}
                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    )
}



export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const info = await apiCall("get", `/homeInfo`);

    return {
        props: {
            info,
        },
    };
};

export default Announcement;