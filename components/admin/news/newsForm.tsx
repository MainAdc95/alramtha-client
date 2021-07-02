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

// icons
import RemoveIcon from "@material-ui/icons/Remove";
import Error from "../../form/error";

interface IProps {
    news?: INews;
}

interface IState {
    title: string;
    is_published: boolean;
    text: string;
    images: IImage[];
    section: string;
    intro: string;
    subTitles: { sub_title: string }[];
    tags: ITag[];
}

interface IError {
    title: string[];
    is_published: string[];
    text: string[];
    images: string[];
    intro: string[];
    tags: string[];
    section: string[];
}

const NewsForm = ({ news }: IProps) => {
    const classes = useStyles();
    const router = useRouter();
    const { data: sections } = useSWR<ISection[]>(`/sections`);
    const [loading, setLoading] = useState<boolean>(false);
    const user = useSelector((state: RootReducer) => state.auth.user);
    const [imagesPick, setImagesPick] = useState(false);
    const { data } = useSWR(`/tags`);
    const [subTitle, setSubTitle] = useState({
        sub_title: "",
        error: "",
    });
    const [errors, setErrors] = useState<IError>({
        title: [],
        is_published: [],
        text: [],
        images: [],
        intro: [],
        section: [],
        tags: [],
    });
    const [state, setState] = useState<IState>({
        title: "",
        text: "",
        images: [],
        section: "",
        intro: "",
        is_published: false,
        subTitles: [],
        tags: [],
    });
    console.log(state);
    // _________________________________________ seed state with news data
    useEffect(() => {
        if (news) {
            return setState({
                ...state,
                title: news.title || "",
                intro: news.intro || "",
                text: news.text || "",
                section: news.section?.section_id || "",
                subTitles: news.sub_titles || [],
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

    const handlePick = () => {
        setImagesPick(!imagesPick);
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

    // ________________________________________________ tags
    const handleTags = (e: any, values: any) => {
        setState({ ...state, tags: values });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!handleValidate()) return;

        try {
            setLoading(true);

            if (!news) {
                await apiCall("post", `/news?authId=${user.user_id}`, state);
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
            title: [],
            intro: [],
            images: [],
            is_published: [],
            text: [],
            section: [],
            tags: [],
        };

        if (!state.intro.trim()) {
            TmpErrors.intro.push("Please fill in introduction.");
        }

        if (!state.title.trim()) {
            TmpErrors.title.push("Please fill in title.");
        }

        if (!state.text) {
            TmpErrors.text.push("Please fill in text.");
        }

        if (!state.section) {
            TmpErrors.section.push("Please fill in section.");
        }

        if (!state.images.length) {
            TmpErrors.images.push("Please pick at least one image.");
        }

        if (!state.tags.length) {
            TmpErrors.tags.push("Please pick at least one tag.");
        }

        setErrors(TmpErrors);

        for (let e of Object.values(TmpErrors)) {
            if (e.length) {
                window.scrollTo(0, 0);
                return false;
            }
        }

        return true;
    };

    return (
        <>
            <form
                onKeyDown={(e) => {
                    if (e.keyCode == 13) {
                        e.preventDefault();
                        return false;
                    }
                }}
                onSubmit={handleSubmit}
                noValidate
                autoComplete="off"
            >
                <div>
                    <div className={classes.double}>
                        <div>
                            <div className={classes.formGroup}>
                                <TextField
                                    name="intro"
                                    label="المقدمة"
                                    state={state}
                                    setState={setState}
                                    required={true}
                                    errors={errors}
                                    variant="outlined"
                                />
                            </div>
                            <Box mb={3}>
                                <Divider />
                            </Box>
                            <div className={classes.formGroup}>
                                <TextField
                                    name="title"
                                    label="العنوان"
                                    state={state}
                                    setState={setState}
                                    required={true}
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
                            <div className={classes.subTitlesWrapper}>
                                {state.subTitles.map((sub, i) => (
                                    <div className={classes.subTitleContainer}>
                                        <p>{sub.sub_title}</p>
                                        <div>
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
                        </div>
                        <div className={classes.formGroup}>
                            <ImageInput
                                text="أختر بعض الصور"
                                errors={errors}
                                name="images"
                                handler={handlePick}
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
                                            label="العلامات"
                                            onChange="none"
                                            placeholder="أختر بعض العلامات"
                                        />
                                    )}
                                />
                            </div>
                        </div>
                    </div>
                    <Box mb={3}>
                        <Divider />
                    </Box>
                    <div className={classes.formGroup}>
                        <TextEditor
                            name="text"
                            id="text"
                            label="نص الخبر"
                            state={state}
                            setState={setState}
                            errors={errors}
                        />
                    </div>
                    <div>
                        <Button
                            fullWidth
                            type="submit"
                            color="purple"
                            variant="contained"
                            loading={loading}
                            text={news ? "تحرير الخبر" : "أضافة الخبر"}
                        />
                    </div>
                </div>
            </form>
            {imagesPick && (
                <ImagePicker
                    type="multiple"
                    close={handlePick}
                    state={state}
                    setState={setState}
                    fieldName="images"
                />
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
    })
);

export default NewsForm;
