// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

interface IProps {
    children: React.ReactNode[];
    slidesPerView?: number;
    spaceBetween?: number;
}

const Slider = ({ children, spaceBetween, slidesPerView }: IProps) => {
    return (
        <Swiper
            style={{ width: "100%", height: "100%" }}
            spaceBetween={spaceBetween || 50}
            slidesPerView={slidesPerView || 1}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
        >
            {children}
        </Swiper>
    );
};

export default Slider;
