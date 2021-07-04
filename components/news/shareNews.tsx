import { domain } from "../../utils/apiCall";
import ImageOpt from "../imageOpt";

const ShareNews = () => {
    return (
        <div className="share-news">
            <p>شارك على وسائل التواصل الاجتماعي:</p>
            <ul>
                <li>
                    <a
                        target="_blank"
                        href={`https://facebook.com/sharer.php?u=${domain}`}
                    >
                        <ImageOpt
                            src="/facebook.svg"
                            location="local"
                            width={30}
                            height={30}
                        />
                    </a>
                </li>
                <li>
                    <a
                        target="_blank"
                        href={`https://twitter.com/intent/tweet?url=${domain}`}
                    >
                        <ImageOpt
                            src="/twitter.svg"
                            location="local"
                            width={30}
                            height={30}
                        />
                    </a>
                </li>
                <li>
                    <a
                        className="facebook"
                        target="_blank"
                        href={`https://web.whatsapp.com/send?text=${domain}`}
                    >
                        <ImageOpt
                            src="/whatsapp.svg"
                            location="local"
                            width={30}
                            height={30}
                        />
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default ShareNews;
