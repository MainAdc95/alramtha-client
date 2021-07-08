import { Box } from "@material-ui/core";
import { useState, useCallback, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";
import Modal from "../admin/modal";
import Button from "../form/button";

// style sheet
import styles from "../../styles/ImageEditor.module.scss";
import ImageOpt from "../imageOpt";

const getImgBase64 = (canvas, crop) => {
    if (!crop || !canvas) {
        return;
    }

    return canvas.toDataURL();
};

const cropOptions = { unit: "%", width: 30, aspect: 16 / 9 };

const ImageEditor = ({ close, img, changeImg }) => {
    const [upImg, setUpImg] = useState();
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [crop, setCrop] = useState(cropOptions);
    const [completedCrop, setCompletedCrop] = useState(null);

    useEffect(() => {
        setUpImg(img);
    }, []);

    const onLoad = useCallback((img) => {
        imgRef.current = img;
    }, []);

    useEffect(() => {
        if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
            return;
        }

        const image = imgRef.current;
        const canvas = previewCanvasRef.current;
        const crop = completedCrop;

        const scaleX = image.naturalWidth / image.width;
        const scaleY = image.naturalHeight / image.height;
        const ctx = canvas.getContext("2d");
        const pixelRatio = window.devicePixelRatio;

        canvas.width = crop.width * pixelRatio;
        canvas.height = crop.height * pixelRatio;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
        ctx.imageSmoothingQuality = "high";

        ctx.drawImage(
            image,
            crop.x * scaleX,
            crop.y * scaleY,
            crop.width * scaleX,
            crop.height * scaleY,
            0,
            0,
            crop.width,
            crop.height
        );
    }, [completedCrop]);

    const handleSave = () => {
        changeImg(getImgBase64(previewCanvasRef.current, completedCrop));
        close();
    };

    // _____________________________ aspect
    const changeAspect = (type: number) => {
        switch (type) {
            case 1:
                return setCrop({ ...cropOptions, aspect: 1 / 1 });
            case 2:
                return setCrop({ ...cropOptions, aspect: 16 / 9 });
            default:
                return;
        }
    };

    return (
        <Modal type="child" width="1000px" closeInfo={{ close, check: true }}>
            <div className="App">
                <ReactCrop
                    src={upImg}
                    onImageLoaded={onLoad}
                    crop={crop}
                    onChange={(c) => setCrop(c)}
                    onComplete={(c) => setCompletedCrop(c)}
                />
                <div className={styles.proportionsContainer}>
                    <div
                        onClick={() => changeAspect(1)}
                        className={`${styles.proportionsItem} ${styles.prop1}`}
                    >
                        <p>1:1</p>
                    </div>
                    <div
                        onClick={() => changeAspect(2)}
                        className={`${styles.proportionsItem} ${styles.prop16}`}
                    >
                        <p>16:9</p>
                    </div>
                </div>
                <div>
                    <canvas
                        ref={previewCanvasRef}
                        style={{
                            width: Math.round(completedCrop?.width ?? 0),
                            height: Math.round(completedCrop?.height ?? 0),
                        }}
                    />
                </div>
                <Box mt={2}>
                    <Button fullWidth text="حفظ" onClick={handleSave} />
                </Box>
            </div>
        </Modal>
    );
};

export default ImageEditor;
