import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";
import { Box, Button, Tabs, Tab, TextField } from "@material-ui/core";
import Error from "./error";
import Modal from "../admin/modal";
import ImageOpt from "../imageOpt";
import { apiCall, domain } from "../../utils/apiCall";

interface ITextEditor {
    name: string;
    direction?: "rtl" | "ltr";
    id: string;
    state: any;
    setState: any;
    label: string;
    errors: any;
}

const TextEditor = ({
    name,
    direction,
    id,
    state,
    setState,
    label,
    errors,
}: ITextEditor) => {
    const [editorIsInitialized, setEditorIsInitialized] = useState(false);
    const [isSm, setSm] = useState(false);
    const [editor, setEditor] = useState<any>(null);

    // __________________________ event handlers
    // text
    const handleEditorChange = (e: any): void => {
        setState({ ...state, [name]: e });
    };

    // _______________________________ social media
    const handleToggleSm = () => {
        setSm(!isSm);
    };

    return (
        <>
            <div>
                <Box mb={2}>
                    <label htmlFor={id}>{label}</label>
                </Box>
                <Editor
                    value={editorIsInitialized ? state[name] : " "}
                    id={id}
                    onInit={(ev, e) => {
                        if (!editorIsInitialized) {
                            setEditorIsInitialized(true);
                            setEditor(e);
                        }
                    }}
                    apiKey="p2f3wrzpsomvt0lvr2uphccyzhlnxzopddrmptrb4addcxon"
                    init={{
                        height: 400,
                        language: "ar",
                        min_height: 200,
                        branding: false,
                        setup: function (e) {
                            e.ui.registry.addButton("customSocialMedia", {
                                text: "أدراج سوشل ميديا",
                                icon: "embed",
                                onAction: function (_) {
                                    handleToggleSm();
                                },
                            });
                        },
                        menubar: true,
                        plugins:
                            "fullscreen media embed code link preview print charmap emoticons",
                        directionality: direction || "ltr",
                        toolbar:
                            "undo redo | customSocialMedia | bold italic underline strikethrough | fontselect code fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor casechange formatpainter removeformat | pagebreak | charmap emoticons | fullscreen preview save print | pageembed embed template link anchor codesample | a11ycheck ltr rtl",
                    }}
                    onEditorChange={(e) => handleEditorChange(e)}
                />
                {errors && <Error errors={errors[name]} />}
            </div>
            {isSm && (
                <SocialMediaEmbeder close={handleToggleSm} editor={editor} />
            )}
        </>
    );
};

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <p>{children}</p>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: any) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

const SocialMediaEmbeder = ({ close, editor }) => {
    const [value, setValue] = useState(0);
    const [state, setState] = useState({
        fb: "",
        inst: "",
        twt: "",
        yt: "",
    });

    const handleValue = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    const handleChange = (e) => {
        setState({ ...state, [e.target.name]: e.target.value });
    };

    const handleAddContent = () => {
        let txt = "";

        switch (value) {
            case 0:
                txt = state.fb;
                break;
            case 1:
                txt = state.inst;
                break;
            case 2:
                const fullreg =
                    /(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([^& \n<]+)(?:[^ \n<]+)?/g;

                const regex =
                    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([^& \n<]+)(?:[^ \n<]+)?/g;

                const match = state.yt.match(fullreg);

                if (match?.length) {
                    for (let m of match) {
                        const ytId = m.split(regex)[1];

                        txt =
                            '<div class="yt-iframe-container"><iframe src="https://www.youtube.com/embed/' +
                            ytId +
                            '" frameborder="0" allowfullscreen></iframe><br/></div>';
                    }
                }

                break;
            case 3:
                txt = state.twt;
                break;
            default:
                break;
        }

        if (txt) {
            editor.execCommand(
                "mceInsertContent",
                false,
                `${txt}<p>&nbsp;</p>`
            );
            close();
        }
    };

    return (
        <Modal width="1000px" type="child" closeInfo={{ close, check: false }}>
            <Box>
                <Box>
                    <Tabs
                        value={value}
                        onChange={handleValue}
                        aria-label="simple tabs example"
                    >
                        <Tab
                            label={
                                <ImageOpt
                                    src="/facebook.png"
                                    location="local"
                                    width={30}
                                    height={30}
                                />
                            }
                            {...a11yProps(0)}
                        />
                        <Tab
                            label={
                                <ImageOpt
                                    src="/instagram.png"
                                    location="local"
                                    width={30}
                                    height={30}
                                />
                            }
                            {...a11yProps(1)}
                        />
                        <Tab
                            label={
                                <ImageOpt
                                    src="/youtube.png"
                                    location="local"
                                    width={30}
                                    height={30}
                                />
                            }
                            {...a11yProps(2)}
                        />
                        <Tab
                            label={
                                <ImageOpt
                                    src="/twitter.png"
                                    location="local"
                                    width={30}
                                    height={30}
                                />
                            }
                            {...a11yProps(3)}
                        />
                    </Tabs>
                </Box>
                <Box>
                    <TabPanel value={value} index={0}>
                        <TextField
                            onChange={handleChange}
                            name="fb"
                            value={state.fb}
                            label="التضمين"
                            multiline
                            rowsMax={5}
                            rows={5}
                            variant="outlined"
                            fullWidth
                        />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <TextField
                            onChange={handleChange}
                            name="inst"
                            value={state.inst}
                            label="التضمين"
                            multiline
                            rowsMax={5}
                            rows={5}
                            variant="outlined"
                            fullWidth
                        />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <TextField
                            onChange={handleChange}
                            name="yt"
                            value={state.yt}
                            label="الرابط"
                            multiline
                            rowsMax={5}
                            rows={5}
                            variant="outlined"
                            fullWidth
                        />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <TextField
                            onChange={handleChange}
                            name="twt"
                            value={state.twt}
                            label="الرابط"
                            multiline
                            rowsMax={5}
                            rows={5}
                            variant="outlined"
                            fullWidth
                        />
                    </TabPanel>
                </Box>
            </Box>
            <Box>
                <Button
                    onClick={handleAddContent}
                    fullWidth
                    variant="contained"
                    color="primary"
                >
                    متابعة
                </Button>
            </Box>
        </Modal>
    );
};

export default TextEditor;
