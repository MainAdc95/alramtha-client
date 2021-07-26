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
    TextField,
    Theme,
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { useState, useEffect } from "react";
import useSWR from "swr";
import ImageOpt from "../../imageOpt";
import { IImage } from "../../../types/image";

// components
import Modal from "../modal";
import ImageForm from "./imageForm";

// icons
import SortIcon from "@material-ui/icons/Sort";
import SearchIcon from "@material-ui/icons/Search";

type Sort = "الأحدث" | "الأقدم";

const sortOptions: Sort[] = ["الأحدث", "الأقدم"];

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
    openForm?: boolean;
}

const ImagePicker = ({
    close,
    state,
    setState,
    type,
    fieldName,
    lockScroll,
    openForm,
}: IProps) => {
    const classes = useStyles();
    const [isImage, setImage] = useState(false);
    const [images, setImages] = useState<IImage[]>([]);
    const [active, setActive] = useState(0);
    const [loading, setLoading] = useState(true);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const rowsPerPage = 42;
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({
        search: "",
        order: "الأحدث",
    });
    const { data, error } = useSWR<{
        results: number;
        images: IImage[];
    }>(
        `/images?p=${page}&r=${rowsPerPage}&search=${filters.search}&date=${
            filters.order === "الأحدث" ? "desc" : "asc"
        }`
    );

    const handleFilter = (k, v) => {
        setFilters({
            ...filters,
            [k]: v,
        });
    };

    useEffect(() => {
        if (data) {
            setCount(Math.ceil(data.results / rowsPerPage));
        }
    }, [data]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    useEffect(() => {
        if (type === "single") {
            if (state[fieldName]) setImages([...images, state[fieldName]]);
        } else if (type === "multiple") {
            setImages([...images, ...state[fieldName]]);
        }

        if (openForm) {
            setImage(true);
        }
    }, []);

    useEffect(() => {
        if (data || error) setLoading(false);
    }, [data, error]);

    const handleSelect = (image: IImage) => {
        const imageIds = images.map((i) => i.image_id);

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

    const handleSave = (imgs?: any) => {
        const i = imgs || images;

        if (type === "single") {
            setState({ ...state, [fieldName]: i[0] || "" });
        } else if (type === "multiple") {
            setState({ ...state, [fieldName]: i });
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

    const handleClickListItem = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLElement>,
        v: Sort
    ) => {
        handleFilter("order", v);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    // _______________________________ select multiple
    const selectMultiple = (images: IImage[]) => {
        images.forEach((img) => handleSelect(img));
        handleSave(images);
    };

    // __________________________ search
    const handleSearch = (e) => {
        setSearch(e.target.value);
    };

    const searchCall = () => {
        handleFilter("search", search);
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
                        style={{ whiteSpace: "nowrap" }}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        className={classes.head}
                        mb={3}
                    >
                        <Typography variant="h6">
                            الرجاء اختيار صورة واحدة على الأقل
                        </Typography>
                        <Box ml={5} mr={5} display="flex" width="100%">
                            <Box
                                onClick={searchCall}
                                style={{
                                    minHeight: "100%",
                                    width: "50px",
                                    background: "rgb(2, 135, 254)",
                                    borderRadius: "0 5px 5px 0",
                                    cursor: "pointer",
                                }}
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <SearchIcon style={{ color: "white" }} />
                            </Box>
                            <TextField
                                onKeyDown={(e: any) => {
                                    if (e.keyCode === 13) {
                                        searchCall();
                                    }
                                }}
                                value={search}
                                label="الحث..."
                                name="search"
                                onChange={handleSearch}
                                fullWidth
                                variant="outlined"
                            />
                        </Box>
                        <Box display="flex">
                            <div>
                                <Box mr={2}>
                                    <Button
                                        startIcon={<SortIcon />}
                                        variant="outlined"
                                        onClick={handleClickListItem}
                                    >
                                        {filters.order}
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
                                            selected={sort === filters.order}
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
                                    onClick={() => handleSave()}
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
                        <Tab label="جميع الصور" {...a11yProps(0)} />
                        <Tab label="الصور مختارة" {...a11yProps(1)} />
                    </Tabs>
                    <Divider />

                    <>
                        <TabPanel value={active} index={0}>
                            <Box display="flex" mb={4}>
                                <Pagination
                                    color="secondary"
                                    onChange={handleChangePage}
                                    page={page}
                                    count={count}
                                />
                            </Box>
                            {!data ? (
                                <div className={classes.loadingContainer}>
                                    <CircularProgress color="primary" />
                                </div>
                            ) : !data.images.length ? (
                                <p>لم يتم العثور على اي صور.</p>
                            ) : (
                                <div
                                    style={{ marginTop: "20px" }}
                                    className={classes.imagesWrapper}
                                >
                                    {data.images &&
                                        data.images.map((img) => (
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
                                                            handleSelect(img)
                                                        }
                                                    />
                                                </div>
                                                <ImageOpt
                                                    src={img?.sizes?.s}
                                                    alt={img?.sizes?.s}
                                                    layout="fill"
                                                    objectFit="contain"
                                                />
                                            </div>
                                        ))}
                                </div>
                            )}
                            <Box display="flex" mt={4}>
                                <Pagination
                                    color="secondary"
                                    onChange={handleChangePage}
                                    page={page}
                                    count={count}
                                />
                            </Box>
                        </TabPanel>
                        <TabPanel value={active} index={1}>
                            <div
                                style={{ marginTop: "20px" }}
                                className={classes.imagesWrapper}
                            >
                                {images.map((img) => (
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
                                            src={img?.sizes?.m}
                                            alt={img?.sizes?.m}
                                            layout="fill"
                                            objectFit="contain"
                                        />
                                    </div>
                                ))}
                            </div>
                        </TabPanel>
                    </>
                </Box>
            </Modal>
            {isImage && (
                <ImageForm
                    selectMultiple={selectMultiple}
                    close={closeImageForm}
                />
            )}
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
        loadingContainer: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        },
    })
);

export default ImagePicker;
