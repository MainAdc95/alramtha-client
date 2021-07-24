import { useState } from "react";
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
}

const ImageOpt = ({
    src,
    alt,
    width,
    height,
    layout,
    objectFit,
    className,
    location,
    draggable,
    priority,
}: IProps) => {
    const [error, setError] = useState(false);

    return (
        <>
            <div className="image-opt">
                <div
                    style={
                        width && height
                            ? {
                                  minWidth: width,
                                  minHeight: height,
                                  width,
                                  height,
                              }
                            : null
                    }
                    className={!width && !height ? "image" : ""}
                >
                    <img
                        loading="lazy"
                        className={className || ""}
                        style={
                            width && height
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
                                ? "https://www.alramsah.com/logo.svg"
                                : location === "local"
                                ? src
                                : apiImage(src)
                        }
                        alt={alt}
                        onError={(e: any) => setError(true)}
                        onLoad={(e: any) => console.log(e.target.src)}
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
