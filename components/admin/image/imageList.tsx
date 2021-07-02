import useSWR from "swr";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, Box, Divider } from "@material-ui/core";
import { useState } from "react";
import { Pagination } from "@material-ui/lab";
import { IImage } from "../../../types/image";
import { mutate } from "swr";
import { apiCall } from "../../../utils/apiCall";
import { useSelector } from "react-redux";
import { RootReducer } from "../../../store/reducers";

// components
import ImageItem from "./imageItem";
import ActionModal from "../actionModal";

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
});

interface IProps {
    images: IImage[];
    sortOption: any;
    loading: boolean;
}

const ImageList = ({ images, sortOption }: IProps) => {
    const classes = useStyles();
    const user = useSelector((state: RootReducer) => state.auth.user);
    const [isDel, setDel] = useState<null | IImage>(null);
    const [delErr, setDelErr] = useState("");
    const [delLoading, setDelLoading] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(20);
    const [page, setPage] = useState(1);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
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
                `/image/${isDel.image_name}?authId=${user.user_id}`
            );

            mutate(
                "/images",
                (images: IImage[]) => {
                    return images.filter((c) => c.image_id !== isDel.image_id);
                },
                false
            );

            setDelLoading(false);
            handleCloseDel();
        } catch (err) {
            setDelErr(err);
            setDelLoading(false);
        }
    };

    const handleSort = (a: any, b: any) => {
        if (sortOption === "Latest") {
            return (
                new Date(b.created_at).valueOf() -
                new Date(a.created_at).valueOf()
            );
        } else if (sortOption === "Oldest") {
            return (
                new Date(a.created_at).valueOf() -
                new Date(b.created_at).valueOf()
            );
        }
    };

    if (images)
        return (
            <>
                <div className={classes.root}>
                    <Grid container>
                        {images
                            .sort((a, b) => handleSort(a, b))
                            .slice(
                                (page - 1) * rowsPerPage,
                                (page - 1) * rowsPerPage + rowsPerPage
                            )
                            .map((image) => (
                                <ImageItem
                                    handleOpenDel={handleOpenDel}
                                    key={image.image_id}
                                    image={image}
                                />
                            ))}
                    </Grid>
                    <Box mb={2} mt={3}>
                        <Divider />
                    </Box>
                    <Box display="flex" justifyContent="flex-end">
                        <Pagination
                            color="secondary"
                            onChange={handleChangePage}
                            count={Math.ceil(images.length / rowsPerPage)}
                        />
                    </Box>
                </div>
                {isDel && (
                    <ActionModal
                        close={handleCloseDel}
                        title="حذف صورة"
                        msg={`هل انت متأكد انك تريد حذف هذه الصورة`}
                        handler={handleDelete}
                        error={delErr ? [delErr] : []}
                        loading={delLoading}
                    />
                )}
            </>
        );
    return null;
};

export default ImageList;
