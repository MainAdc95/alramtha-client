import { useRouter } from "next/router";
import { useEffect } from "react";

const GoogleAds = () => {
    const router = useRouter();

    useEffect(() => {
        try {
            // @ts-ignore
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.log(err);
        }
    }, [router.asPath]);

    return (
        <div style={{ display: "flex" }}>
            <ins
                className="adsbygoogle"
                style={{ display: "block", margin: "0 auto" }}
                data-ad-client={process.env.NEXT_ENV_PUBLIC_GOOGLE_ADS}
                data-ad-slot="7408573070"
                data-ad-format="auto"
                data-full-width-responsive="true"
            ></ins>
        </div>
    );
};

export default GoogleAds;
