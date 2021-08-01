import {
    createStyles,
    makeStyles,
    Theme,
    Box,
    CircularProgress,
} from "@material-ui/core";

// components
import WithRole from "../../protectors/withRole";
import Layout from "../../components/admin/layout";
import HeadLayout from "../../components/headLayout";

const Admin = () => {
    return (
        <>
            <HeadLayout title="Admin" />
            <WithRole role="all">
                <Layout>
                    <p>welcome to alramsah admin panel</p>
                </Layout>
            </WithRole>
        </>
    );
};

export default Admin;
