import {
    createStyles,
    makeStyles,
    Theme,
    Divider,
    Box,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { apiCall } from "../../../utils/apiCall";
import { RootReducer } from "../../../store/reducers";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { IFile } from "../../../types/file";
import { IImage } from "../../../types/image";

// components
import TextField from "../../form/input";
import Button from "../../form/button";
import ImagePicker from "../../../components/admin/image/imagePicker";
import ImageInput from "../../form/imageInput";

interface IProps {
    file?: IFile;
}

interface IState {
    text: string;
    image: IImage | null;
}

interface IError {
    text: string[];
    image: string[];
}

const FileForm = ({ file }: IProps) => {
    const classes = useStyles();
    const router = useRouter();
    const [imagesPick, setImagesPick] =
        useState<null | { toForm: boolean }>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const user = useSelector((state: RootReducer) => state.auth.user);
    const [errors, setErrors] = useState<IError>({
        text: [],
        image: [],
    });
    const [state, setState] = useState<IState>({
        text: "",
        image: null,
    });

    useEffect(() => {
        if (file) {
            setState({
                ...state,
                text: file.text || "",
                image: file.image || null,
            });
        }
    }, [file]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!handleValidate()) return;

        try {
            setLoading(true);

            if (!file) {
                await apiCall("post", `/files?authId=${user.user_id}`, state);
            } else {
                await apiCall(
                    "put",
                    `/file/${file.file_id}?authId=${user.user_id}`,
                    state
                );
            }

            router.push("/admin/files");
        } catch (err) {
            setErrors((prevErrors) => ({ ...prevErrors, ...err }));
        } finally {
            setLoading(false);
        }
    };

    const handleValidate = () => {
        const TmpErrors: IError = {
            text: [],
            image: [],
        };

        if (!state.text.trim()) {
            TmpErrors.text.push("Please fill in text.");
        }

        if (!state.image) {
            TmpErrors.image.push("Please choose an image.");
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

    const handlePick = (toForm?: boolean) => {
        if (imagesPick) {
            return setImagesPick(null);
        }

        setImagesPick({ toForm: !!toForm });
    };

    return (
        <>
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
                <div>
                    <div className={classes.double}>
                        <div>
                            <div className={classes.formGroup}>
                                <TextField
                                    name="text"
                                    label="اسم"
                                    state={state}
                                    setState={setState}
                                    required={true}
                                    errors={errors}
                                    variant="outlined"
                                />
                            </div>
                        </div>
                        <div>
                            <ImageInput
                                text="اختر بعض الصور الفرعية"
                                errors={errors}
                                name="image"
                                handler={() => handlePick()}
                                type="single"
                                images={state.image ? [state.image] : []}
                                toForm={() => handlePick(true)}
                            />
                            <Box mt={3} mb={3}>
                                <Divider />
                            </Box>
                        </div>
                    </div>
                    <div>
                        <Button
                            fullWidth
                            type="submit"
                            color="purple"
                            variant="contained"
                            loading={loading}
                            text={file ? "احفظ التغييرات" : "اضافة الملف"}
                        />
                    </div>
                </div>
            </form>
            {imagesPick && (
                <ImagePicker
                    type="single"
                    openForm={imagesPick.toForm}
                    close={handlePick}
                    state={state}
                    setState={setState}
                    fieldName="image"
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
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        },
        colorBox: {
            width: "100%",
            height: "50px",
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[5],
        },
    })
);

export default FileForm;
