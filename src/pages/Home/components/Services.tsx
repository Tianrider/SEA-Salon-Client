import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import ServiceSlide from "./ServiceSlide";

function Services() {
    const ServiceData = [
        {
            title: "Haircut",
            description: "Get a new haircut from our professional stylists",
            image: "https://images.unsplash.com/photo-1613754773306-532ec48b0de5?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            title: "Manicure and Pedicure",
            description: "Get a new haircut from our professional stylists",
            image: "https://images.unsplash.com/photo-1632345031435-8727f6897d53?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            title: "Facial Treatments",
            description: "Get a new haircut from our professional stylists",
            image: "https://images.unsplash.com/photo-1552693673-1bf958298935?q=80&w=1773&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
    ];

    return (
        <div className="bg-black md:p-10">
            <Swiper
                grabCursor={true}
                centeredSlides={true}
                pagination={{ clickable: true }}
                slidesPerView={1}
                className="md:w-[90vw] pt-10"
                initialSlide={0} // Set the initial slide index here
                modules={[Pagination, Navigation]}
                navigation={true}
            >
                {ServiceData.map((service, index) => (
                    <SwiperSlide key={index}>
                        <ServiceSlide
                            title={service.title}
                            description={service.description}
                            image={service.image}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Services;
