import { createStyles, makeStyles, Theme, Box } from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootReducer } from "../../../store/reducers";
import { ISection } from "../../../types/section";
import useSWR from "swr";
import WithRole from "../../../protectors/withRole";
import Link from "next/link";

// components
import Layout from "../../../components/admin/layout";
import HeadLayout from "../../../components/headLayout";
import Button from "../../../components/form/button";

// icons
import SectionList from "../../../components/admin/section/sectionList";
import AddIcon from "@material-ui/icons/Add";

const News = () => {
    const locale = useSelector((state: RootReducer) => state.locale);
    const classes = useStyles({ locale });

    const {
        data: sections,
        error,
        isValidating,
    } = useSWR<ISection[]>(`/sections`);

    return (
        <>
            <HeadLayout title="Admin section" />
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
                                <h1 className={classes.title}>Sections</h1>
                            </div>
                            <Link href="/admin/sections/addSection">
                                <Button
                                    startIcon={<AddIcon />}
                                    text="Add section"
                                />
                            </Link>
                        </Box>
                    </div>
                    <div className={classes.body}>
                        {error ? (
                            <p>An error has occured while fetching sections.</p>
                        ) : !sections ? (
                            <p>Loading...</p>
                        ) : !sections.length ? (
                            <p>There is no sections added yet.</p>
                        ) : (
                            <SectionList
                                sections={sections}
                                loading={isValidating}
                            />
                        )}
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
