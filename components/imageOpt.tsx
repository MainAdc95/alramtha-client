import { useState, useEffect } from "react";
import { apiImage } from "../utils/apiCall";

interface IProps {
    src: string;
    alt?: string;
    className?: string;
    layout?: "fixed" | "intrinsic" | "responsive" | "fill" | undefined;
    objectFit?: NonNullable<JSX.IntrinsicElements["img"]["style"]>["objectFit"];
    width?: number;
    location?: "aws" | "local";
    height?: number;
    draggable?: boolean;
    size?: "s" | "m" | "l";
    priority?: boolean;
    empty?: boolean;
}

const ImageOpt = ({
    src,
    alt,
    width,
    height,
    layout,
    objectFit,
    className,
    empty,
    location,
    draggable,
    priority,
}: IProps) => {
    const [error, setError] = useState(false);

    useEffect(() => {
        if (empty) setError(true);
    }, []);

    return (
        <>
            <div
                className="image-opt"
                style={
                    error
                        ? {
                              display: "flex",
                              height: "100%",
                              width: "100%",
                              maxHeight: "80%",
                              maxWidth: "100%",
                              minHeight: "100%",
                              minWidth: "100%",
                              position: "static",
                              justifyContent: "center",
                              alignItems: "center",
                              backgroundColor: "#0288fec0",
                          }
                        : null
                }
            >
                <div
                    style={
                        error
                            ? {
                                  display: "flex",
                                  height: "100%",
                                  width: "100%",
                                  maxHeight: "80%",
                                  maxWidth: "100%",
                                  minHeight: "100%",
                                  minWidth: "100%",
                                  justifyContent: "center",
                                  alignItems: "center",
                              }
                            : width && height
                            ? {
                                  minWidth: width,
                                  minHeight: height,
                                  width,
                                  height,
                              }
                            : null
                    }
                    className={!width && !height ? (error ? "" : "image") : ""}
                >
                    <img
                        loading="lazy"
                        className={error ? "" : className || ""}
                        style={
                            error
                                ? {
                                      width: "100px",
                                      height: "100px",
                                      maxHeight: "80%",
                                      maxWidth: "100%",
                                      margin: "auto",
                                      display: "block",
                                  }
                                : width && height
                                ? {
                                      minWidth: width,
                                      minHeight: height,
                                      width,
                                      height,
                                  }
                                : null
                        }
                        src={
                            error
                                ? "https://www.alramsah.com/no-photos.svg"
                                : location === "local"
                                ? src
                                : apiImage(src)
                        }
                        alt={alt}
                        onError={(e: any) => setError(true)}
                    />
                </div>
            </div>
            <style jsx>{`
                .image-opt {
                    ${draggable === false
                        ? `
                        -webkit-user-select: none;
                        -khtml-user-select: none;
                        -moz-user-select: none;
                        -o-user-select: none;
                        user-select: none;
                        -webkit-user-drag: none;
                        -khtml-user-drag: none;
                        -moz-user-drag: none;
                        -o-user-drag: none;
                        pointer-events: none;
                        `
                        : ""}
                    ${width ? `width: ${width}px;` : ""}
                    ${height ? `height: ${height}px;` : ""}
                }
            `}</style>
        </>
    );
};

export default ImageOpt;
