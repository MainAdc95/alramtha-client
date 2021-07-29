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
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

// components
import WithRole from "../../../protectors/withRole";
import Layout from "../../../components/admin/layout";
import Button from "../../../components/form/button";
import HeadLayout from "../../../components/headLayout";
import ArticleList from "../../../components/admin/article/articleList";

// icons
import AddIcon from "@material-ui/icons/Add";
import SortIcon from "@material-ui/icons/Sort";
import SearchIcon from "@material-ui/icons/Search";

interface IFilter {
    search: string;
    order: string;
}

const order = ["الأحدث", "الأقدم"];

const Articles = () => {
    const [query, setQuery] = useState("");
    const router = useRouter();
    const locale = useSelector((state: RootReducer) => state.locale);
    const classes = useStyles({ locale });
    const [search, setSearch] = useState("");
    const [anchorElOrder, setAnchorElOrder] =
        useState<null | HTMLElement>(null);
    const [filters, setFilters] = useState<IFilter>({
        search: "",
        order: "الأحدث",
    });

    useEffect(() => {
        setQuery(`?order=${filters.order}&search=${filters.search}`);
    }, [filters]);

    useEffect(() => {
        const query: any = router.query;

        setFilters({
            ...filters,
            search: query.search || "",
            order: query.order || "الأحدث",
        });
        setSearch(query.search || "");
    }, []);

    const checkNewValue = (name, k, v) => {
        if (name === k) return v;
        else return filters[name];
    };

    const handleFilter = (k, v) => {
        router.push(
            `?order=${checkNewValue("order", k, v)}&search=${checkNewValue(
                "search",
                k,
                v
            )}`,
            null,
            { shallow: true }
        );

        setFilters({
            ...filters,
            [k]: v,
        });
    };

    // _________________________________ order
    const handleOrderItemClick = (
        event: React.MouseEvent<HTMLElement>,
        v: string
    ) => {
        setAnchorElOrder(null);
        handleFilter("order", v);
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
            <HeadLayout title="Admin article" />
            <WithRole role="is_writer">
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
                                <h1 className={classes.title}>
                                    أرشيف المقالات
                                </h1>
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
                                </Box>
                            </Box>
                            <Link href={"/admin/articles/articleForm" + query}>
                                <a className="ltr">
                                    <Button
                                        startIcon={<AddIcon />}
                                        text="أضافة مقالة"
                                    />
                                </a>
                            </Link>
                        </Box>
                    </div>
                    <div className={classes.body}>
                        <ArticleList filters={filters} query={query} />
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
export default Articles;
