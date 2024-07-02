import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

interface ReservationForm {
    name: string;
    phoneNumber: string;
    service: string;
    date: string;
    startTime: string;
}

interface UserData {
    name: string;
    phoneNumber: string;
}

interface Service {
    _id: string;
    name: string;
}

interface ReservationData {
    _id: string;
    name: string;
    phoneNumber: string;
    service: string;
    date: string;
    startTime: string;
}

const Reservation: React.FC = () => {
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [userData, setUserData] = useState<UserData>({
        name: "",
        phoneNumber: "",
    });
    const [services, setServices] = useState<Service[]>([]);
    const [reservations, setReservations] = useState<ReservationData[]>([]);

    const [formData, setFormData] = useState<ReservationForm>({
        name: "",
        phoneNumber: "",
        service: "",
        date: "",
        startTime: "",
    });
    const [submitting, setSubmitting] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response = await axios.post<ReservationData>(
                import.meta.env.VITE_API_URL + "/reservation",
                formData
            );
            console.log("Reservation submitted:", response.data);
            setSuccess(true);

            setFormData({
                name: "",
                phoneNumber: "",
                service: "",
                date: "",
                startTime: "",
            });

            fetchReservations(); // Refresh reservations after successful submission
        } catch (error) {
            console.error("Error submitting reservation:", error);
        } finally {
            setSubmitting(false);
        }
    };

    const closeSuccessMessage = () => {
        setSuccess(false);
    };

    useEffect(() => {
        const getData = async () => {
            try {
                const userResponse = await axios.get<UserData>(
                    import.meta.env.VITE_API_URL + "/user",
                    {
                        withCredentials: true,
                    }
                );

                if (userResponse.status === 200) {
                    setAuthenticated(true);
                    setUserData(userResponse.data);
                    setFormData({
                        name: userResponse.data.name,
                        phoneNumber: userResponse.data.phoneNumber,
                        service: "",
                        date: "",
                        startTime: "",
                    });
                }

                const servicesResponse = await axios.get<Service[]>(
                    import.meta.env.VITE_API_URL + "/service",
                    {
                        withCredentials: true,
                    }
                );

                if (servicesResponse.status === 200) {
                    setServices(servicesResponse.data);
                }

                fetchReservations(); // Fetch reservations after user and services data
            } catch (error) {
                console.error("Error getting data:", error);
                window.location.href = "/auth";
            }
        };

        getData();
    }, []);

    const fetchReservations = async () => {
        try {
            const response = await axios.get<ReservationData[]>(
                import.meta.env.VITE_API_URL + "/reservation"
            );
            setReservations(response.data); // Assuming the API returns an array of reservations
        } catch (error) {
            console.error("Error fetching reservations:", error);
        }
    };

    const reservationForm = () => {
        // Generate time options from 9 AM to 9 PM
        const generateTimeOptions = () => {
            const startTime = 9; // Starting hour
            const endTime = 21; // Ending hour (9 PM in 24-hour format)
            const options: JSX.Element[] = [];

            for (let hour = startTime; hour <= endTime; hour++) {
                const formattedHour = hour.toString().padStart(2, "0") + ":00"; // Format as HH:00
                options.push(
                    <option
                        key={formattedHour}
                        value={formattedHour}
                        className="text-black"
                    >
                        {formattedHour}
                    </option>
                );
            }

            return options;
        };

        return (
            <div className="bg-black h-[80vh] md:h-screen text-white flex items-center justify-center">
                <div className="flex flex-col justify-center gap-5 items-center">
                    <h1 className="text-2xl font-bold">
                        HI! {userData.name ? userData.name : "user"}
                    </h1>
                    <h1 className="text-3xl font-bold">
                        Have a Reservation Now!
                    </h1>

                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-3 items-center w-full"
                    >
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full py-3 px-3 bg-white bg-opacity-10 appearance-none focus:outline-none border-b-2 border-red-200 rounded-t-lg"
                            placeholder="Name"
                            required
                        />

                        <input
                            type="text"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleInputChange}
                            className="w-full py-3 px-3 bg-white bg-opacity-10 appearance-none focus:outline-none border-b-2 border-red-200 rounded-t-lg"
                            placeholder="Phone Number"
                            required
                        />

                        <select
                            name="service"
                            value={formData.service}
                            onChange={handleInputChange}
                            className="w-full py-3 px-3 bg-white bg-opacity-10 appearance-none focus:outline-none border-b-2 border-red-200 rounded-t-lg"
                            required
                        >
                            <option value="" disabled hidden>
                                Service
                            </option>
                            {services.map((service) => (
                                <option
                                    key={service._id}
                                    value={service.name}
                                    className="text-black"
                                >
                                    {service.name}
                                </option>
                            ))}
                        </select>

                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            className="w-full py-3 px-3 bg-white bg-opacity-10 appearance-none focus:outline-none border-b-2 border-red-200 rounded-t-lg"
                            placeholder="Date"
                            required
                        />

                        <select
                            name="startTime"
                            value={formData.startTime}
                            onChange={handleInputChange}
                            className="w-full py-3 px-3 bg-white bg-opacity-10 appearance-none focus:outline-none border-b-2 border-red-200 rounded-t-lg"
                            required
                        >
                            <option
                                value=""
                                className="text-black"
                                disabled
                                hidden
                            >
                                Start Time
                            </option>
                            {generateTimeOptions()}
                        </select>

                        <button
                            type="submit"
                            className="bg-red-500 px-5 py-2 rounded-lg"
                            disabled={submitting}
                        >
                            {submitting ? "Submitting..." : "Reserve Now!"}
                        </button>
                    </form>

                    {success && (
                        <div className="fixed inset-0 flex items-center justify-center z-50">
                            <div className="bg-white p-4 rounded-lg shadow-md items-center flex flex-col">
                                <p className="text-green-600 text-lg font-bold">
                                    Reservation Successful!
                                </p>
                                <button
                                    className="mt-3 bg-red-500 px-4 py-2 text-white rounded-lg"
                                    onClick={closeSuccessMessage}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    };

    const displayReservations = () => {
        const formatDate = (isoDate: string) => {
            const date = new Date(isoDate);
            return date.toLocaleDateString("en-US", {
                day: "numeric",
                month: "long",
                year: "numeric",
            });
        };

        return (
            <div className="bg-black text-white flex items-center justify-center md:py-20">
                <div className="flex flex-col justify-center gap-5 items-center">
                    <h1 className="text-3xl font-bold">Your Reservations</h1>
                    <div className="w-full max-w-2xl bg-gray-800 rounded-lg p-5">
                        {reservations.length > 0 ? (
                            reservations.map((reservation) => (
                                <div
                                    key={reservation._id}
                                    className="bg-gray-700 p-3 rounded-lg mb-3"
                                >
                                    <p className="text-lg font-bold">
                                        Name: {reservation.name}
                                    </p>
                                    <p>
                                        Phone Number: {reservation.phoneNumber}
                                    </p>
                                    <p>Service: {reservation.service}</p>
                                    <p>Date: {formatDate(reservation.date)}</p>
                                    <p>Start Time: {reservation.startTime}</p>
                                </div>
                            ))
                        ) : (
                            <p className="text-lg">You have no reservations.</p>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    const handleLogout = async () => {
        try {
            await axios.post(
                import.meta.env.VITE_API_URL + "/user/logout",
                {},
                {
                    withCredentials: true,
                }
            );
            Cookies.remove("token");
            setAuthenticated(false);
            window.location.href = "/auth";
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <>
            {authenticated ? (
                <>
                    <div
                        className="absolute top-10 left-10 px-4 py-3 bg-red-500 rounded-full text-white font-bold cursor-pointer"
                        onClick={handleLogout}
                    >
                        Logout
                    </div>
                    <div className="flex md:flex-row flex-col w-screen bg-black justify-center gap-20 items-center md:items-start">
                        {reservationForm()}
                        {displayReservations()}
                    </div>
                </>
            ) : (
                <div className="w-full h-screen bg-black text-white text-3xl font-bold flex justify-center items-center">
                    Fetching Data...
                </div>
            )}
        </>
    );
};

export default Reservation;
