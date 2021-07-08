import { makeStyles, createStyles, Theme, Box } from "@material-ui/core";
import { cpmcPalette } from "../../data/theme";
import { IImage } from "../../types/image";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import Error from "./error";
import ImageOpt from "../imageOpt";

// icons
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";

// install Swiper components
SwiperCore.use([Navigation, Pagination]);

interface IProps {
    text: string;
    name: string;
    errors?: any;
    handler: any;
    type: "single" | "multiple";
    images: IImage[];
}

const ImageInput = ({ text, errors, name, handler, type, images }: IProps) => {
    const classes = useStyles();

    return (
        <>
            <div className={classes.root} onClick={handler}>
                {images.length ? (
                    type === "single" ? (
                        <div className={classes.imgContainer}>
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
                        >
                            {images.map((image) => (
                                <SwiperSlide key={image.image_id}>
                                    <div className={classes.imgContainer}>
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
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Box mb={1}>
                            <PhotoLibraryIcon className={classes.imageIcon} />
                        </Box>
                        <p className={classes.msg}>{text}</p>
                    </Box>
                )}
            </div>
            {errors && <Error errors={errors[name]} />}
        </>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            border: `1px dashed ${cpmcPalette.purple.main}`,
            cursor: "pointer",
            height: "250px",
            width: "500px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
        msg: {
            fontSize: 20,
            fontWeight: 300,
            color: cpmcPalette.purple.main,
        },
        swiper: {
            width: "500px",
            height: "250px",
        },
        imgContainer: {
            width: "500px",
            height: "250px",
            position: "relative",
        },
        imageIcon: {
            width: "40px",
            height: "40px",
            color: cpmcPalette.purple.main,
        },
    })
);

export default ImageInput;
