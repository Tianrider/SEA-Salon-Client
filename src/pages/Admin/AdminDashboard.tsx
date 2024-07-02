import { useEffect, useState } from "react";
import axios from "axios";

interface Service {
    _id: string;
    name: string;
    duration: number;
}

function AdminDashboard() {
    const [services, setServices] = useState<Service[]>([]);
    const [newService, setNewService] = useState({ name: "", duration: 0 });
    const [error, setError] = useState("");

    useEffect(() => {
        const getReservation = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:3000/service",
                    {
                        withCredentials: true,
                    }
                );

                console.log(response);

                if (response.status === 200) {
                    setServices(response.data);
                }
            } catch (error) {
                console.error("Error getting user data:", error);
                if (
                    axios.isAxiosError(error) &&
                    error.response?.status === 401
                ) {
                    window.location.href = "/admin";
                }
            }
        };

        getReservation();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewService({ ...newService, [name]: value });
    };

    const handleAddService = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                import.meta.env.VITE_API_URL + "/service",
                newService,
                { withCredentials: true }
            );
            if (response.status === 201) {
                setServices([...services, response.data]);
                setNewService({ name: "", duration: 0 });
                setError("");
            }
        } catch (error) {
            console.error("Error adding new service:", error);
            setError("Failed to add service. Please try again.");
        }
    };

    return (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center p-5">
            <h1 className="text-3xl font-bold mb-10">Admin Dashboard</h1>
            <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-5 mb-5">
                <form onSubmit={handleAddService} className="mb-5">
                    <h2 className="text-2xl font-bold mb-5">Add New Service</h2>
                    <div className="mb-3">
                        <label className="block text-gray-700 mb-1">
                            Service Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={newService.name}
                            onChange={handleInputChange}
                            className="w-full py-2 px-3 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="block text-gray-700 mb-1">
                            Duration (minutes)
                        </label>
                        <input
                            type="number"
                            name="duration"
                            value={newService.duration}
                            onChange={handleInputChange}
                            className="w-full py-2 px-3 border rounded"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 mb-3">{error}</p>}
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded"
                    >
                        Add Service
                    </button>
                </form>
                <h2 className="text-2xl font-bold mb-5">Available Services</h2>
                {services.length > 0 ? (
                    services.map((service) => (
                        <div
                            key={service._id}
                            className="border-b border-gray-200 py-4"
                        >
                            <h2 className="text-xl font-semibold">
                                {service.name}
                            </h2>
                            <p className="text-gray-600">
                                Duration: {service.duration} minutes
                            </p>
                        </div>
                    ))
                ) : (
                    <p className="text-center text-gray-600">
                        No services available
                    </p>
                )}
            </div>
        </div>
    );
}

export default AdminDashboard;
