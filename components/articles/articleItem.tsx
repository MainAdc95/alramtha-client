import Link from "next/link";
import ImageOpt from "../imageOpt";
import { IArticle } from "../../types/article";

// icons
import VisibilityIcon from "@material-ui/icons/Visibility";

interface IProps {
    article: IArticle;
    styles?: any;
}

const ArticleItem = ({ article, styles }: IProps) => {
    return (
        <div className="large-news">
            <div className="img-wrapper">
                <Link href={`/articles/${article.article_id}`}>
                    <div className="news-img">
                        <div>
                            {(article.thumbnail ||
                                article.created_by.avatar) && (
                                <ImageOpt
                                    src={
                                        (
                                            article.thumbnail ||
                                            article.created_by.avatar
                                        )?.sizes?.m
                                    }
                                    layout="fill"
                                    objectFit={
                                        article.thumbnail ? "cover" : "contain"
                                    }
                                />
                            )}
                        </div>
                    </div>
                </Link>
            </div>
            <div className="news-content" style={styles && styles}>
                <Link href={`/articles/${article.article_id}`}>
                    <a>
                        <h2>{article.title}</h2>
                    </a>
                </Link>
                <ul>
                    <li>{new Date(article.created_at).toLocaleString("ar")}</li>
                    {/* <li>
                        <div className="readers-container">
                            <p>{article.readers || 0}</p>
                            <VisibilityIcon />
                        </div>
                    </li> */}
                </ul>
            </div>
        </div>
    );
};

export default ArticleItem;
