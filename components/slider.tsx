import { Swiper } from "swiper/react";
import SwiperCore, { Navigation, Autoplay } from "swiper";

interface IProps {
    children: React.ReactNode[];
    slidesPerView?: number;
    spaceBetween?: number;
}

SwiperCore.use([Navigation, Autoplay]);

const Slider = ({ children, spaceBetween, slidesPerView }: IProps) => {
    return (
        <Swiper
            style={{ width: "100%", height: "100%" }}
            spaceBetween={spaceBetween || 10}
            navigation
            autoplay={{ disableOnInteraction: true, delay: 2500 }}
            slidesPerView={slidesPerView || 1}
        >
            {children}
        </Swiper>
    );
};

export default Slider;
