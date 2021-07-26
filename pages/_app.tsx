import { useEffect } from "react";
import cookie from "cookie";
import App, { AppInitialProps } from "next/app";
import { wrapper } from "../store";
import Head from "next/head";
import Layout from "../components/layout";
import Theme from "../components/themeLayout";
import { apiCall } from "../utils/apiCall";
import { SWRConfig } from "swr";
import { authOnloadCall } from "../store/actions/auth";
import { useDispatch } from "react-redux";
import { Router } from "next/router";
import { setLocation } from "../store/actions/location";
import { ILocation } from "../types/location";
import NProgress from "nprogress";
import { create } from "jss";
import rtl from "jss-rtl";
import { StylesProvider, jssPreset } from "@material-ui/core/styles";

// style sheets
import "../styles/globals.scss";
import "swiper/swiper-bundle.css";
import "nprogress/nprogress.css";
import "react-image-crop/dist/ReactCrop.css";

// Configure JSS
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

// NProgress config
NProgress.configure({ showSpinner: false });

Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

class Alramsah extends App<AppInitialProps> {
    public static getInitialProps = wrapper.getInitialAppProps(
        (store) =>
            async ({ Component, ctx }) => {
                return {
                    pageProps: {
                        ...(Component.getInitialProps
                            ? await Component.getInitialProps({ ...ctx, store })
                            : {}),
                        pathname: ctx.pathname,
                    },
                };
            }
    );

    public render() {
        const { Component, pageProps } = this.props;

        return (
            <>
                <Head>
                    <link
                        rel="apple-touch-icon"
                        sizes="180x180"
                        href="/apple-touch-icon.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="32x32"
                        href="/favicon-32x32.png"
                    />
                    <link
                        rel="icon"
                        type="image/png"
                        sizes="16x16"
                        href="/favicon-16x16.png"
                    />
                    <link rel="manifest" href="/site.webmanifest" />
                    <link
                        rel="mask-icon"
                        href="/safari-pinned-tab.svg"
                        color="#5bbad5"
                    />
                    <meta name="msapplication-TileColor" content="#2b5797" />
                    <meta name="theme-color" content="#ffffff" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&display=swap"
                        rel="stylesheet"
                    ></link>
                </Head>
                <StylesProvider jss={jss}>
                    <Theme>
                        <SWRConfig
                            value={{
                                refreshInterval: 120000,
                                fetcher: async (url) => {
                                    return await apiCall("get", url);
                                },
                            }}
                        >
                            <Layout>
                                <Component {...pageProps} />
                            </Layout>
                        </SWRConfig>
                    </Theme>
                </StylesProvider>
                <DataHandler />
            </>
        );
    }
}

const DataHandler = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const { isAuth } = cookie.parse(document.cookie);
        // loading instagram embed script
        const instagramScript = document.createElement("script");
        instagramScript.src = "https://www.instagram.com/embed.js";

        instagramScript.addEventListener("load", () => {
            // @ts-ignore
            window.instgrm.Embeds.process();
        });

        document.body.appendChild(instagramScript);

        // loading twitter embed script
        // @ts-ignore
        window.twttr = (function (d, s, id) {
            var js,
                fjs = d.getElementsByTagName(s)[0],
                // @ts-ignore
                t = window.twttr || {};
            if (d.getElementById(id)) return t;
            js = d.createElement(s);
            js.id = id;
            js.src = "https://platform.twitter.com/widgets.js";
            fjs.parentNode.insertBefore(js, fjs);

            t._e = [];
            t.ready = function (f) {
                t._e.push(f);
            };

            return t;
        })(document, "script", "twitter-wjs");

        if (isAuth) {
            dispatch(authOnloadCall());
        }

        handleAsync();
    }, []);

    const handleAsync = async () => {
        const location = await apiCall<ILocation>(
            "get",
            "https://geolocation-db.com/json/037714e0-ec1b-11eb-9e6f-31f179bdc488",
            null,
            "out"
        );
        const weather = await apiCall(
            "get",
            `http://api.weatherapi.com/v1/current.json?key=2a19e2cc7cc841ecb9e194434211306&q=${location.IPv4}`,
            { key: "2a19e2cc7cc841ecb9e194434211306" },
            "out"
        );

        dispatch(setLocation({ ...location, weather }));
    };

    return null;
};

export default wrapper.withRedux(Alramsah);
