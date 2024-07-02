import { useState } from "react";

function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div
            className={`absolute px-[5vw] py-4 md:p-10 md:px-20 w-full flex items-center justify-between z-50 text-white ${
                isOpen ? "bg-gray-800" : "bg-transparent"
            }`}
        >
            <div>SEA Salon</div>

            <div className="gap-10 hidden md:flex">
                <a className="cursor-pointer" href="/">
                    Home
                </a>
                <p>Service</p>
                <p>Career</p>
            </div>

            <a
                className="bg-red-500 rounded-full font-bold hover:scale-105 px-5 py-2 cursor-pointer hidden md:block"
                href="/reservation"
            >
                Reserve Now!
            </a>

            <div className="md:hidden flex items-center">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="focus:outline-none"
                >
                    <svg
                        className="w-10 h-10"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 6h16M4 12h16m-7 6h7"
                        ></path>
                    </svg>
                </button>
            </div>

            {isOpen && (
                <div className="absolute top-12 left-0 w-full bg-gray-800 text-white flex flex-col items-center gap-4 py-4 md:hidden">
                    <a className="cursor-pointer" href="/">
                        Home
                    </a>
                    <p>Service</p>
                    <p>Career</p>
                    <a
                        className="bg-red-500 rounded-full font-bold hover:scale-105 px-5 py-2 cursor-pointer"
                        href="/reservation"
                    >
                        Reserve Now!
                    </a>
                </div>
            )}
        </div>
    );
}

export default Navbar;
