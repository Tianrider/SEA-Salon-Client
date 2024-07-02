import { FaWhatsapp } from "react-icons/fa";
import { FaLocationCrosshairs } from "react-icons/fa6";
import { IoTime } from "react-icons/io5";

function Contact() {
    return (
        <div className="text-white bg-black relative md:h-[10vh]">
            <div className="flex md:flex-row flex-col w-full px-[10vw] items-start gap-5 md:gap-0 md:justify-between">
                <div className="flex gap-5 text-xl md:text-2xl items-start justify-center">
                    <FaWhatsapp className="md:text-3xl" />
                    <div>
                        <h1 className="font-bold">Contact</h1>
                        <div className="text-[4vw] md:text-lg tracking-wider flex gap-10">
                            <div>
                                <p>0812 3456 789</p>
                                <p className=" text-gray-100">Thomas</p>
                            </div>
                            <div>
                                <p>0816 4829 372</p>
                                <p className="text-gray-100">Sekar</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-5 text-xl md:text-2xl items-start justify-center">
                    <FaLocationCrosshairs />
                    <div className="text-[4vw] md:text-lg tracking-wider">
                        <h1 className="font-bold">Location</h1>
                        <div className="md:text-lg tracking-wider">
                            <p>Jl. Raya Bogor No. 12</p>
                            <p>Jakarta, Indonesia</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-5 text-xl md:text-2xl items-start justify-center">
                    <IoTime />
                    <div className="text-[4vw] md:text-lg tracking-wider">
                        <h1 className="font-bold">Opening Hours</h1>
                        <div className="md:text-lg tracking-wider">
                            <p>Mon - Fri: 08:00 - 20:00</p>
                            <p>Sat - Sun: 10:00 - 18:00</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contact;
