import { domain } from "../../utils/apiCall";
import ImageOpt from "../imageOpt";

const ShareNews = ({ uri }) => {
    const openShare = (url: string, name: string, w: number, h: number) => {
        const dualScreenLeft =
            window.screenLeft !== undefined
                ? window.screenLeft
                : window.screenX;
        const dualScreenTop =
            window.screenTop !== undefined ? window.screenTop : window.screenY;

        const width = window.innerWidth
            ? window.innerWidth
            : document.documentElement.clientWidth
            ? document.documentElement.clientWidth
            : screen.width;
        const height = window.innerHeight
            ? window.innerHeight
            : document.documentElement.clientHeight
            ? document.documentElement.clientHeight
            : screen.height;

        const systemZoom = width / window.screen.availWidth;
        const left = (width - w) / 2 / systemZoom + dualScreenLeft;
        const top = (height - h) / 2 / systemZoom + dualScreenTop;
        window
            .open(
                url,
                name,
                `
                scrollbars=yes,
                width=${w / systemZoom}, 
                height=${h / systemZoom}, 
                top=${top}, 
                left=${left}
            `
            )
            .focus();
    };

    return (
        <div className="share-news">
            <p>شارك على وسائل التواصل الاجتماعي:</p>
            <ul>
                <li>
                    <a
                        onClick={() =>
                            openShare(
                                `https://facebook.com/sharer.php?u=${
                                    domain + uri
                                }`,
                                "facebook",
                                500,
                                700
                            )
                        }
                    >
                        <ImageOpt
                            src="/facebook.png"
                            location="local"
                            width={20}
                            height={20}
                        />
                    </a>
                </li>
                <li>
                    <a
                        onClick={() =>
                            openShare(
                                `https://twitter.com/intent/tweet?url=${
                                    domain + uri
                                }`,
                                "twitter",
                                500,
                                700
                            )
                        }
                    >
                        <ImageOpt
                            src="/twitter.png"
                            location="local"
                            width={20}
                            height={20}
                        />
                    </a>
                </li>
                <li>
                    <a
                        onClick={() =>
                            openShare(
                                `https://web.whatsapp.com/send?text=${
                                    domain + uri
                                }`,
                                "whatsapp",
                                600,
                                700
                            )
                        }
                    >
                        <ImageOpt
                            src="/whatsapp.png"
                            location="local"
                            width={20}
                            height={20}
                        />
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default ShareNews;
