import { makeStyles, createStyles, Theme, Box } from "@material-ui/core";
import { cpmcPalette } from "../../data/theme";
import { IImage } from "../../types/image";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Error from "./error";
import ImageOpt from "../imageOpt";

// icons
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import ComputerIcon from "@material-ui/icons/Computer";

// install Swiper components
SwiperCore.use([Navigation, Pagination]);

interface IProps {
    text: string;
    name: string;
    errors?: any;
    handler: any;
    toForm?: any;
    type: "single" | "multiple";
    images: IImage[];
}

const ImageInput = ({
    text,
    errors,
    name,
    handler,
    type,
    images,
    toForm,
}: IProps) => {
    const classes = useStyles();

    return (
        <>
            <div>
                <Box mb={1}>
                    <p>{text}</p>
                </Box>
                <div className={"img-input-container"}>
                    <div className={`${classes.wrapper} img-input-wrapper`}>
                        {images.length ? (
                            type === "single" ? (
                                <div
                                    onClick={images.length ? handler : null}
                                    className={classes.imgContainer}
                                >
                                    <ImageOpt
                                        src={images[0]?.sizes?.m}
                                        layout="fill"
                                        objectFit="contain"
                                    />
                                </div>
                            ) : (
                                <Swiper
                                    autoHeight={true}
                                    slidesPerGroup={1}
                                    slidesPerView={1}
                                    className={classes.swiper}
                                    navigation
                                >
                                    {images.map((image) => (
                                        <SwiperSlide
                                            onClick={
                                                images.length ? handler : null
                                            }
                                            style={{
                                                width: "100%",
                                                height: "100%",
                                            }}
                                            key={image.image_id}
                                        >
                                            <div
                                                className={classes.imgContainer}
                                            >
                                                <ImageOpt
                                                    src={image?.sizes?.m}
                                                    layout="fill"
                                                    objectFit="contain"
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            )
                        ) : (
                            <Box className={classes.emptyContainer}>
                                <Box
                                    onClick={handler}
                                    className={classes.emptyItem}
                                >
                                    <Box mb={1}>
                                        <PhotoLibraryIcon
                                            className={classes.imageIcon}
                                        />
                                    </Box>
                                    <p className={classes.msg}>جميع الصور</p>
                                </Box>
                                {toForm && (
                                    <Box
                                        onClick={toForm}
                                        className={classes.emptyItem}
                                    >
                                        <Box mb={1}>
                                            <ComputerIcon
                                                className={classes.imageIcon}
                                            />
                                        </Box>
                                        <p className={classes.msg}>
                                            تحميل من الجهاز
                                        </p>
                                    </Box>
                                )}
                            </Box>
                        )}
                    </div>
                </div>
            </div>
            {errors && <Error errors={errors[name]} />}
        </>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: "relative",
            width: "100%",
            "&::after": {
                content: '"',
                display: "block",
                paddingBottom: "30%",
            },
        },
        wrapper: {
            border: `1px dashed ${cpmcPalette.purple.main}`,
            cursor: "pointer",
        },
        msg: {
            fontSize: 20,
            fontWeight: 300,
            color: cpmcPalette.purple.main,
        },
        emptyContainer: {
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            height: "100%",
            width: "100%",
        },
        emptyItem: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            "&:hover": {
                backgroundColor: "rgb(245, 245, 245)",
            },
        },
        swiper: {
            width: "100%",
            height: "100%",
        },
        imgContainer: {
            position: "relative",
            width: "100%",
            height: "100%",
        },
        imageIcon: {
            width: "70px",
            height: "70px",
            color: cpmcPalette.purple.main,
        },
    })
);

export default ImageInput;
