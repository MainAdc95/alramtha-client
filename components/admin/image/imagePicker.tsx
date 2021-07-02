import {
    Divider,
    Typography,
    Box,
    CircularProgress,
    Checkbox,
    Button,
    Tabs,
    Tab,
    createStyles,
    makeStyles,
    Menu,
    MenuItem,
    Theme,
} from "@material-ui/core";
import { useState, useEffect } from "react";
import useSWR from "swr";
import ImageOpt from "../../imageOpt";

// components
import Modal from "../modal";
import ImageForm from "./imageForm";

// icons
import SortIcon from "@material-ui/icons/Sort";
import { IImage } from "../../../types/image";

type Sort = "Latest" | "Oldest";

const sortOptions: Sort[] = ["Latest", "Oldest"];

function a11yProps(index: any) {
    return {
        id: `full-width-tab-${index}`,
        "aria-controls": `full-width-tabpanel-${index}`,
    };
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

const TabPanel = (props: TabPanelProps) => {
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
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
};

interface IProps {
    close: Function;
    type: "single" | "multiple";
    fieldName: string;
    state: any;
    setState: any;
    lockScroll?: "parent" | "child";
}

const ImagePicker = ({
    close,
    state,
    setState,
    type,
    fieldName,
    lockScroll,
}: IProps) => {
    const classes = useStyles();
    const [isImage, setImage] = useState(false);
    const [images, setImages] = useState<IImage[]>([]);
    const [active, setActive] = useState(0);
    const [loading, setLoading] = useState(true);
    const { data, error } = useSWR("/images");
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedSort, setSelectedSort] = useState<Sort | null>("Latest");

    useEffect(() => {
        if (type === "single") {
            setImages([...images, state[fieldName]]);
        } else if (type === "multiple") {
            setImages([...images, ...state[fieldName]]);
        }
    }, []);

    useEffect(() => {
        if (data || error) setLoading(false);
    }, [data, error]);

    const handleSelect = (image: IImage) => {
        const imageIds = images.map((i) => i.image_id);
        console.log(imageIds, image.image_id);
        if (type === "single") {
            if (imageIds.includes(image.image_id)) {
                setImages([]);
            } else {
                setImages([image]);
            }
        } else if (type === "multiple") {
            if (imageIds.includes(image.image_id)) {
                setImages(images.filter((i) => i.image_id !== image.image_id));
            } else {
                setImages([...images, image]);
            }
        }
    };

    const handleSave = () => {
        if (type === "single") {
            setState({ ...state, [fieldName]: images[0] || "" });
        } else if (type === "multiple") {
            setState({ ...state, [fieldName]: images });
        }

        close();
    };

    const closeImageForm = () => {
        setImage(false);
    };

    const openImageForm = () => {
        setImage(true);
    };

    const handleChange = (e: React.ChangeEvent<{}>, newValue: number) => {
        setActive(newValue);
    };

    const getSelectedImages = () => {
        return data?.filter((img) =>
            images.map((i) => i.image_id).includes(img.image_id)
        );
    };

    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLElement>,
        value: Sort
    ) => {
        setSelectedSort(value);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSort = (a: any, b: any) => {
        if (selectedSort === "Latest") {
            return (
                new Date(b.created_at).valueOf() -
                new Date(a.created_at).valueOf()
            );
        } else if (selectedSort === "Oldest") {
            return (
                new Date(a.created_at).valueOf() -
                new Date(b.created_at).valueOf()
            );
        }
    };

    return (
        <>
            <Modal
                type={lockScroll || "child"}
                closeInfo={{
                    close,
                    check: true,
                }}
                width="1300px"
            >
                <Box position="relative">
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        className={classes.head}
                        mb={3}
                    >
                        <Typography variant="h6">
                            الرجاء اختيار صورة واحدة على الأقل
                        </Typography>
                        <Box display="flex">
                            <div>
                                <Box mr={2}>
                                    <Button
                                        startIcon={<SortIcon />}
                                        variant="outlined"
                                        onClick={handleClickListItem}
                                    >
                                        {selectedSort}
                                    </Button>
                                </Box>
                                <Menu
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    anchorOrigin={{
                                        vertical: "bottom",
                                        horizontal: "center",
                                    }}
                                    transformOrigin={{
                                        vertical: "bottom",
                                        horizontal: "center",
                                    }}
                                    onClose={handleClose}
                                >
                                    {sortOptions.map((sort) => (
                                        <MenuItem
                                            key={sort}
                                            selected={sort === selectedSort}
                                            onClick={(event) =>
                                                handleMenuItemClick(event, sort)
                                            }
                                        >
                                            {sort}
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </div>
                            <Box mr={2}>
                                <Button
                                    onClick={handleSave}
                                    variant="contained"
                                    style={{
                                        backgroundColor: "#ec008c",
                                        color: "white",
                                    }}
                                >
                                    حفظ التغييرات
                                </Button>
                            </Box>
                            <Button
                                style={{
                                    backgroundColor: "#00529b",
                                    color: "white",
                                }}
                                onClick={openImageForm}
                                variant="contained"
                            >
                                أضافة الصورة
                            </Button>
                        </Box>
                    </Box>
                    <Tabs
                        value={active}
                        onChange={handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="All images" {...a11yProps(0)} />
                        <Tab label="Selected images" {...a11yProps(1)} />
                    </Tabs>
                    <Divider />
                    {loading ? (
                        <Box display="flex" mt={2} justifyContent="center">
                            <CircularProgress color="secondary" />
                        </Box>
                    ) : (
                        <>
                            <TabPanel value={active} index={0}>
                                <div
                                    style={{ marginTop: "20px" }}
                                    className={classes.imagesWrapper}
                                >
                                    {data &&
                                        data
                                            .sort((a, b) => handleSort(a, b))
                                            .map((img) => (
                                                <div
                                                    className={
                                                        classes.imageContainer
                                                    }
                                                    style={{
                                                        position: "relative",
                                                        height: "200px",
                                                    }}
                                                >
                                                    <div
                                                        className={
                                                            classes.checkboxContainer
                                                        }
                                                    >
                                                        <Checkbox
                                                            checked={images
                                                                .map(
                                                                    (i) =>
                                                                        i.image_id
                                                                )
                                                                .includes(
                                                                    img.image_id
                                                                )}
                                                            onChange={() =>
                                                                handleSelect(
                                                                    img
                                                                )
                                                            }
                                                        />
                                                    </div>
                                                    <ImageOpt
                                                        src={img.image_name}
                                                        alt={img.image_name}
                                                        layout="fill"
                                                        objectFit="contain"
                                                    />
                                                </div>
                                            ))}
                                </div>
                            </TabPanel>
                            <TabPanel value={active} index={1}>
                                <div
                                    style={{ marginTop: "20px" }}
                                    className={classes.imagesWrapper}
                                >
                                    {getSelectedImages()?.map((img) => (
                                        <div
                                            className={classes.imageContainer}
                                            style={{
                                                position: "relative",
                                                height: "200px",
                                            }}
                                        >
                                            <div
                                                className={
                                                    classes.checkboxContainer
                                                }
                                            >
                                                <Checkbox
                                                    checked={images
                                                        .map((i) => i.image_id)
                                                        .includes(img.image_id)}
                                                    onChange={() =>
                                                        handleSelect(img)
                                                    }
                                                />
                                            </div>
                                            <ImageOpt
                                                src={img.image_name}
                                                alt={img.image_name}
                                                layout="fill"
                                                objectFit="contain"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </TabPanel>
                        </>
                    )}
                </Box>
            </Modal>
            {isImage && <ImageForm close={closeImageForm} />}
        </>
    );
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        head: {
            backgroundColor: "white",
            padding: "10px 0",
            position: "sticky",
            zIndex: 3,
            top: 0,
        },
        imagesWrapper: {
            display: "grid",
            gridTemplateColumns: "repeat(6, 1fr)",
            gridGap: theme.spacing(2),
        },
        imageContainer: {
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgb(238, 238, 238)",
        },
        checkboxContainer: {
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
            width: "100%",
            height: "30px",
            display: "flex",
            alignItems: "center",
            boxShadow: theme.shadows[5],
            backgroundColor: "white",
        },
    })
);

export default ImagePicker;
