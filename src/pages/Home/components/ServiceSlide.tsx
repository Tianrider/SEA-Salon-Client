interface ServiceSlideProps {
    title: string;
    description: string;
    image: string;
}

const ServiceSlide: React.FC<ServiceSlideProps> = ({
    title,
    description,
    image,
}) => {
    return (
        <div className="bg-black text-white w-full md:w-[90vw] md:h-[40vh] rounded-xl shadow-lg flex md:flex-row flex-col items-center justify-between md:px-20 px-5 md:gap-0 gap-10">
            <div className="flex flex-col md:gap-10">
                <h1 className="text-[8vw] md:text-5xl font-bold">{title}</h1>
                <p className="text-lg">{description}</p>
                <button className="bg-red-500 w-32 rounded-full py-1 md:py-2 md:px-3 md:mt-0 mt-7">
                    Learn More
                </button>
            </div>
            <div className="relative w-container md:w-1/2 h-full">
                <img
                    src={image}
                    alt=""
                    className="w-full h-full object-cover rounded-xl md:rounded-r-xl"
                />
                <div className="bg-black absolute w-56 z-3 h-full -skew-x-[20deg] top-0 -left-20 md:block hidden"></div>
            </div>
        </div>
    );
};

export default ServiceSlide;
