// components
import WithRole from "../../protectors/withRole";
import Layout from "../../components/admin/layout";

const Admin = () => {
    return (
        <WithRole role="all">
            <Layout>
                <div>
                    <p>Welcome to your admin panel</p>
                </div>
            </Layout>
        </WithRole>
    );
};

export default Admin;
