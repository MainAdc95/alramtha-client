import { createStyles, makeStyles, Theme, MenuItem } from "@material-ui/core";
import { useEffect, useState } from "react";
import { apiCall } from "../../../utils/apiCall";
import { RootReducer } from "../../../store/reducers";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { IImage } from "../../../types/image";
import { IMessage } from "../../../types/message";
import useSWR from "swr";
import { IUser } from "../../../types/user";

// components
import TextField from "../../form/input";
import Button from "../../form/button";
import TextEditor from "../../form/textEditor";
import ImagePicker from "../../../components/admin/image/imagePicker";
import ImageInput from "../../form/imageInput";
import Select from "../../form/select";

interface IProps {
    message?: IMessage;
}

interface IState {
    subject: string;
    to: string;
    text: string;
    images: IImage[];
}

interface IError {
    subject: string[];
    to: string[];
    text: string[];
    images: string[];
}

const MessageForm = ({ message }: IProps) => {
    const classes = useStyles();
    const user = useSelector((state: RootReducer) => state.auth.user);
    const { data: users } = useSWR<IUser[]>(`/users?authId=${user.user_id}`);
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const [imagesPick, setImagesPick] =
        useState<null | { toForm: boolean }>(null);
    const [isForward, setForward] = useState(false);
    const [replay, setReplay] = useState<string | null>(null);
    const [errors, setErrors] = useState<IError>({
        subject: [],
        text: [],
        images: [],
        to: [],
    });
    const [state, setState] = useState<IState>({
        subject: "",
        text: "",
        to: "",
        images: [],
    });

    useEffect(() => {
        const uri = router.asPath;

        const forward = uri.split("#")[1];

        if (forward === "forward") setForward(true);

        if (router.query.replay) setReplay(String(router.query.replay));
    }, []);

    useEffect(() => {
        if (message) {
            if (router.query.replay) {
                setState({
                    ...state,
                    to: replay || "",
                });
            } else {
                setState({
                    ...state,
                    subject: message.subject,
                    text: message.text,
                    images: message.images,
                    to: replay || "",
                });
            }
        }
    }, [message, replay]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!handleValidate()) return;

        try {
            setLoading(true);

            if (!message) {
                await apiCall("post", `/message?authId=${user.user_id}`, state);
            } else {
            }

            router.push("/admin/messages");
        } catch (err) {
            setErrors((prevErrors) => ({ ...prevErrors, ...err }));
        } finally {
            setLoading(false);
        }
    };

    const handleValidate = () => {
        const TmpErrors: IError = {
            subject: [],
            to: [],
            text: [],
            images: [],
        };

        if (!state.subject) {
            TmpErrors.subject.push("Please fill in subject.");
        }

        if (!state.to) {
            TmpErrors.to.push("Please choose to whom.");
        }

        if (!state.text) {
            TmpErrors.text.push("Please fill in text.");
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
                                    name="subject"
                                    label="الموضوع"
                                    state={state}
                                    setState={setState}
                                    required={true}
                                    errors={errors}
                                    variant="outlined"
                                />
                            </div>
                            <div className={classes.formGroup}>
                                <Select
                                    name="to"
                                    label="الى"
                                    errors={errors}
                                    state={state}
                                    setState={setState}
                                >
                                    {users?.map((user) => (
                                        <MenuItem value={user.user_id}>
                                            {user.username}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>
                        </div>
                        <div>
                            <ImageInput
                                text="اختر بعض الصور"
                                name="images"
                                handler={handlePick}
                                toForm={() => handlePick(true)}
                                type="multiple"
                                images={state.images}
                            />
                        </div>
                    </div>
                    <div className={classes.formGroup}>
                        <TextEditor
                            name="text"
                            direction="rtl"
                            id="text"
                            label="نص الرسالة"
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
                            text={"ارسال رسالة"}
                        />
                    </div>
                </div>
            </form>
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
        colorBox: {
            width: "100%",
            height: "50px",
            borderRadius: theme.shape.borderRadius,
            boxShadow: theme.shadows[5],
        },
    })
);

export default MessageForm;
