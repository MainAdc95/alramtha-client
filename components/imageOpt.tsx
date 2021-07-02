import Image from "next/image";
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
}: IProps) => {
    return (
        <>
            <div className="image-opt">
                <Image
                    className={className || ""}
                    src={location === "local" ? src : apiImage(src)}
                    alt={alt}
                    width={width || null}
                    height={height || null}
                    layout={(layout || null) as any}
                    objectFit={objectFit || null}
                />
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
                }
            `}</style>
        </>
    );
};

export default ImageOpt;
