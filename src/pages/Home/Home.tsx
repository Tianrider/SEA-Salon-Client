import Contact from "./components/Contact";
import Review from "./components/Review";
import Services from "./components/Services";
import Navbar from "../../components/Navbar";

function Home() {
    return (
        <>
            <div className="">
                <Navbar />
                <div className="flex flex-col items-center justify-center h-[84vh] text-white relative">
                    <img
                        src="https://images.unsplash.com/photo-1613754773306-532ec48b0de5?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                        alt="wallpaper"
                        className="w-screen h-full object-cover absolute z-[-2]"
                    />
                    <div className="absolute top-0 bottom-0 w-full h-full bg-gradient-to-b z-[-1] from-transparent to-black"></div>
                    <h1 className="text-[14vw] md:text-[100px] font-bold">
                        SEA Salon
                    </h1>
                    <p className="text-xl mt-5 italic">
                        Beauty and Elegance Redefined
                    </p>

                    <a
                        className="bg-red-500 rounded-full font-bold hover:scale-105 px-5 py-2 cursor-pointer md:hidden block mt-10"
                        href="/reservation"
                    >
                        Reserve Now!
                    </a>
                </div>
                <Contact />
                <Services />
                <Review />
            </div>
        </>
    );
}

export default Home;
