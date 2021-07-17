import {
    createStyles,
    makeStyles,
    Theme,
    MenuItem,
    Box,
    Divider,
} from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { useEffect, useState } from "react";
import { apiCall } from "../../../utils/apiCall";
import { RootReducer } from "../../../store/reducers";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { INews } from "../../../types/news";
import { IImage } from "../../../types/image";
import useSWR from "swr";
import { ITag } from "../../../types/tag";
import { ISection } from "../../../types/section";

// components
import TextField from "../../form/input";
import Button from "../../form/button";
import ImagePicker from "../../../components/admin/image/imagePicker";
import ImageInput from "../../form/imageInput";
import Select from "../../form/select";
import TextEditor from "../../form/textEditor";
import TagForm from "../tag/tagForm";
import NewsPreview from "./newsPreview";

// icons
import RemoveIcon from "@material-ui/icons/Remove";
import { IFile } from "../../../types/file";

interface IProps {
    news?: INews;
}

interface IState {
    title: string;
    thumbnail: IImage | null;
    is_published: boolean;
    text: string;
    images: IImage[];
    section: string;
    file: string;
    intro: string;
    subTitles: { sub_title: string }[];
    tags: ITag[];
    resources: { resource: string }[];
}

interface IError {
    thumbnail: string[];
    title: string[];
    is_published: string[];
    text: string[];
    images: string[];
    file: string[];
    intro: string[];
    tags: string[];
    section: string[];
    resources: string[];
}

const NewsForm = ({ news }: IProps) => {
    const classes = useStyles();
    const router = useRouter();
    const { data: sections } = useSWR<ISection[]>(`/sections`);
    const { data: files } = useSWR<IFile[]>(`/files`);
    const [loading, setLoading] = useState<boolean>(false);
    const toCreate: any = useSelector(
        (state: RootReducer) => state.news.toCreate
    );
    const [createFrom, setCreateFrom] =
        useState<"message" | "rss" | null>(null);
    const user = useSelector((state: RootReducer) => state.auth.user);
    const [isPreview, setPreview] = useState<INews | null>(null);
    const [imagesPick, setImagesPick] =
        useState<null | { toForm: boolean }>(null);
    const [isThumbnail, setThumbnail] =
        useState<null | { toForm: boolean }>(null);
    const { data } = useSWR(`/tags`);
    const [subTitle, setSubTitle] = useState({
        sub_title: "",
        error: "",
    });
    const [resource, setResource] = useState({
        resource: "",
        error: "",
    });
    const [errors, setErrors] = useState<IError>({
        thumbnail: [],
        title: [],
        is_published: [],
        text: [],
        images: [],
        intro: [],
        section: [],
        file: [],
        tags: [],
        resources: [],
    });
    const [state, setState] = useState<IState>({
        title: "",
        thumbnail: null,
        text: "",
        images: [],
        section: "",
        file: "",
        intro: "",
        is_published: false,
        subTitles: [],
        resources: [{ resource: "الرمسة" }],
        tags: [],
    });

    useEffect(() => {
        const from = router.asPath.split("#")[1];

        switch (from) {
            case "message":
                return setCreateFrom("message");
            case "rss":
                return setCreateFrom("rss");
            default:
                return;
        }
    }, []);

    // _________________________________________ handle type
    useEffect(() => {
        if (toCreate) {
            switch (createFrom) {
                case "message":
                    return setState({
                        ...state,
                        images: toCreate.images,
                        title: toCreate.subject,
                        text: toCreate.text,
                    });
                case "rss":
                default:
                    return null;
            }
        }

        return () => {};
    }, [createFrom]);

    // _________________________________________ seed state with news data
    useEffect(() => {
        if (news) {
            return setState({
                ...state,
                thumbnail: news?.thumbnail || null,
                title: news.title || "",
                intro: news.intro || "",
                text: news.text || "",
                section: news.section?.section_id || "",
                file: news.file?.file_id || "",
                subTitles: news.sub_titles || [],
                resources: news.resources || [],
                tags: news.tags || [],
                images: news.images || [],
                is_published: news.is_published || false,
            });
        }

        clear();
    }, [news]);

    const clear = () => {
        setState({
            ...state,
            title: "",
            intro: "",
            text: "",
            section: "",
            tags: [],
            subTitles: [],
            images: [],
            is_published: false,
        });
    };

    // ____________________________________ handle imagesPick
    const handlePick = (toForm?: boolean) => {
        if (imagesPick) {
            return setImagesPick(null);
        }

        setImagesPick({ toForm: !!toForm });
    };

    // ____________________________________ handle sub title
    const handleSubTitle = (e: any) => {
        setSubTitle({
            ...subTitle,
            [e.target.name]: e.target.value,
        });

        validateSubTitle(e.target.value);
    };

    const addSubTitle = () => {
        if (validateSubTitle(subTitle.sub_title)) return;

        setState({
            ...state,
            subTitles: [...state.subTitles, { sub_title: subTitle.sub_title }],
        });

        setSubTitle({ ...subTitle, sub_title: "" });
    };

    const removeSubTitle = (index: any) => {
        setState({
            ...state,
            subTitles: state.subTitles.filter((s, i) => i !== index),
        });
    };

    const validateSubTitle = (val: string) => {
        if (!val) {
            setSubTitle((prev: any) => ({
                ...prev,
                error: "Please fill in sub title.",
            }));

            return true;
        }

        setSubTitle((prev: any) => ({ ...prev, error: "" }));
        return false;
    };

    // ____________________________________ handle resources
    const handleResource = (e: any) => {
        setResource({
            ...resource,
            [e.target.name]: e.target.value,
        });

        validateResource(e.target.value);
    };

    const addResource = () => {
        if (validateResource(resource.resource)) return;

        setState({
            ...state,
            resources: [...state.resources, { resource: resource.resource }],
        });

        setResource({ ...resource, resource: "" });
    };

    const removeResource = (index: any) => {
        setState({
            ...state,
            resources: state.resources.filter((s, i) => i !== index),
        });
    };

    const validateResource = (val: string) => {
        if (!val) {
            setResource((prev: any) => ({
                ...prev,
                error: "Please fill in resource.",
            }));

            return true;
        }

        setResource((prev: any) => ({ ...prev, error: "" }));
        return false;
    };

    // ________________________________________________ tags
    const handleTags = (e: any, values: any) => {
        setState({ ...state, tags: values });
    };

    // _________________________________________________ thumbnail
    const toggleThumbnail = (toForm?: boolean) => {
        if (isThumbnail) {
            return setThumbnail(null);
        }

        setThumbnail({ toForm: !!toForm });
    };

    const handleSubmit = async (type: "publish" | "draft") => {
        if (!handleValidate()) return;

        try {
            setLoading(true);

            if (!news) {
                await apiCall("post", `/news?authId=${user.user_id}`, {
                    ...state,
                    is_published: type === "publish" ? true : false,
                });
            } else {
                await apiCall(
                    "put",
                    `/news/${news.news_id}?authId=${user.user_id}`,
                    state
                );
            }

            router.push("/admin/news");
        } catch (err) {
            setErrors((prevErrors) => ({ ...prevErrors, ...err }));
        } finally {
            setLoading(false);
        }
    };

    const handleValidate = () => {
        const TmpErrors: IError = {
            thumbnail: [],
            title: [],
            intro: [],
            images: [],
            is_published: [],
            text: [],
            section: [],
            file: [],
            tags: [],
            resources: [],
        };

        setErrors(TmpErrors);

        for (let e of Object.values(TmpErrors)) {
            if (e.length) {
                window.scrollTo(0, 0);
                return false;
            }
        }

        return true;
    };

    // ______________________________ preview
    const togglePreview = () => {
        if (isPreview) {
            return setPreview(null);
        }

        setPreview(state as any);
    };

    // __________________________ select tag
    const selectNewTag = (tag: ITag) => {
        setState({ ...state, tags: [...state.tags, tag] });
    };

    return (
        <>
            <div>
                <div>
                    <div className={classes.double}>
                        <div>
                            <div className={classes.formGroup}>
                                <TextField
                                    name="title"
                                    label="العنوان"
                                    state={state}
                                    setState={setState}
                                    multiline={true}
                                    errors={errors}
                                    variant="outlined"
                                />
                            </div>
                            <Box mb={3}>
                                <Divider />
                            </Box>
                            <div className={classes.formGroup}>
                                <TextField
                                    name="intro"
                                    label="المقدمة"
                                    multiline={true}
                                    state={state}
                                    setState={setState}
                                    errors={errors}
                                    variant="outlined"
                                />
                            </div>
                            <Box mb={3}>
                                <Divider />
                            </Box>
                            <div className={classes.formGroup}>
                                <Select
                                    name="section"
                                    label="القسم"
                                    errors={errors}
                                    state={state}
                                    setState={setState}
                                >
                                    {sections?.map((section) => (
                                        <MenuItem value={section.section_id}>
                                            {section.section_name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>
                            <Box mb={3}>
                                <Divider />
                            </Box>
                            <div className={classes.formGroup}>
                                <Select
                                    name="file"
                                    label="ملف"
                                    errors={errors}
                                    state={state}
                                    setState={setState}
                                >
                                    {files?.map((file) => (
                                        <MenuItem value={file.file_id}>
                                            {file.text}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>
                            <Box mb={3}>
                                <Divider />
                            </Box>
                            <div className={classes.subTitlesWrapper}>
                                {state.subTitles.map((sub, i) => (
                                    <div className={classes.subTitleContainer}>
                                        <p>{sub.sub_title}</p>
                                        <div style={{ direction: "ltr" }}>
                                            <Button
                                                onClick={() =>
                                                    removeSubTitle(i)
                                                }
                                                text="حذف"
                                                startIcon={<RemoveIcon />}
                                                color="red"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={classes.formGroup}>
                                <TextField
                                    name="sub_title"
                                    label="عنوان فرعي"
                                    value={subTitle.sub_title}
                                    onChange={handleSubTitle}
                                    onKeyDown={(e: any) => {
                                        if (e.keyCode === 13) {
                                            addSubTitle();
                                        }
                                    }}
                                    errors={{
                                        sub_title: subTitle.error
                                            ? [subTitle.error]
                                            : [],
                                    }}
                                    variant="outlined"
                                />
                                <Box mt={2}>
                                    <Button
                                        fullWidth
                                        type="button"
                                        color="purple"
                                        variant="contained"
                                        onClick={addSubTitle}
                                        loading={loading}
                                        text={"أضافة عنوان فرعي"}
                                    />
                                </Box>
                            </div>
                            <Box mb={3}>
                                <Divider />
                            </Box>
                            <div className={classes.resourcesWrapper}>
                                {state.resources.map((sub, i) => (
                                    <div className={classes.resourceContainer}>
                                        <p>{sub.resource}</p>
                                        <div style={{ direction: "ltr" }}>
                                            <Button
                                                onClick={() =>
                                                    removeResource(i)
                                                }
                                                text="حذف"
                                                startIcon={<RemoveIcon />}
                                                color="red"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className={classes.formGroup}>
                                <TextField
                                    name="resource"
                                    label="عنوان فرعي"
                                    value={resource.resource}
                                    onChange={handleResource}
                                    onKeyDown={(e: any) => {
                                        if (e.keyCode === 13) {
                                            addResource();
                                        }
                                    }}
                                    errors={{
                                        resource: resource.error
                                            ? [resource.error]
                                            : [],
                                    }}
                                    variant="outlined"
                                />
                                <Box mt={2}>
                                    <Button
                                        fullWidth
                                        type="button"
                                        color="purple"
                                        variant="contained"
                                        onClick={addResource}
                                        loading={loading}
                                        text={"أضافة عنوان فرعي"}
                                    />
                                </Box>
                            </div>
                        </div>
                        <div className={classes.formGroup}>
                            <ImageInput
                                text="الرئيسية"
                                errors={errors}
                                name="thumbnail"
                                handler={() => toggleThumbnail()}
                                toForm={() => toggleThumbnail(true)}
                                type="single"
                                images={
                                    state.thumbnail ? [state.thumbnail] : []
                                }
                            />
                            <Box mt={3} mb={3}>
                                <Divider />
                            </Box>
                            <ImageInput
                                text="اختر بعض الصور الفرعية"
                                errors={errors}
                                name="images"
                                handler={() => handlePick()}
                                toForm={() => handlePick(true)}
                                type="multiple"
                                images={state.images}
                            />
                            <Box mt={3} mb={3}>
                                <Divider />
                            </Box>
                            <div className={classes.formGroup}>
                                <Autocomplete
                                    multiple
                                    options={data || []}
                                    getOptionLabel={(option) =>
                                        option?.tag_name
                                    }
                                    value={state.tags}
                                    filterSelectedOptions
                                    onChange={handleTags}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            name="tags"
                                            errors={errors}
                                            variant="outlined"
                                            label="وسوم"
                                            onChange="none"
                                            placeholder="أختر بعض وسوم"
                                        />
                                    )}
                                />
                                <Box mt={3}>
                                    <TagForm
                                        redirect={false}
                                        addToSelect={selectNewTag}
                                    />
                                </Box>
                            </div>
                        </div>
                    </div>
                    <Box mb={3}>
                        <Divider />
                    </Box>
                    <div className={classes.formGroup}>
                        <TextEditor
                            direction="rtl"
                            name="text"
                            id="text"
                            label="نص الخبر"
                            state={state}
                            setState={setState}
                            errors={errors}
                        />
                    </div>
                    <div className={classes.triple}>
                        <div>
                            <Button
                                fullWidth
                                onClick={() => handleSubmit("publish")}
                                type="submit"
                                color="purple"
                                variant="contained"
                                loading={loading}
                                text={news ? "احفظ التغييرات" : "أضافة الخبر"}
                            />
                        </div>
                        {!news && (
                            <div>
                                <Button
                                    fullWidth
                                    onClick={() => handleSubmit("draft")}
                                    type="submit"
                                    color="black"
                                    variant="contained"
                                    loading={loading}
                                    text={
                                        news
                                            ? "احفظ التغييرات"
                                            : "رسل الى المسودة"
                                    }
                                />
                            </div>
                        )}
                        <div>
                            <Button
                                fullWidth
                                onClick={togglePreview}
                                type="submit"
                                color="pink"
                                variant="contained"
                                loading={loading}
                                text={"معاينة الخبر"}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {isThumbnail && (
                <ImagePicker
                    type="single"
                    close={toggleThumbnail}
                    state={state}
                    setState={setState}
                    openForm={isThumbnail.toForm}
                    fieldName="thumbnail"
                />
            )}
            {imagesPick && (
                <ImagePicker
                    openForm={imagesPick.toForm}
                    type="multiple"
                    close={handlePick}
                    state={state}
                    setState={setState}
                    fieldName="images"
                />
            )}
            {isPreview && (
                <NewsPreview close={togglePreview} news={isPreview} />
            )}
        </>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        grid: {
            flexGrow: 1,
        },
        formControl: {
            margin: theme.spacing(3),
        },
        formGroup: {
            padding: theme.spacing(0, 0, 3, 0),
        },
        double: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gridGap: theme.spacing(10),
        },
        triple: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr",
            gridGap: theme.spacing(10),
        },
        subTitlesWrapper: {
            display: "grid",
            gridTemplateColumns: "1fr",
            gridGap: "20px",
            margin: theme.spacing(0, 0, 3, 0),
        },
        subTitleContainer: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
        },
        resourcesWrapper: {
            display: "grid",
            gridTemplateColumns: "1fr",
            gridGap: "20px",
            margin: theme.spacing(0, 0, 3, 0),
        },
        resourceContainer: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
        },
    })
);

export default NewsForm;
