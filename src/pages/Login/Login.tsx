import { useState, ChangeEvent, FormEvent } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";
import Cookies from "js-cookie";

interface FormData {
    email: string;
    password: string;
    name: string;
    phoneNumber: string;
}

const Reservation = () => {
    const [formData, setFormData] = useState<FormData>({
        email: "",
        password: "",
        name: "",
        phoneNumber: "",
    });
    const [retypePassword, setRetypePassword] = useState<string>("");
    const [submitting, setSubmitting] = useState(false);
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState("");

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (name === "retypePassword") {
            setRetypePassword(value);
        } else {
            setFormData((prevFormData) => ({
                ...prevFormData,
                [name]: value,
            }));
        }
    };

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const response: AxiosResponse<{ token: string }> = await axios.post(
                import.meta.env.VITE_API_URL + "/user/login",
                { email: formData.email, password: formData.password },
                { withCredentials: true }
            );
            console.log("Login submitted:", response.data);

            setFormData({
                email: "",
                password: "",
                name: "",
                phoneNumber: "",
            });

            Cookies.set("token", response.data.token, {
                expires: 1,
                sameSite: "None",
                secure: true,
            });

            if (response.status === 200) {
                window.location.href =
                    import.meta.env.VITE_APP_URL +
                    "/reservation?token=" +
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

    const handleRegister = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.password !== retypePassword) {
            setError("Passwords do not match.");
            return;
        }

        setSubmitting(true);

        try {
            const registerResponse: AxiosResponse = await axios.post(
                import.meta.env.VITE_API_URL + "/user/register",
                {
                    name: formData.name,
                    email: formData.email,
                    phoneNumber: formData.phoneNumber,
                    password: formData.password,
                    role: "user",
                }
            );
            console.log("Register submitted:", registerResponse.data);

            // Login after successful registration
            const loginResponse: AxiosResponse<{ token: string }> =
                await axios.post(
                    import.meta.env.VITE_API_URL + "/user/login",
                    { email: formData.email, password: formData.password },
                    { withCredentials: true }
                );

            setFormData({
                email: "",
                password: "",
                name: "",
                phoneNumber: "",
            });
            setRetypePassword("");
            setError("");

            Cookies.set("token", loginResponse.data.token, {
                expires: 1,
                sameSite: "None",
                secure: true,
            });

            if (loginResponse.status === 200) {
                window.location.href =
                    import.meta.env.VITE_APP_URL +
                    "/reservation?token=" +
                    loginResponse.data.token;
            }
        } catch (error) {
            const axiosError = error as AxiosError;
            const errorMessage =
                axiosError.response?.data &&
                typeof axiosError.response?.data === "string"
                    ? axiosError.response?.data
                    : "An error occurred. Please try again.";
            setError(errorMessage);
            console.error("Error submitting register or login:", error);
        } finally {
            setSubmitting(false);
        }
    };

    const loginForm = () => (
        <>
            <h1 className="text-2xl md:text-3xl font-bold">
                Log in to your account now!
            </h1>

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

                <p>
                    Don't have an account?{" "}
                    <span
                        className="cursor-pointer underline text-blue-300"
                        onClick={() => setIsLogin(false)}
                    >
                        Register here
                    </span>
                </p>

                <button
                    type="submit"
                    className="bg-red-500 px-5 py-3 mt-6 rounded-lg"
                    disabled={submitting}
                >
                    {submitting ? "Submitting..." : "Login"}
                </button>
            </form>
        </>
    );

    const registerForm = () => (
        <>
            <h1 className="text-2xl md:text-3xl font-bold">
                Register a new account!
            </h1>

            <form
                onSubmit={handleRegister}
                className="flex flex-col gap-5 items-center w-full"
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
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full py-3 px-3 bg-white bg-opacity-10 appearance-none focus:outline-none border-b-2 border-red-200 rounded-t-lg"
                    placeholder="Email"
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

                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full py-3 px-3 bg-white bg-opacity-10 appearance-none focus:outline-none border-b-2 border-red-200 rounded-t-lg"
                    placeholder="Password"
                    required
                />

                <input
                    type="password"
                    name="retypePassword"
                    value={retypePassword}
                    onChange={(e) => setRetypePassword(e.target.value)}
                    className="w-full py-3 px-3 bg-white bg-opacity-10 appearance-none focus:outline-none border-b-2 border-red-200 rounded-t-lg"
                    placeholder="Retype Password"
                    required
                />

                {error && <p className="text-red-500 mb-3">{error}</p>}

                <p>
                    Already have an account?{" "}
                    <span
                        className="cursor-pointer underline text-blue-300"
                        onClick={() => setIsLogin(true)}
                    >
                        Login here
                    </span>
                </p>

                <button
                    type="submit"
                    className="bg-red-500 px-5 py-3 mt-6 rounded-lg"
                    disabled={submitting}
                >
                    {submitting ? "Submitting..." : "Register"}
                </button>
            </form>
        </>
    );

    return (
        <>
            <div className="bg-black h-screen text-white flex items-center justify-center">
                <div className="flex flex-col justify-center gap-10 items-center md:w-fit w-[90vw]">
                    {isLogin ? loginForm() : registerForm()}
                </div>
            </div>
        </>
    );
};

export default Reservation;
