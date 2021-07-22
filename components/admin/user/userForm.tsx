import { useState, useEffect } from "react";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl from "@material-ui/core/FormControl";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import { Button, Box, CircularProgress } from "@material-ui/core";
import { IUser } from "../../../types/user";
import { apiCall } from "../../../utils/apiCall";
import { RootReducer } from "../../../store/reducers";
import { useSelector } from "react-redux";
import { mutate } from "swr";

// components
import Modal from "../modal";

interface IError {}

interface IProps {
    user: IUser;
    close: any;
    mutateUrl: string;
}

const UserForm = ({ close, user, mutateUrl }: IProps) => {
    const [state, setState] = useState({
        is_editor: false,
        is_reporter: false,
        is_writer: false,
        is_admin_assistant: false,
        is_blocked: false,
        is_active: false,
    });
    const userId = useSelector((state: RootReducer) => state.auth.user.user_id);
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<IError>({});

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setState({ ...state, [event.target.name]: event.target.checked });
    };

    useEffect(() => {
        if (user) {
            setState({
                ...state,
                is_editor: user.is_editor || false,
                is_reporter: user.is_reporter || false,
                is_writer: user.is_writer || false,
                is_admin_assistant: user.is_admin_assistant || false,
                is_blocked: user.is_blocked || false,
                is_active: user.is_active || false,
            });
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!loading) {
            try {
                setLoading(true);
                if (!user) {
                } else {
                    await apiCall(
                        "put",
                        `/user/${user.user_id}/user_role?authId=${userId}`,
                        state
                    );

                    mutate(
                        mutateUrl,
                        (data: { users: IUser[] }) => {
                            return {
                                ...data,
                                users: data.users.map((u) =>
                                    u.user_id === user.user_id
                                        ? {
                                              ...u,
                                              is_reporter: state.is_reporter,
                                              is_editor: state.is_editor,
                                              is_writer: state.is_writer,
                                              is_admin_assistant:
                                                  state.is_admin_assistant,
                                              is_blocked: state.is_blocked,
                                              is_active: state.is_active,
                                          }
                                        : u
                                ),
                            };
                        },
                        false
                    );
                }

                close();
            } catch (err) {
                setLoading(false);
                setErrors({ ...errors, ...err });
            }
        }
    };

    return (
        <Modal width="300px" type="parent" closeInfo={{ close, check: true }}>
            <form onSubmit={handleSubmit}>
                <Box flexDirection="column" display="flex" width="100%">
                    <FormControl component="fieldset">
                        <FormLabel component="legend">
                            صلاحية المستخدم
                        </FormLabel>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Switch
                                        color="primary"
                                        checked={state.is_editor}
                                        onChange={handleChange}
                                        name="is_editor"
                                    />
                                }
                                label="محرر"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        color="primary"
                                        checked={state.is_reporter}
                                        onChange={handleChange}
                                        name="is_reporter"
                                    />
                                }
                                label="مراسل"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        color="primary"
                                        checked={state.is_writer}
                                        onChange={handleChange}
                                        name="is_writer"
                                    />
                                }
                                label="كاتب"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        color="primary"
                                        checked={state.is_admin_assistant}
                                        onChange={handleChange}
                                        name="is_admin_assistant"
                                    />
                                }
                                label="مساعد آدمن"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        color="primary"
                                        checked={state.is_blocked}
                                        onChange={handleChange}
                                        name="is_blocked"
                                    />
                                }
                                label="محظور"
                            />
                            <FormControlLabel
                                control={
                                    <Switch
                                        color="primary"
                                        checked={state.is_active}
                                        onChange={handleChange}
                                        name="is_active"
                                    />
                                }
                                label="فعال"
                            />
                        </FormGroup>
                    </FormControl>
                    <Box mt={2}>
                        <Button
                            fullWidth
                            color="secondary"
                            type="submit"
                            variant="contained"
                        >
                            {loading ? (
                                <CircularProgress style={{ color: "white" }} />
                            ) : (
                                "تأكيد"
                            )}
                        </Button>
                    </Box>
                </Box>
            </form>
        </Modal>
    );
};

export default UserForm;
