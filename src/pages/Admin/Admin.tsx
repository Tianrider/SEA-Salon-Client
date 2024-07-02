import { useState, ChangeEvent, FormEvent } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import Cookies from "js-cookie";

interface FormData {
    email: string;
    password: string;
}

function Admin() {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
    });

    const [submitting, setSubmitting] = useState(false);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response: AxiosResponse<{ token: string }> = await axios.post(
                import.meta.env.VITE_API_URL + "/admin/login",
                formData,
                { withCredentials: true }
            );
            console.log("Login submitted:", response.data);

            setFormData({
                email: "",
                password: "",
            });

            Cookies.set("token", response.data.token, {
                expires: 1,
                sameSite: "None",
                secure: true,
            });

            if (response.status === 200) {
                window.location.href =
                    import.meta.env.VITE_APP_URL +
                    "/admin/dashboard?token=" +
                    response.data.token;
            }
        } catch (error) {
            const axiosError = error as AxiosError;
            alert(
                axiosError.response?.data ||
                    "An error occurred. Please try again."
            );
            console.error("Error submitting login:", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <>
            <div className="bg-black h-screen text-white flex items-center justify-center">
                <div className="flex flex-col justify-center gap-10 items-center">
                    <h1 className="text-3xl font-bold">Hi Admin!</h1>

                    <form
                        onSubmit={handleLogin}
                        className="flex flex-col gap-5 items-center w-full"
                    >
                        <input
                            type="text"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full py-3 px-3 bg-white bg-opacity-10 appearance-none focus:outline-none border-b-2 border-red-200 rounded-t-lg"
                            placeholder="Email"
                            required
                        />

                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full py-3 px-3 bg-white bg-opacity-10 appearance-none focus:outline-none border-b-2 border-red-200 rounded-t-lg"
                            placeholder="Password"
                            required
                        />

                        <button
                            type="submit"
                            className="bg-red-500 px-5 py-3 mt-6 rounded-lg"
                            disabled={submitting}
                        >
                            {submitting ? "Submitting..." : "Login"}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Admin;
