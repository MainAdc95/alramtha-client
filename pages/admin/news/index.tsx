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
import Link from "next/link";

// components
import WithRole from "../../../protectors/withRole";
import Layout from "../../../components/admin/layout";
import Button from "../../../components/form/button";
import HeadLayout from "../../../components/headLayout";
import NewsList from "../../../components/admin/news/newsList";
import { ISection } from "../../../types/section";

// icons
import AddIcon from "@material-ui/icons/Add";
import SortIcon from "@material-ui/icons/Sort";
import SearchIcon from "@material-ui/icons/Search";
import useSWR from "swr";

interface IFilter {
    search: string;
    order: string;
    section: string | ISection;
}

const order = ["الأحدث", "الأقدم"];

const News = () => {
    const locale = useSelector((state: RootReducer) => state.locale);
    const { data: sections } = useSWR<ISection[]>("/sections");
    const classes = useStyles({ locale });
    const [search, setSearch] = useState("");
    const [anchorElSec, setAnchorElSec] = useState<null | HTMLElement>(null);
    const [anchorElOrder, setAnchorElOrder] =
        useState<null | HTMLElement>(null);
    const [filters, setFilters] = useState<IFilter>({
        search: "",
        order: "الأحدث",
        section: "",
    });

    const handleFilter = (k, v) => {
        setFilters({
            ...filters,
            [k]: v,
        });
    };

    // _________________________________ section
    const handleSecItemClick = (
        event: React.MouseEvent<HTMLElement>,
        v: ISection | ""
    ) => {
        handleFilter("section", v);
        setAnchorElSec(null);
    };

    const handleSecListClick = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorElSec(e.currentTarget);
    };

    const handleCloseSec = () => {
        setAnchorElSec(null);
    };

    // _________________________________ order
    const handleOrderItemClick = (
        event: React.MouseEvent<HTMLElement>,
        v: string
    ) => {
        handleFilter("order", v);
        setAnchorElOrder(null);
    };

    const handleOrderListClick = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorElOrder(e.currentTarget);
    };

    const handleCloseOrder = () => {
        setAnchorElOrder(null);
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
            <HeadLayout title="Admin news" />
            <WithRole role="is_editor">
                <Layout>
                    <div className={classes.head}>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            width="100%"
                            style={{ whiteSpace: "nowrap" }}
                        >
                            <div>
                                <h1 className={classes.title}>أرشيف الأخبار</h1>
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
                                    size="small"
                                    fullWidth
                                    variant="outlined"
                                    onKeyDown={(e: any) => {
                                        if (e.keyCode === 13) {
                                            searchCall();
                                        }
                                    }}
                                />
                            </Box>
                            <Box display="flex">
                                <Box display="flex">
                                    <div>
                                        <Box mr={2}>
                                            <MuButton
                                                startIcon={<SortIcon />}
                                                variant="outlined"
                                                onClick={handleOrderListClick}
                                            >
                                                {filters.order}
                                            </MuButton>
                                        </Box>
                                        <Menu
                                            anchorEl={anchorElOrder}
                                            keepMounted
                                            open={Boolean(anchorElOrder)}
                                            anchorOrigin={{
                                                vertical: "bottom",
                                                horizontal: "center",
                                            }}
                                            transformOrigin={{
                                                vertical: "bottom",
                                                horizontal: "center",
                                            }}
                                            onClose={handleCloseOrder}
                                        >
                                            {order.map((order) => (
                                                <MenuItem
                                                    key={order}
                                                    selected={
                                                        order === filters.order
                                                    }
                                                    onClick={(e) =>
                                                        handleOrderItemClick(
                                                            e,
                                                            order
                                                        )
                                                    }
                                                >
                                                    {order}
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </div>
                                    <div>
                                        <Box mr={2}>
                                            <MuButton
                                                startIcon={<SortIcon />}
                                                variant="outlined"
                                                onClick={handleSecListClick}
                                            >
                                                {typeof filters.section !==
                                                "string"
                                                    ? filters.section
                                                          .section_name
                                                    : "جميع الأقسام"}
                                            </MuButton>
                                        </Box>
                                        <Menu
                                            anchorEl={anchorElSec}
                                            keepMounted
                                            open={Boolean(anchorElSec)}
                                            anchorOrigin={{
                                                vertical: "bottom",
                                                horizontal: "center",
                                            }}
                                            transformOrigin={{
                                                vertical: "bottom",
                                                horizontal: "center",
                                            }}
                                            onClose={handleCloseSec}
                                        >
                                            <MenuItem
                                                selected={!filters.section}
                                                onClick={(e) =>
                                                    handleSecItemClick(e, "")
                                                }
                                            >
                                                جميع الأقسام
                                            </MenuItem>
                                            {sections?.map((section) => (
                                                <MenuItem
                                                    key={section.section_id}
                                                    selected={
                                                        section.section_name ===
                                                        filters.section
                                                    }
                                                    onClick={(e) =>
                                                        handleSecItemClick(
                                                            e,
                                                            section
                                                        )
                                                    }
                                                >
                                                    {section.section_name}
                                                </MenuItem>
                                            ))}
                                        </Menu>
                                    </div>
                                </Box>
                                <Link href="/admin/news/addNews">
                                    <a className="ltr">
                                        <Button
                                            startIcon={<AddIcon />}
                                            text="أضافة خبر"
                                        />
                                    </a>
                                </Link>
                            </Box>
                        </Box>
                    </div>
                    <div className={classes.body}>
                        <NewsList filters={filters} />
                    </div>
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
export default News;
