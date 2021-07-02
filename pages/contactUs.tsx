// Main
import { useState } from "react";

// Components
import SideBar from "../components/sideBar";
import { Box, Grid, Button } from "@material-ui/core";

// Style
import styles from "../styles/Contact.module.scss";

interface IState {
    name: string;
    email: string;
    website: string;
    message: string;
}

interface IError {
    name: string[];
    email: string[];
    message: string[];
}

const Contact = () => {
    const [state, setState] = useState({
        name: "",
        email: "",
        website: "",
        message: "",
    });
    const [errors, setErrors] = useState<IError>({
        name: [],
        email: [],
        message: [],
    });

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    const validator = () => {
        const tempErrors: IError = {
            name: [],
            email: [],
            message: [],
        };

        if (!state.name) tempErrors.name.push("Please Fill The name");
        if (!state.email) tempErrors.email.push("Please Fill The email");
        if (!state.message) tempErrors.message.push("Please Fill The message");

        setErrors(tempErrors);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        validator();
    };

    return (
        <>
            <div className={styles.page}>
                <div className="container">
                    <Grid container className="grid-root" spacing={1}>
                        <Grid item xs={12} md={8}>
                            <div className={styles.contactInfo}>
                                <div
                                    className="author-title"
                                    style={{ textAlign: "end" }}
                                >
                                    <h1>
                                        <span>تواصل معنا</span>
                                    </h1>
                                </div>

                                <p>
                                    ن المنتظر أن يتقدم محامو الرئيس الأمريكي
                                    دونالد ترامب بدفوعات وحجج نهائية للدفاع عن
                                    مجموعته التجارية التي تواجه شبهات جنائية
                                    بشأن تعاملاتها المالية. وأمهل المدعون
                                    العامون في نيويورك محامي ترامب فترة 24 ساعة
                                    لتقديم تلك الدفوعات، بحسب صحيفة الواشنطن
                                    بوست. وتضم مجموعة ترامب مئات الشركات ذات
                                    المسؤولية المحدودة، وتضم فنادق، شركات
                                    عقارية، ملاعب للغولف، وغيرها. وبعد تحقيق
                                    لأكثر من عامين في أعمال المنظمة، لم يتم
                                    اتهام أي كيان أو فرد حتى الآن، ولا يزال من
                                    الممكن عدم توجيه أي تهم، إلا أن على وكلاء
                                    ترامب تقديم الحجج النهائية قبل فترة بعد ظهر
                                    يوم الاثنين بالتوقيت المحلي. ويركز المدعون
                                    عما إذا كانت منظمة ترامب قد استخدمت تقييمات
                                    مضللة لممتلكاتها لخداع المقرضين والسلطات
                                    الضريبية، وما إذا كانت الضرائب قد تم دفعها
                                    على المزايا الإضافية للمديرين التنفيذيين في
                                    المنظمة، وفقا لما نقلته الصحيفة عن وثائق
                                    المحكمة والأشخاص المطلعين على التحقيقات.
                                    ويوم الخميس الماضي، التقى المحامون الوكلاء
                                    عن ترامب شخصيا مع المدعين العامين لإثبات أن
                                    الشبهات ليست مبررة، علما أن مثل هذه
                                    الاجتماعات شائعة في التحقيقات المالية، ما
                                    يسمح لمحامي الدفاع بفرصة تقديم الأدلة قبل أن
                                    يتخذ المدعون قرارا بشأن توجيه التهم. وأكد
                                    أشخاص مطلعون للصحيفة أن المدعين العامين
                                    يبحثان في اتهام منظمة ترامب ككيان، وكذلك
                                    المدير المالي لها، ألين فايسلبرغ، بعد رفض
                                    الأخير المساعدة في التحقيق، بحسب ما علمته
                                    الصحيفة. وأوضح محامي ترامب، رونالد فيشتي،
                                    الذي شارك في اجتماع يوم الخميس، أن المدعين
                                    يعتبرون أن فايسلبرغ “لم يتعاون ويقول ما
                                    يريدون منه أن يقوله” فيما يتعلق بما إذا كان
                                    ترامب لديه معرفة شخصية بالاستخدام المزعوم
                                    للسيارات والشقق والتعويضات الأخرى التي يعتقد
                                    المدعون أنها ربما لم يتم الإبلاغ عنها بشكل
                                    صحيح إلى سلطات الضرائب. وفي الشهر الماضي،
                                    وصف ترامب التحقيقات بأنها “مطاردة ساحرات”
                                    يديرها ديمقراطيون يسعون إلى الإضرار بآفاقه
                                    السياسية المستقبلية.
                                </p>
                            </div>

                            <div className={styles.contactForm}>
                                <div
                                    className="author-title"
                                    style={{ textAlign: "end" }}
                                >
                                    <h1>
                                        <span> راسلنا الأن</span>
                                    </h1>
                                </div>
                                <form onSubmit={handleSubmit}>
                                    <Grid
                                        container
                                        className="grid-root"
                                        spacing={3}
                                    >
                                        <Grid item xs={12}>
                                            <Grid
                                                container
                                                className="grid-root"
                                                spacing={2}
                                            >
                                                <Grid item xs={12} md={4}>
                                                    <label
                                                        className="form-label"
                                                        htmlFor="name"
                                                    >
                                                        الأسم
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="name"
                                                        value={state.name}
                                                        onChange={handleChange}
                                                        className="form-input"
                                                        placeholder="الأسم"
                                                        required
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <label
                                                        className="form-label"
                                                        htmlFor="email"
                                                    >
                                                        البريد الألكتروني
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="email"
                                                        value={state.email}
                                                        onChange={handleChange}
                                                        className="form-input"
                                                        placeholder="البريد الألكتروني"
                                                        required
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={4}>
                                                    <label
                                                        className="form-label"
                                                        htmlFor="website"
                                                    >
                                                        الموقع الألكتروني
                                                    </label>
                                                    <input
                                                        type="text"
                                                        name="website"
                                                        value={state.website}
                                                        onChange={handleChange}
                                                        className="form-input"
                                                        placeholder="الموقع الألكتروني"
                                                    />
                                                </Grid>
                                            </Grid>
                                        </Grid>

                                        <Grid item xs={12}>
                                            <label
                                                className="form-label"
                                                htmlFor="message"
                                            >
                                                نص الرسالة
                                            </label>
                                            <textarea
                                                onChange={handleChange}
                                                name="message"
                                                className="text-area"
                                                placeholder="نص الرسالة"
                                            >
                                                {state.message}
                                            </textarea>
                                        </Grid>
                                    </Grid>

                                    <Box mt={2}>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                        >
                                            ارسال
                                        </Button>
                                    </Box>
                                </form>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <SideBar />
                        </Grid>
                    </Grid>
                </div>
            </div>
        </>
    );
};

export default Contact;
