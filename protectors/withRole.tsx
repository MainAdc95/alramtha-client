import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootReducer } from "../store/reducers";
import { Role } from "../types/user";
import { useRouter } from "next/router";

interface IProps {
    children: React.ReactNode;
    role: Role;
}

const WithRole = ({ children, role }: IProps) => {
    const router = useRouter();
    const {
        user,
        onload: { loading },
    } = useSelector((state: RootReducer) => state.auth);
    const [isClient, setClient] = useState(false);

    useEffect(() => {
        setClient(true);
    }, []);

    const checkRole = () => {
        switch (role) {
            case "all":
                if (
                    user.is_super_admin ||
                    user.is_admin ||
                    user.is_editor ||
                    user.is_reporter
                )
                    return true;

                return false;
            case "is_super_admin":
                if (user.is_super_admin) return true;

                return false;
            case "is_admin":
                if (user.is_super_admin || user.is_admin) return true;

                return false;
            case "is_editor":
                if (user.is_super_admin || user.is_admin || user.is_editor)
                    return true;

                return false;
            case "is_reporter":
                if (user.is_super_admin || user.is_admin || user.is_reporter)
                    return true;

                return false;
            default:
                return false;
        }
    };

    if (!isClient) return <p>still in server btw</p>;
    else if (loading) return <p>loading</p>;
    else if (user && checkRole()) return <>{children}</>;
    else {
        router.push("/admin/signin");
        return <p>loading...</p>;
    }
};

export default WithRole;
