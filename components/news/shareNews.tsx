import { domain } from "../../utils/apiCall";
import ImageOpt from "../imageOpt";
import {
    FacebookShareButton,
    WhatsappShareButton,
    TwitterShareButton,
} from "react-share";

const ShareNews = ({ uri }) => {
    return (
        <div className="share-news">
            <p>شارك على وسائل التواصل الاجتماعي:</p>
            <ul>
                <li>
                    <a>
                        <FacebookShareButton
                            url={`https://facebook.com/sharer.php?u=${
                                domain + uri
                            }`}
                        >
                            <ImageOpt
                                src="/facebook.png"
                                location="local"
                                width={20}
                                height={20}
                            />
                        </FacebookShareButton>
                    </a>
                </li>
                <li>
                    <a>
                        <TwitterShareButton
                            url={`https://twitter.com/intent/tweet?url=${
                                domain + uri
                            }`}
                        >
                            <ImageOpt
                                src="/twitter.png"
                                location="local"
                                width={20}
                                height={20}
                            />
                        </TwitterShareButton>
                    </a>
                </li>
                <li>
                    <a>
                        <WhatsappShareButton
                            url={`https://web.whatsapp.com/send?text=${
                                domain + uri
                            }`}
                        >
                            <ImageOpt
                                src="/whatsapp.png"
                                location="local"
                                width={20}
                                height={20}
                            />
                        </WhatsappShareButton>
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default ShareNews;
