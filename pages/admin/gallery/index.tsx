import {
    createStyles,
    makeStyles,
    Theme,
    Box,
    Button as MuButton,
    Menu,
    MenuItem,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootReducer } from "../../../store/reducers";
import { IImage } from "../../../types/image";
import useSWR from "swr";
import { useState } from "react";

// components
import WithRole from "../../../protectors/withRole";
import Layout from "../../../components/admin/layout";
import HeadLayout from "../../../components/headLayout";
import ImageList from "../../../components/admin/image/imageList";
import Button from "../../../components/form/button";
import ImageForm from "../../../components/admin/image/imageForm";

// icons
import AddIcon from "@material-ui/icons/Add";
import SortIcon from "@material-ui/icons/Sort";

type Sort = "Latest" | "Oldest";

const sortOptions: Sort[] = ["Latest", "Oldest"];

const Gallery = () => {
    const locale = useSelector((state: RootReducer) => state.locale);
    const classes = useStyles({ locale });
    const { data: images, error, isValidating } = useSWR<IImage[]>(`/images`);
    const [selectedSort, setSelectedSort] = useState<Sort | null>("Latest");
    const [isAdd, setAdd] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const closeAdd = () => {
        setAdd(false);
    };

    const openAdd = () => {
        setAdd(true);
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

    return (
        <>
            <HeadLayout title="Admin image" />
            <WithRole role="is_admin">
                <Layout>
                    <div className={classes.head}>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            width="100%"
                        >
                            <div>
                                <h1 className={classes.title}>Gallery</h1>
                            </div>
                            <Box display="flex" alignItems="center">
                                <Box mr={2}>
                                    <MuButton
                                        startIcon={<SortIcon />}
                                        variant="outlined"
                                        onClick={handleClickListItem}
                                    >
                                        {selectedSort}
                                    </MuButton>
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
                                {/* <Button
                                    startIcon={<Add />}
                                    variant="contained"
                                    type="button"
                                    onClick={openAdd}
                                    color="primary"
                                >
                                    add images
                                </Button> */}
                                <Button
                                    startIcon={<AddIcon />}
                                    onClick={openAdd}
                                    text="add images"
                                />
                            </Box>
                        </Box>
                    </div>
                    <div className={classes.body}>
                        {error ? (
                            <p>
                                An error has occured while fetching image
                                gallery.
                            </p>
                        ) : !images ? (
                            <p>Loading...</p>
                        ) : !images.length ? (
                            <p>There is no images added yet.</p>
                        ) : (
                            <ImageList
                                images={images}
                                sortOption={selectedSort}
                                loading={isValidating}
                            />
                        )}
                    </div>
                    {isAdd && <ImageForm close={closeAdd} />}
                </Layout>
            </WithRole>
        </>
    );
};

const useStyles = makeStyles((theme: Theme) => {
    return createStyles({
        head: {
            width: "100%",
            padding: theme.spacing(2, 0),
            marginBottom: theme.spacing(2),
            display: "flex",
            alignItems: "center",
        },
        title: {
            fontWeight: 300,
        },
        body: {
            width: "100%",
            maxWidth: "100%",
        },
    });
});
export default Gallery;
