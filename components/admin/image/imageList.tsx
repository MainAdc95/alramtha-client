import { makeStyles } from "@material-ui/core/styles";
import { Box, Divider, CircularProgress } from "@material-ui/core";
import { useState, useEffect } from "react";
import { Pagination } from "@material-ui/lab";
import { IImage } from "../../../types/image";
import { mutate } from "swr";
import { apiCall } from "../../../utils/apiCall";
import { useSelector } from "react-redux";
import { RootReducer } from "../../../store/reducers";

// components
import useSWR from "swr";
import ImageItem from "./imageItem";
import ActionModal from "../actionModal";

const useStyles = makeStyles({
    root: {
        width: "100%",
    },
    imageList: {
        display: "grid",
        gridTemplateColumns: "repeat(6, 1fr)",
        gridGap: "10px",
    },
    loadingContainer: {
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
});

interface IProps {
    filters: any;
    setMutateUrl?: any;
}

const ImageList = ({ filters, setMutateUrl }: IProps) => {
    const classes = useStyles();
    const user = useSelector((state: RootReducer) => state.auth.user);
    const [isDel, setDel] = useState<null | IImage>(null);
    const [delErr, setDelErr] = useState("");
    const [delLoading, setDelLoading] = useState(false);
    const rowsPerPage = 42;
    const [page, setPage] = useState(1);
    const [count, setCount] = useState(0);
    const { data, error } = useSWR<{
        results: number;
        images: IImage[];
    }>(
        `/images?p=${page}&r=${rowsPerPage}&search=${filters.search}&date=${
            filters.order === "الأحدث" ? "desc" : "asc"
        }`
    );

    useEffect(() => {
        setMutateUrl(
            `/images?p=${page}&r=${rowsPerPage}&search=${filters.search}&date=${
                filters.order === "الأحدث" ? "desc" : "asc"
            }`
        );

        if (data) {
            setCount(Math.ceil(data.results / rowsPerPage));
        }
    }, [data]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleOpenDel = (product: IImage) => {
        setDel(product);
    };

    const handleCloseDel = () => {
        setDel(null);
        setDelErr("");
    };

    const handleDelete = async () => {
        try {
            setDelLoading(true);
            await apiCall(
                "delete",
                `/image/${isDel.image_id}?authId=${user.user_id}`
            );

            mutate(
                `/images?p=${page}&r=${rowsPerPage}&search=${
                    filters.search
                }&date=${filters.order === "الأحدث" ? "desc" : "asc"}`
            );

            setDelLoading(false);
            handleCloseDel();
        } catch (err) {
            setDelErr(err);
            setDelLoading(false);
        }
    };

    return (
        <>
            <div className={classes.root}>
                <Box display="flex" mb={4}>
                    <Pagination
                        color="secondary"
                        onChange={handleChangePage}
                        page={page}
                        count={count}
                    />
                </Box>
                {error ? (
                    <p>حدث خطأ أثناء تحميل الصور.</p>
                ) : !data ? (
                    <div className={classes.loadingContainer}>
                        <CircularProgress color="primary" />
                    </div>
                ) : !data.images.length ? (
                    <p>لم يتم العثور على اي صور.</p>
                ) : (
                    <div className={classes.imageList}>
                        {data.images.map((image) => (
                            <ImageItem
                                handleOpenDel={handleOpenDel}
                                key={image.image_id}
                                image={image}
                            />
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
            </div>
            {isDel && (
                <ActionModal
                    close={handleCloseDel}
                    title="حذف صورة"
                    msg={`هل انت متأكد انك تريد حذف الصورة`}
                    handler={handleDelete}
                    error={delErr ? [delErr] : []}
                    loading={delLoading}
                />
            )}
        </>
    );
};

export default ImageList;
