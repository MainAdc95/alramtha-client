import { Editor } from "@tinymce/tinymce-react";
import { useState } from "react";
import { Box } from "@material-ui/core";
import Error from "./error";

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

    // __________________________ event handlers

    // text
    const handleEditorChange = (e: any): void => {
        setState({ ...state, [name]: e });
    };

    return (
        <div>
            <Box mb={2}>
                <label htmlFor={id}>{label}</label>
            </Box>
            <Editor
                value={editorIsInitialized ? state[name] : " "}
                id={id}
                onInit={() => {
                    if (!editorIsInitialized) {
                        setEditorIsInitialized(true);
                    }
                }}
                apiKey="p2f3wrzpsomvt0lvr2uphccyzhlnxzopddrmptrb4addcxon"
                init={{
                    height: 400,
                    language: "ar",
                    min_height: 200,
                    branding: false,
                    menubar: true,
                    plugins:
                        "fullscreen link media preview print charmap emoticons",
                    directionality: direction || "ltr",
                    toolbar:
                        "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor casechange formatpainter removeformat | pagebreak | charmap emoticons | fullscreen preview save print | media pageembed template link anchor codesample | a11ycheck ltr rtl",
                }}
                onEditorChange={(e) => handleEditorChange(e)}
            />
            {errors && <Error errors={errors[name]} />}
        </div>
    );
};

export default TextEditor;
