// Main
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MediumNews from "./mediumNews";
import { Box, Avatar, Grid } from "@material-ui/core";
import { INews } from "../../types/news";

interface IProps {
    data: INews[];
    styles: any;
}

const Author = ({ data }: IProps) => {
    return (
        <div>
            <div className="author-title">
                <h1>
                    <span>more from author</span>
                </h1>
            </div>
            <Grid container className="grid-root" spacing={2}>
                {data.map((item) => (
                    <Grid item xs={12} sm={6} lg={3} key={item.news_id}>
                        <MediumNews data={item} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Author;
