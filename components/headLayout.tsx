import Head from "next/head";

interface IProps {
    title?: string;
    description?: string;
    image?: string;
    url?: string;
    type?: string;
    children?: React.ReactNode | React.ReactNode[];
}

const alramsahSum = `موقع الرمسة .. صوت الحقيقة .. يقارب الصورة من كل زواياها ويقربها للقاريء يعنى بأخبار العرب والعالم  ، ويقدم أخبار أونلاين من العالم في مختلف المجالات، السياسية والاقتصادية  والثقافية والرياضية والصحية.

الرمسة موقع يؤمن بان الصحافة رسالة انسانية واخلاقية بامتياز هويته العربية يفتخر بها ولا يفرط  بها . التزامه الوطني والقومي تتم ترجمته  كتابة لا شعارات 

تابعونا ليصلكم كل جديد من العرب والعالم وعنهم 


موقع الرمسة 

موقع سياسي اقتصادي ثقافي فني تتوزع موادنا بين خبر وتقرير وتحليل ومقابلة وترجمة ودراسة ومقالة وفيديو`;

const HeadLayout = ({ title, description, image, children }: IProps) => {
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
                        content={description || alramsahSum}
                    />
                    <meta
                        property="og:description"
                        content={description || alramsahSum}
                    />
                    <meta
                        property="twitter:image"
                        content={description || alramsahSum}
                    />
                </>
            )}
            {image && (
                <>
                    <meta property="og:image" content={image} />
                    <meta property="twitter:image" content={image} />
                    <meta property="twitter:card" content={image} />
                </>
            )}
            {children}
        </Head>
    );
};

export default HeadLayout;
