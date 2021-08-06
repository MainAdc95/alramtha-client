import { useEffect } from "react";

const GoogleAds = () => {
    useEffect(() => {
        // @ts-ignore
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    }, []);

    return (
        <div style={{ margin: "20px 0" }}>
            <ins
                className="adsbygoogle"
                style={{ display: "block" }}
                data-ad-client="ca-pub-9735699829683533"
                data-ad-slot="7408573070"
                data-ad-format="auto"
                data-full-width-responsive="true"
            ></ins>
        </div>
    );
};

export default GoogleAds;
