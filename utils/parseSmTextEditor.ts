const createYoutubeEmbed = (key) => {
    return (
        '<div class="yt-iframe-container"><iframe src="https://www.youtube.com/embed/' +
        key +
        '" frameborder="0" allowfullscreen></iframe><br/></div>'
    );
};

export const transformYoutubeLinks = (text) => {
    if (!text) return text;

    const linkreg = /(?:)<a([^>]+)>(.+?)<\/a>/g;
    const fullreg =
        /(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([^& \n<]+)(?:[^ \n<]+)?/g;
    const regex =
        /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^& \n<]+)(?:[^ \n<]+)?/g;

    let resultHtml = twitterParse(text);

    // get all the matches for youtube links using the first regex
    const match = text.match(fullreg);

    if (match && match.length > 0) {
        // get all links and put in placeholders
        const matchlinks = text.match(linkreg);
        if (matchlinks && matchlinks.length > 0) {
            for (var i = 0; i < matchlinks.length; i++) {
                resultHtml = resultHtml.replace(
                    matchlinks[i],
                    "#placeholder" + i + "#"
                );
            }
        }

        // now go through the matches one by one
        for (var i = 0; i < match.length; i++) {
            // get the key out of the match using the second regex
            let matchParts = match[i].split(regex);
            // replace the full match with the embedded youtube code
            resultHtml = resultHtml.replace(
                match[i],
                createYoutubeEmbed(matchParts[1])
            );
        }

        // ok now put our links back where the placeholders were.
        if (matchlinks && matchlinks.length > 0) {
            for (var i = 0; i < matchlinks.length; i++) {
                resultHtml = resultHtml.replace(
                    "#placeholder" + i + "#",
                    matchlinks[i]
                );
            }
        }
    }
    return resultHtml;
};

export const twitterParse = (str: string) => {
    let resultHtml = str;

    // (^|[^'"])(https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(?:es)?\/(\d+))(\?s=[0-9]+)?
    const regex =
        /(https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(?:es)?\/(\d+))(\?s=[0-9]+)?/g;
    var matched = resultHtml.match(regex);

    if (matched && matched.length > 0) {
        for (let match of matched) {
            resultHtml = resultHtml.replace(
                match,
                `<div class="twitter-iframe-container"><blockquote class="twitter-tweet"><a href="${match}"></a></blockquote><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script></div>`
            );
        }
    }

    return resultHtml;
};
