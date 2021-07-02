import React from "react";

const ShareNews = () => {
    return (
        <div className="share-news">
            <ul>
                <li>
                    <i className="icon share_alt_icon"></i>
                    <span>Share Post</span>
                </li>
                <li>
                    <a
                        className="facebook"
                        href="http://www.facebook.com/sharer.php?u=http://demo.qkthemes.net/hotmagazine-full/praesent-dapibus-neque-id-cursus-faucibus-tortor-neque-egestas-augue-eu-vulputate-magna-eros-eu-erat-16/"
                    >
                        <i className="icon facebook_icon"></i>
                        <span>Share on Facebook</span>
                    </a>
                </li>
                <li>
                    <a
                        className="twitter"
                        href="http://twitter.com/share?url=http://demo.qkthemes.net/hotmagazine-full/praesent-dapibus-neque-id-cursus-faucibus-tortor-neque-egestas-augue-eu-vulputate-magna-eros-eu-erat-16/&amp;text=Praesent%20dapibus,%20neque%20id%20cursus%20faucibus,%20tortor%20neque%20egestas%20augue,%20eu%20vulputate%20magna%20eros%20eu%20erat."
                    >
                        <i className="icon twitter_icon"></i>
                        <span>Share on Twitter</span>
                    </a>
                </li>
                <li>
                    <a
                        className="google"
                        href="http://twitter.com/share?url=http://demo.qkthemes.net/hotmagazine-full/praesent-dapibus-neque-id-cursus-faucibus-tortor-neque-egestas-augue-eu-vulputate-magna-eros-eu-erat-16/&amp;text=Praesent%20dapibus,%20neque%20id%20cursus%20faucibus,%20tortor%20neque%20egestas%20augue,%20eu%20vulputate%20magna%20eros%20eu%20erat."
                    >
                        <i className="icon twitter_icon"></i>
                        <span>G</span>
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default ShareNews;
