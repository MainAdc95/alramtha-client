import { createStyles, makeStyles, Theme } from "@material-ui/core";
import { useEffect, useState } from "react";
import { apiCall } from "../../../utils/apiCall";
import { RootReducer } from "../../../store/reducers";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { ITag } from "../../../types/tag";

// components
import TextField from "../../form/input";
import Button from "../../form/button";
import { mutate } from "swr";

interface IProps {
    tag?: ITag;
    redirect?: boolean;
    addToSelect?: any;
}

interface IState {
    tag_name: string;
}

interface IError {
    tag_name: string[];
}

const TagForm = ({ tag, redirect, addToSelect }: IProps) => {
    const classes = useStyles();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);
    const user = useSelector((state: RootReducer) => state.auth.user);
    const [errors, setErrors] = useState<IError>({
        tag_name: [],
    });
    const [state, setState] = useState<IState>({
        tag_name: "",
    });

    useEffect(() => {
        if (tag) {
            setState({
                ...state,
                tag_name: tag.tag_name || "",
            });
        }
    }, [tag]);

    const handleSubmit = async (e) => {
        if (!handleValidate()) return;

        try {
            setLoading(true);

            if (!tag) {
                const tag = await apiCall<ITag>(
                    "post",
                    `/tags?authId=${user.user_id}`,
                    state
                );

                mutate(`/tags`, (tags: ITag[]) => [tag, ...tags], false);

                setState({
                    ...state,
                    tag_name: "",
                });

                if (addToSelect) {
                    handleAddToSelect(tag);
                }

                if (redirect) router.push("/admin/tags");
            } else {
                await apiCall(
                    "put",
                    `/tag/${tag.tag_id}?authId=${user.user_id}`,
                    state
                );
            }
        } catch (err) {
            setErrors((prevErrors) => ({ ...prevErrors, ...err }));
        } finally {
            setLoading(false);
        }
    };

    const handleValidate = () => {
        const TmpErrors: IError = {
            tag_name: [],
        };

        if (!state.tag_name.trim()) {
            TmpErrors.tag_name.push("Please fill in tag name.");
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

    // ______________________ handle add to select
    const handleAddToSelect = (tag: ITag) => {
        addToSelect(tag);
    };

    return (
        <>
            <div onSubmit={(e) => e.preventDefault()}>
                <div>
                    <div className={classes.formGroup}>
                        <TextField
                            name="tag_name"
                            label="اسم الوسم"
                            state={state}
                            setState={setState}
                            required={true}
                            errors={errors}
                            variant="outlined"
                        />
                    </div>
                    <div>
                        <Button
                            fullWidth
                            type="button"
                            color="purple"
                            onClick={handleSubmit}
                            variant="contained"
                            loading={loading}
                            text={tag ? "تحرير الوسم" : "اضافة الوسم"}
                        />
                    </div>
                </div>
            </div>
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

export default TagForm;
