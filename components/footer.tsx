import Link from "next/link";
import useSWR from "swr";
import ImageOpt from "./imageOpt";
import { INews } from "../types/news";
import { ISection } from "../types/section";

// Styles
import styles from "../styles/Footer.module.scss";

const Footer = () => {
    const { data: sections } = useSWR<ISection[]>("/sections");
    const { data: news } = useSWR<{
        results: number;
        news: INews[];
    }>("/news?p=1&r=3&type=published");

    const tagNews = (tag_id) => {
        if (news) {
            const tempState = [];
            const find = news.news.map((n) => {
                n.tags.map((i) => {
                    if (i.tag_id === tag_id) tempState.push(tag_id);
                });
            });

            return tempState.length;
        }
    };

    return (
        <footer className={styles.footer}>
            <div className={styles.section1}>
                <div className={styles.container}>
                    <div className={styles.logo}>
                        <div className={styles.logoContainer}>
                            <ImageOpt
                                src="/logo.svg"
                                location="local"
                                layout="fill"
                                objectFit="contain"
                            />
                        </div>
                        <p>من العالم المبتدأ ... ونحن الخبر</p>
                    </div>
                    <div className={styles.sections}>
                        <h3>الأقسام</h3>
                        <div className={styles.content}>
                            {sections
                                ?.sort(
                                    (a, b) =>
                                        Number(a.section_order) -
                                        Number(b.section_order)
                                )
                                ?.map((s) => (
                                    <Link href={`/sections/${s.section_id}`}>
                                        <a style={{ borderColor: s.color }}>
                                            {s.section_name}
                                        </a>
                                    </Link>
                                ))}
                        </div>
                    </div>
                    <div className={styles.socialMedia}>
                        <h3>وسائل التواصل الاجتماعي</h3>
                        <div className={styles.content}>
                            <div className={styles.item}>
                                <ImageOpt
                                    src="/facebook.png"
                                    location="local"
                                    width={30}
                                    height={30}
                                />
                            </div>
                            <div className={styles.item}>
                                <ImageOpt
                                    src="/twitter.png"
                                    location="local"
                                    width={30}
                                    height={30}
                                />
                            </div>
                            <div className={styles.item}>
                                <ImageOpt
                                    src="/instagram.png"
                                    location="local"
                                    width={30}
                                    height={30}
                                />
                            </div>
                            <div className={styles.item}>
                                <ImageOpt
                                    src="/telegram.png"
                                    location="local"
                                    width={30}
                                    height={30}
                                />
                            </div>
                            <div className={styles.item}>
                                <ImageOpt
                                    src="/whatsapp.png"
                                    location="local"
                                    width={30}
                                    height={30}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.section2}>
                <div className={styles.contentContainer}>
                    <p>
                        جميع الحقوق محفوظة © {new Date().getFullYear()} الرمسة.
                        طور بواسطة كراون فينيكس للاستشارات التسويقية.
                    </p>
                    <p>
                        <span>
                            <Link href="/">
                                <a>الشروط والأحكام</a>
                            </Link>
                        </span>
                        <span>
                            <Link href="/">
                                <a>تواصل بنا</a>
                            </Link>
                        </span>
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
