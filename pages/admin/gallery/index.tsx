import {
    createStyles,
    makeStyles,
    Theme,
    Box,
    Button as MuButton,
    Menu,
    MenuItem,
    TextField,
} from "@material-ui/core";
import { useSelector } from "react-redux";
import { RootReducer } from "../../../store/reducers";
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
import SearchIcon from "@material-ui/icons/Search";

type Sort = "الأحدث" | "الأقدم";

const sortOptions: Sort[] = ["الأحدث", "الأقدم"];

const Gallery = () => {
    const locale = useSelector((state: RootReducer) => state.locale);
    const classes = useStyles({ locale });
    const [search, setSearch] = useState("");
    const [filters, setFilters] = useState({
        search: "",
        order: "الأحدث",
    });
    const [isAdd, setAdd] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleFilter = (k, v) => {
        setFilters({
            ...filters,
            [k]: v,
        });
    };

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
        v: Sort
    ) => {
        handleFilter("order", v);
        setAnchorEl(null);
    };

    const handleClose = () => {
        setAnchorEl(null);
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
            <HeadLayout title="Admin image" />
            <WithRole role="is_editor">
                <Layout>
                    <div className={classes.head}>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            width="100%"
                        >
                            <div style={{ whiteSpace: "nowrap" }}>
                                <h1 className={classes.title}>معرض الصور</h1>
                            </div>
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
                                    value={search}
                                    label="الحث..."
                                    name="search"
                                    onChange={handleSearch}
                                    fullWidth
                                    variant="outlined"
                                    onKeyDown={(e: any) => {
                                        if (e.keyCode === 13) {
                                            searchCall();
                                        }
                                    }}
                                />
                            </Box>
                            <Box
                                style={{ whiteSpace: "nowrap" }}
                                display="flex"
                                alignItems="center"
                            >
                                <Box mr={2}>
                                    <MuButton
                                        startIcon={<SortIcon />}
                                        variant="outlined"
                                        onClick={handleClickListItem}
                                    >
                                        {filters.order}
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
                                            selected={sort === filters.order}
                                            onClick={(e) =>
                                                handleMenuItemClick(e, sort)
                                            }
                                        >
                                            {sort}
                                        </MenuItem>
                                    ))}
                                </Menu>
                                <a className="ltr">
                                    <Button
                                        startIcon={<AddIcon />}
                                        onClick={openAdd}
                                        text="أضافة صورة"
                                    />
                                </a>
                            </Box>
                        </Box>
                    </div>
                    <div className={classes.body}>
                        <ImageList filters={filters} />
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
