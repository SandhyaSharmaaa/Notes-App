import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/auth";

const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useAuth();

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleSignIn = () => {
    const storedSignupData = JSON.parse(localStorage.getItem("signupData"));

    if (
      storedSignupData &&
      loginData.email === storedSignupData.email &&
      loginData.password === storedSignupData.password
    ) {
      localStorage.setItem("loginData", JSON.stringify(loginData));
      signIn();
      navigate("/");
      console.log("Login Done");
    } else {
      console.log("Invalid credentials");
    }
  };

  const handleChange = (e) => {
    setLoginData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex justify-center items-start h-screen bg-gray-100">
      <div className="flex flex-col items-center bg-gray-200 p-8 max-w-lg w-full rounded-md mt-8">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form className="w-full">
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full border p-2 rounded"
              placeholder="Enter your email"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-600">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full border p-2 rounded"
              placeholder="Enter your password"
              onChange={handleChange}
            />
          </div>
          <button
            type="button"
            className="bg-green-500 text-white px-4 py-2 mb-4 rounded hover:bg-green-600 w-full"
            onClick={handleSignIn}
          >
            Sign In
          </button>
        </form>
        <p className="text-sm">
          Don't have an account?{" "}
          <a href="/signup" className="text-green-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
