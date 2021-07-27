import { domain } from "../../utils/apiCall";
import ImageOpt from "../imageOpt";

const ShareNews = ({ uri }) => {
    return (
        <div className="share-news">
            <p>شارك على وسائل التواصل الاجتماعي:</p>
            <ul>
                <li>
                    <a
                        target="_blank"
                        href={`https://facebook.com/sharer.php?u=${
                            domain + uri
                        }`}
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
                        target="_blank"
                        href={`https://twitter.com/intent/tweet?url=${
                            domain + uri
                        }`}
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
                        className="facebook"
                        target="_blank"
                        href={`https://web.whatsapp.com/send?text=${
                            domain + uri
                        }`}
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
