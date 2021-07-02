import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootReducer } from "../store/reducers";
import { useRouter } from "next/router";

interface IProps {
    children: React.ReactNode;
}

const Signedout = ({ children }: IProps) => {
    const router = useRouter();
    const {
        user,
        onload: { loading },
    } = useSelector((state: RootReducer) => state.auth);
    const [isClient, setClient] = useState(false);

    useEffect(() => {
        setClient(true);
    }, []);

    if (!isClient) return <p>still in server btw</p>;
    else if (loading) return <>{children}</>;
    else if (!user) return <>{children}</>;
    else {
        router.push("/admin");
        return <p>loading...</p>;
    }
};

export default Signedout;
