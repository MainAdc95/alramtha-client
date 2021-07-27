import Head from "next/head";
import { apiImage, domain } from "../utils/apiCall";

interface IProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
    children?: React.ReactNode | React.ReactNode[];
}

const alramsahSuDescription = `موقع الرمسة .. صوت الحقيقة .. يقارب الصورة من كل زواياها ويقربها للقاريء يعنى بأخبار العرب والعالم  ، ويقدم أخبار أونلاين من العالم في مختلف المجالات، السياسية والاقتصادية  والثقافية والرياضية والصحية.

الرمسة موقع يؤمن بان الصحافة رسالة انسانية واخلاقية بامتياز هويته العربية يفتخر بها ولا يفرط  بها . التزامه الوطني والقومي تتم ترجمته  كتابة لا شعارات 

تابعونا ليصلكم كل جديد من العرب والعالم وعنهم 


موقع الرمسة 

موقع سياسي اقتصادي ثقافي فني تتوزع موادنا بين خبر وتقرير وتحليل ومقابلة وترجمة ودراسة ومقالة وفيديو`;

const HeadLayout = ({ title, description, image, url, children }: IProps) => {
    return (
        <Head>
            <meta property="og:type" content="website" />
            <title>{title ? `${title} | الرمسة` : `الرمسة`}</title>
            <meta
                name="title"
                content={title ? `${title} | الرمسة` : `الرمسة`}
            />
            <meta
                property="og:title"
                content={title ? `${title} | الرمسة` : `الرمسة`}
            />
            <meta
                property="twitter:title"
                content={title ? `${title} | الرمسة` : `الرمسة`}
            />
            {description && (
                <>
                    <meta
                        name="description"
                        content={description || alramsahSuDescription}
                    />
                    <meta
                        property="og:description"
                        content={description || alramsahSuDescription}
                    />
                    <meta
                        property="twitter:description"
                        content={description || alramsahSuDescription}
                    />
                </>
            )}
            {image && (
                <>
                    <meta
                        property="og:image"
                        itemProp="image"
                        content={apiImage(image)}
                    />
                    <meta property="twitter:image" content={apiImage(image)} />
                </>
            )}
            <meta name="twitter:card" content="summary_large_image" />
            {url && <meta property="og:url" content={domain + url} />}
            {children}
        </Head>
    );
};

export default HeadLayout;
