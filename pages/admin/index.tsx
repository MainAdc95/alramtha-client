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
                    <div>
                        <p>Welcome to your admin panel</p>
                    </div>
                </Layout>
            </WithRole>
        </>
    );
};

export default Admin;
