import { Swiper } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";

interface IProps {
    children: React.ReactNode[];
    slidesPerView?: number;
    spaceBetween?: number;
}

SwiperCore.use([Navigation]);

const Slider = ({ children, spaceBetween, slidesPerView }: IProps) => {
    return (
        <Swiper
            style={{ width: "100%", height: "100%" }}
            spaceBetween={spaceBetween || 10}
            navigation
            slidesPerView={slidesPerView || 1}
        >
            {children}
        </Swiper>
    );
};

export default Slider;
